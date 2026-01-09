import type { ContactFields } from './validation';

type ResendEmailResponse = {
  id: string;
};

type ResendErrorResponse = {
  message?: string;
  name?: string;
  statusCode?: number;
};

type ResendPayload = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  reply_to?: string;
};

type ErrorWithDebug = Error & { debug?: Record<string, unknown> };

function attachDebug(error: Error, debug: Record<string, unknown>) {
  (error as ErrorWithDebug).debug = debug;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') throw new Error(`missing_env:${name}`);
  return value.trim();
}

function sanitizeEmailHeaderValue(value: string) {
  // Prevent header injection if user submits malicious email/name
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function extractDomain(fromHeader: string) {
  // supports: "Name <email@domain.com>" OR "email@domain.com"
  const match = fromHeader.match(/<([^>]+)>/);
  const email = (match ? match[1] : fromHeader).trim();
  const at = email.lastIndexOf('@');
  return at >= 0 ? email.slice(at + 1).toLowerCase() : '';
}

function isFreeMailboxDomain(domain: string) {
  // These are NOT verifiable by you and will always fail on Resend
  return (
    domain === 'gmail.com' ||
    domain === 'googlemail.com' ||
    domain === 'yahoo.com' ||
    domain === 'outlook.com' ||
    domain === 'hotmail.com' ||
    domain === 'icloud.com' ||
    domain === 'aol.com' ||
    domain === 'proton.me' ||
    domain === 'protonmail.com'
  );
}

function validateEmailConfig(fromEmail: string) {
  if (!fromEmail.includes('@')) {
    throw new Error('invalid_from_email');
  }

  const fromDomain = extractDomain(fromEmail);
  if (!fromDomain) {
    throw new Error('invalid_from_email');
  }

  // Fail fast with a clear error instead of letting Resend reject it later.
  if (isFreeMailboxDomain(fromDomain)) {
    const error = new Error('invalid_from_domain');
    attachDebug(error, {
      message:
        `CONTACT_FROM_EMAIL uses a free mailbox domain (${fromDomain}). ` +
        `Resend will reject this. Use a Resend-provided sender (e.g. *@resend.dev) ` +
        `or verify a domain you control.`,
      fromEmail,
    });
    throw error;
  }
}

async function resendFetch(apiKey: string, payload: ResendPayload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => null)) as
      | ResendEmailResponse
      | ResendErrorResponse
      | null;

    if (!response.ok) {
      const message =
        (data && typeof data === 'object' && 'message' in data && data.message) ||
        `Resend request failed (${response.status})`;

      const error = new Error('email_send_failed');
      attachDebug(error, {
        status: response.status,
        statusText: response.statusText,
        message,
        response: data,
        payloadMeta: {
          // never log full email content
          from: payload.from,
          to: payload.to,
          subject: payload.subject,
        },
      });
      throw error;
    }

    return data as ResendEmailResponse;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      const error = new Error('email_send_timeout');
      attachDebug(error, { message: 'Resend request timed out' });
      throw error;
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

type SendEmailResult = {
  ownerMessageId: string;
  customerMessageId: string;
  testMode: boolean;
  customerDeliveredTo: string;
};

function isTestModeEnabled() {
  const raw = (process.env.RESEND_TEST_MODE || '').trim().toLowerCase();
  return raw === 'true' || raw === '1' || raw === 'yes';
}

export async function sendEmail(fields: ContactFields): Promise<SendEmailResult> {
  const apiKey = requireEnv('RESEND_API_KEY');

  const fromEmailRaw = requireEnv('CONTACT_FROM_EMAIL');
  const toEmailRaw = requireEnv('CONTACT_TO_EMAIL');

  const safeFromEmail = sanitizeEmailHeaderValue(fromEmailRaw);
  const safeOwnerEmail = sanitizeEmailHeaderValue(toEmailRaw);

  validateEmailConfig(safeFromEmail);

  const testMode = isTestModeEnabled();

  const safeName = sanitizeEmailHeaderValue(fields.name);
  const safeCustomerEmail = sanitizeEmailHeaderValue(fields.email);
  const safePhone = sanitizeEmailHeaderValue(fields.phone);
  const safeAddress = sanitizeEmailHeaderValue(fields.address);
  const safeService = sanitizeEmailHeaderValue(fields.service);
  const safeMessage = (fields.message || '').replace(/[\r\n]+/g, '\n').trim();

  // -------------------------
  // 1) EMAIL TO BUSINESS OWNER
  // -------------------------
  const ownerSubject = sanitizeEmailHeaderValue(`New Quote Request - ${safeName}`);
  const ownerText = [
    'New quote request received.',
    '',
    `Name: ${safeName}`,
    `Email: ${safeCustomerEmail}`,
    `Phone: ${safePhone}`,
    `Address: ${safeAddress}`,
    `Service: ${safeService}`,
    '',
    'Message:',
    safeMessage,
  ].join('\n');

  const ownerResult = await resendFetch(apiKey, {
    from: safeFromEmail,
    to: [safeOwnerEmail],
    subject: ownerSubject,
    text: ownerText,
    reply_to: safeCustomerEmail,
  });

  // -------------------------
  // 2) EMAIL TO CUSTOMER
  // -------------------------
  let customerDeliveredTo = safeCustomerEmail;

  if (testMode) {
    console.warn('RESEND_TEST_MODE enabled: rerouting customer email to owner.', {
      customerEmail: safeCustomerEmail,
      deliveredTo: safeOwnerEmail,
    });
    customerDeliveredTo = safeOwnerEmail;
  }

  const customerSubject = sanitizeEmailHeaderValue(
    'Thanks for requesting a quote with Tidal Wave Pressure Cleaning',
  );

  const customerText = [
    `Hi ${safeName},`,
    '',
    'Thanks for requesting a quote with Tidal Wave Pressure Cleaning.',
    'We received your request and will get back to you shortly.',
    '',
    'Your request details:',
    `Phone: ${safePhone}`,
    `Service: ${safeService}`,
    `Address: ${safeAddress}`,
    '',
    'Message:',
    safeMessage,
    '',
    'If you need to update anything, just reply to this email.',
  ].join('\n');

  const customerResult = await resendFetch(apiKey, {
    from: safeFromEmail,
    to: [customerDeliveredTo],
    subject: customerSubject,
    text: customerText,
    reply_to: safeOwnerEmail,
  });

  return {
    ownerMessageId: ownerResult.id,
    customerMessageId: customerResult.id,
    testMode,
    customerDeliveredTo,
  };
}
