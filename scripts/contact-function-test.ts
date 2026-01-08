import assert from 'assert';
import handler from '../api/contact.ts';

process.env.ALLOWED_ORIGINS = 'http://localhost:5173';
process.env.RATE_LIMIT_ALLOWLIST = '127.0.0.1,::1';
process.env.LOG_SALT = 'test-salt';
process.env.TURNSTILE_SECRET_KEY = 'test-turnstile';
process.env.RESEND_API_KEY = 'test-resend';
process.env.CONTACT_FROM_EMAIL = 'test@example.com';
process.env.CONTACT_TO_EMAIL = 'test@example.com';

const originalFetch = global.fetch;
global.fetch = (async (url: string) => {
  if (typeof url === 'string' && url.includes('turnstile')) {
    return {
      ok: true,
      json: async () => ({ success: true }),
    } as any;
  }
  return {
    ok: true,
    json: async () => ({}),
  } as any;
}) as any;

function makeRes() {
  const res: any = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: '',
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    setHeader(key: string, value: string) {
      this.headers[key.toLowerCase()] = value;
    },
    send(body: string) {
      this.body = body;
    },
    end(body?: string) {
      this.body = body ?? '';
    },
  };
  return res;
}

const baseReq: any = {
  method: 'POST',
  headers: {
    origin: 'http://localhost:5173',
    'content-type': 'application/json',
    'x-real-ip': '127.0.0.1',
  },
  body: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1 555 555 5555',
    address: '123 Test St',
    service: 'house-washing',
    message: 'Looking for a quote on exterior cleaning.',
    company: '',
    turnstileToken: 'token',
  },
};

const oversizedReq = {
  ...baseReq,
  headers: {
    ...baseReq.headers,
    'content-length': String(20 * 1024 + 1),
  },
  body: 'a'.repeat(20 * 1024 + 1),
};

const resOversized = makeRes();
await handler(oversizedReq, resOversized);
assert.strictEqual(resOversized.statusCode, 413, 'Expected 413 for oversized payload');

const nonJsonReq = {
  ...baseReq,
  headers: {
    ...baseReq.headers,
    'content-type': 'text/plain',
  },
};
const resNonJson = makeRes();
await handler(nonJsonReq, resNonJson);
assert.strictEqual(resNonJson.statusCode, 415, 'Expected 415 for non-JSON content type');

const resOk = makeRes();
await handler(baseReq, resOk);
assert.strictEqual(resOk.statusCode, 200, 'Expected 200 for valid payload');

// OPTIONS allowed origin
const optionsAllowed: any = {
  method: 'OPTIONS',
  headers: {
    origin: 'http://localhost:5173',
  },
};
const resOptionsAllowed = makeRes();
await handler(optionsAllowed, resOptionsAllowed);
assert.strictEqual(resOptionsAllowed.statusCode, 204, 'Expected 204 for allowed preflight');
assert.strictEqual(
  resOptionsAllowed.headers['access-control-allow-origin'],
  'http://localhost:5173',
  'Expected ACAO for allowed origin',
);

// OPTIONS disallowed origin
const optionsDisallowed: any = {
  method: 'OPTIONS',
  headers: {
    origin: 'http://evil.com',
  },
};
const resOptionsDisallowed = makeRes();
await handler(optionsDisallowed, resOptionsDisallowed);
assert.strictEqual(resOptionsDisallowed.statusCode, 403, 'Expected 403 for disallowed preflight');
assert.strictEqual(
  resOptionsDisallowed.headers['access-control-allow-origin'],
  undefined,
  'Disallowed origin should not get ACAO',
);

global.fetch = originalFetch;
console.log('Contact function tests passed.');
