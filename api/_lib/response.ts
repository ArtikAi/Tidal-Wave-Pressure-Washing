import { recordDecision } from './logging';
import type { JsonResponse, VercelResponse } from './types';

export function normalizeOrigin(origin: string | null | undefined): string {
  if (!origin) return '';
  return origin.trim().toLowerCase().replace(/\/+$/, '');
}

export function getAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS || '';
  return raw
    .split(',')
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);
}

export function buildCorsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '600',
    Vary: 'Origin',
  };
}

function getResponseHeaders(origin: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (origin) {
    Object.assign(headers, buildCorsHeaders(origin));
  }
  return headers;
}

export function respond(
  res: VercelResponse,
  statusCode: number,
  body: JsonResponse,
  origin: string,
) {
  const headers = getResponseHeaders(origin);
  res.status(statusCode);
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
  res.send(JSON.stringify(body));
}

export async function reject(
  res: VercelResponse,
  reason: string,
  statusCode: number,
  message: string,
  origin: string,
  now: number,
) {
  await recordDecision('rejected', reason, now);
  respond(res, statusCode, { ok: false, error: message }, origin);
}
