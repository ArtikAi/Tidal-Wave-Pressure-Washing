import crypto from 'crypto';

export function hmac(value: string) {
  const salt = process.env.LOG_SALT || '';
  return crypto.createHmac('sha256', salt).update(value).digest('hex');
}

export function hashIp(ip: string) {
  return hmac(ip);
}

export function normalizeForHash(value: string) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}
