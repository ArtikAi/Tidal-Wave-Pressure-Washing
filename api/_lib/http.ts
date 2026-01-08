import { MAX_BODY_BYTES } from './constants';
import type { VercelRequest } from './types';

export function getHeader(headers: VercelRequest['headers'], key: string): string {
  const lower = key.toLowerCase();
  const value = headers[lower] || headers[key];
  return Array.isArray(value) ? value[0] || '' : value || '';
}

export function getClientIp(headers: VercelRequest['headers']): string {
  const direct = getHeader(headers, 'x-real-ip') || getHeader(headers, 'x-forwarded-for');
  if (direct) {
    return direct.split(',')[0].trim();
  }
  return '';
}

export function parseContentLength(headerValue: string) {
  if (!headerValue) {
    return null;
  }
  const parsed = Number.parseInt(headerValue, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

export function getBodySize(body: unknown): number {
  if (typeof body === 'string') {
    return Buffer.byteLength(body, 'utf8');
  }
  if (Buffer.isBuffer(body)) {
    return body.byteLength;
  }
  if (body && typeof body === 'object') {
    return Buffer.byteLength(JSON.stringify(body), 'utf8');
  }
  return 0;
}

export async function readRequestBody(req: VercelRequest): Promise<string> {
  if (typeof req.body === 'string') {
    return req.body;
  }

  if (Buffer.isBuffer(req.body)) {
    return req.body.toString('utf8');
  }

  if (req.body && typeof req.body === 'object') {
    return JSON.stringify(req.body);
  }

  return new Promise((resolve, reject) => {
    let total = 0;
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      total += chunk.length;
      if (total > MAX_BODY_BYTES) {
        reject(new Error('payload_too_large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
