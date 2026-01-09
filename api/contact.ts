import { MAX_BODY_BYTES } from './_lib/constants';
import { checkDuplicate } from './_lib/duplicate';
import { sendEmail } from './_lib/email';
import { hashIp } from './_lib/crypto';
import {
  getBodySize,
  getClientIp,
  getHeader,
  parseContentLength,
  readRequestBody,
} from './_lib/http';
import { recordDecision } from './_lib/logging';
import { enforceRateLimit } from './_lib/rateLimit';
import {
  buildCorsHeaders,
  getAllowedOrigins,
  normalizeOrigin,
  reject,
  respond,
} from './_lib/response';
import { verifyTurnstile } from './_lib/turnstile';
import {
  buildPayloadHash,
  hasHoneypot,
  parsePayload,
  validateFields,
} from './_lib/validation';
import type { VercelRequest, VercelResponse } from './_lib/types';

type ErrorWithDebug = Error & { debug?: unknown };

function getErrorDebug(error: unknown): unknown {
  if (error instanceof Error && 'debug' in error) {
    return (error as ErrorWithDebug).debug;
  }
  return undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const now = Date.now();

  // --- CORS / ORIGIN ---
  const origin = normalizeOrigin(getHeader(req.headers, 'origin'));
  const allowedOrigins = getAllowedOrigins().map((value) => normalizeOrigin(value));
  const originAllowed = origin !== '' && allowedOrigins.includes(origin);
  const responseOrigin = originAllowed ? origin : '';

  if (req.method === 'OPTIONS') {
    if (!originAllowed) {
      res.status(403);
      res.end();
      return;
    }

    res.status(204);
    const headers = buildCorsHeaders(responseOrigin);
    Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
    res.send('');
    return;
  }

  if (allowedOrigins.length === 0) {
    return reject(res, 'origin_not_allowed', 403, 'Forbidden', responseOrigin, now);
  }

  if (!originAllowed) {
    return reject(res, 'origin_not_allowed', 403, 'Forbidden', responseOrigin, now);
  }

  // --- METHOD ---
  if (req.method !== 'POST') {
    return reject(res, 'method_not_allowed', 405, 'Method not allowed', responseOrigin, now);
  }

  // --- CONTENT TYPE ---
  const contentType = getHeader(req.headers, 'content-type').toLowerCase();
  if (!contentType.startsWith('application/json')) {
    return reject(
      res,
      'invalid_content_type',
      415,
      'Unsupported content type',
      responseOrigin,
      now,
    );
  }

  // --- BODY SIZE ---
  const contentLengthHeader = parseContentLength(getHeader(req.headers, 'content-length'));
  if (contentLengthHeader !== null && contentLengthHeader > MAX_BODY_BYTES) {
    return reject(res, 'payload_too_large', 413, 'Payload too large', responseOrigin, now);
  }

  const bodySize = getBodySize(req.body);
  if (bodySize > MAX_BODY_BYTES) {
    return reject(res, 'payload_too_large', 413, 'Payload too large', responseOrigin, now);
  }

  // --- IP / RATE LIMIT SETUP ---
  const ip = getClientIp(req.headers);
  const ipHash = hashIp(ip || 'unknown');

  const allowlist = (process.env.RATE_LIMIT_ALLOWLIST || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const isAllowlisted = ip ? allowlist.includes(ip) : false;

  // --- READ BODY ---
  let rawBody = '';
  try {
    rawBody = await readRequestBody(req);
  } catch (error) {
    const message =
      error instanceof Error && error.message === 'payload_too_large'
        ? 'Payload too large'
        : 'Invalid submission';

    const reason = message === 'Payload too large' ? 'payload_too_large' : 'invalid_json';

    return reject(
      res,
      reason,
      message === 'Payload too large' ? 413 : 400,
      message,
      responseOrigin,
      now,
    );
  }

  // --- PARSE JSON ---
  let payload: Record<string, unknown>;
  try {
    payload = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return reject(res, 'invalid_json', 400, 'Invalid submission', responseOrigin, now);
  }

  // --- VALIDATION / BOT DEFENSE ---
  const parsed = parsePayload(payload);

  if (hasHoneypot(parsed)) {
    await recordDecision('rejected', 'honeypot_filled', now);
    return reject(res, 'honeypot_filled', 400, 'Invalid submission', responseOrigin, now);
  }

  const rateResult = await enforceRateLimit(ipHash, now, isAllowlisted);
  if (!rateResult.ok) {
    await recordDecision('rejected', 'rate_limited', now);
    return reject(res, 'rate_limited', 429, 'Too many requests', responseOrigin, now);
  }

  const validation = validateFields(parsed);
  if (!validation.ok) {
    await recordDecision('rejected', validation.reason, now);
    return reject(
      res,
      validation.reason,
      validation.statusCode,
      validation.message,
      responseOrigin,
      now,
    );
  }

  const payloadHash = buildPayloadHash(validation.data);
  const duplicateResult = await checkDuplicate(payloadHash, now, isAllowlisted);
  if (!duplicateResult.ok) {
    await recordDecision('rejected', 'duplicate_payload', now);
    return reject(res, 'duplicate_payload', 409, 'Submission already received', responseOrigin, now);
  }

  if (!parsed.turnstileToken) {
    await recordDecision('rejected', 'missing_turnstile', now);
    return reject(res, 'missing_turnstile', 400, 'Invalid submission', responseOrigin, now);
  }

  const turnstileResult = await verifyTurnstile(parsed.turnstileToken, ip);
  if (!turnstileResult.ok) {
    await recordDecision('rejected', 'turnstile_failed', now);
    return reject(res, 'turnstile_failed', 400, 'Invalid submission', responseOrigin, now);
  }

  // --- SEND EMAIL ---
  try {
    const result = await sendEmail(validation.data);

    // Optional: log message ids for debugging
    console.log('Email sent:', result);

    await recordDecision('accepted', null, now);
    return respond(res, 200, { ok: true }, responseOrigin);
  } catch (error) {
    console.error('sendEmail failed:', {
      message: error instanceof Error ? error.message : String(error),
      debug: getErrorDebug(error),
    });

    await recordDecision('rejected', 'email_send_failed', now);
    return reject(res, 'email_send_failed', 502, 'Unable to deliver message', responseOrigin, now);
  }
}
