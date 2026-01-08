import { MAX_LINKS } from './constants';
import { hmac, normalizeForHash } from './crypto';

const spamTerms = [
  'viagra',
  'casino',
  'loan',
  'crypto',
  'bitcoin',
  'forex',
  'seo',
  'backlink',
  'guest post',
  'marketing',
  'telegram',
  'whatsapp',
  'porn',
  'xxx',
];

const allowedServices = new Set([
  'house-washing',
  'roof-cleaning',
  'driveway-walkway',
  'patio-porch',
  'fence-washing',
  'commercial',
  'other',
]);

const namePattern = /^[A-Za-z][A-Za-z .,'-]{1,79}$/;
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phonePattern = /^[0-9()+\- ]{7,20}$/;

export type ParsedPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
  company: string;
  turnstileToken: string;
};

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
};

type ValidationError = {
  ok: false;
  reason: string;
  message: string;
  statusCode: number;
};

type ValidationSuccess = {
  ok: true;
  data: ContactFields;
};

export type ValidationResult = ValidationError | ValidationSuccess;

export function parsePayload(payload: Record<string, unknown>): ParsedPayload {
  return {
    name: typeof payload.name === 'string' ? payload.name.trim() : '',
    email: typeof payload.email === 'string' ? payload.email.trim() : '',
    phone: typeof payload.phone === 'string' ? payload.phone.trim() : '',
    address: typeof payload.address === 'string' ? payload.address.trim() : '',
    service: typeof payload.service === 'string' ? payload.service.trim() : '',
    message: typeof payload.message === 'string' ? payload.message.trim() : '',
    company: typeof payload.company === 'string' ? payload.company.trim() : '',
    turnstileToken:
      typeof payload.turnstileToken === 'string' ? payload.turnstileToken.trim() : '',
  };
}

export function hasHoneypot(payload: ParsedPayload) {
  return Boolean(payload.company);
}

export function validateFields(payload: ParsedPayload): ValidationResult {
  const { name, email, phone, address, service, message } = payload;

  if (!namePattern.test(name)) {
    return { ok: false, reason: 'invalid_name', message: 'Invalid submission', statusCode: 400 };
  }

  if (!emailPattern.test(email) || email.length > 120) {
    return { ok: false, reason: 'invalid_email', message: 'Invalid submission', statusCode: 400 };
  }

  if (!phonePattern.test(phone)) {
    return { ok: false, reason: 'invalid_phone', message: 'Invalid submission', statusCode: 400 };
  }

  if (address.length < 5 || address.length > 200) {
    return { ok: false, reason: 'invalid_address', message: 'Invalid submission', statusCode: 400 };
  }

  if (!allowedServices.has(service)) {
    return { ok: false, reason: 'invalid_service', message: 'Invalid submission', statusCode: 400 };
  }

  if (message.length < 10 || message.length > 2000) {
    return { ok: false, reason: 'invalid_message', message: 'Invalid submission', statusCode: 400 };
  }

  const combinedText = normalizeForHash([name, email, phone, address, service, message].join(' '));
  const linkMatches = combinedText.match(/https?:\/\/|www\./g) || [];
  if (linkMatches.length > MAX_LINKS) {
    return { ok: false, reason: 'too_many_links', message: 'Invalid submission', statusCode: 400 };
  }

  if (spamTerms.some((term) => combinedText.includes(term))) {
    return { ok: false, reason: 'spam_terms', message: 'Invalid submission', statusCode: 400 };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      address,
      service,
      message,
    },
  };
}

export function buildPayloadHash(fields: ContactFields) {
  return hmac(
    [fields.name, fields.email, fields.phone, fields.address, fields.service, fields.message]
      .map(normalizeForHash)
      .join('|'),
  );
}
