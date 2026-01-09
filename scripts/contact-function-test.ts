import assert from 'assert';
import handler from '../api/contact.ts';
import type { VercelRequest, VercelResponse } from '../api/_lib/types';

process.env.ALLOWED_ORIGINS = 'http://localhost:5173';
process.env.RATE_LIMIT_ALLOWLIST = '127.0.0.1,::1';
process.env.LOG_SALT = 'test-salt';
process.env.TURNSTILE_SECRET_KEY = 'test-turnstile';
process.env.RESEND_API_KEY = 'test-resend';
process.env.CONTACT_FROM_EMAIL = 'test@example.com';
process.env.CONTACT_TO_EMAIL = 'test@example.com';

type MockFetchResponse = {
  ok: boolean;
  json: () => Promise<Record<string, unknown>>;
};

type MockRequest = {
  method: string;
  headers: Record<string, string>;
  body?: unknown;
};

type MockResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
  status: (code: number) => MockResponse;
  setHeader: (key: string, value: string) => void;
  send: (body: string) => void;
  end: (body?: string) => void;
};

const originalFetch = global.fetch;
const mockFetch = async (url: string): Promise<MockFetchResponse> => {
  if (typeof url === 'string' && url.includes('turnstile')) {
    return {
      ok: true,
      json: async () => ({ success: true }),
    };
  }
  return {
    ok: true,
    json: async () => ({}),
  };
};
global.fetch = mockFetch as unknown as typeof fetch;

function makeRes() {
  const res: MockResponse = {
    statusCode: 200,
    headers: {},
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

const baseReq: MockRequest = {
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
await handler(oversizedReq as unknown as VercelRequest, resOversized as unknown as VercelResponse);
assert.strictEqual(resOversized.statusCode, 413, 'Expected 413 for oversized payload');

const nonJsonReq = {
  ...baseReq,
  headers: {
    ...baseReq.headers,
    'content-type': 'text/plain',
  },
};
const resNonJson = makeRes();
await handler(nonJsonReq as unknown as VercelRequest, resNonJson as unknown as VercelResponse);
assert.strictEqual(resNonJson.statusCode, 415, 'Expected 415 for non-JSON content type');

const resOk = makeRes();
await handler(baseReq as unknown as VercelRequest, resOk as unknown as VercelResponse);
assert.strictEqual(resOk.statusCode, 200, 'Expected 200 for valid payload');

// OPTIONS allowed origin
const optionsAllowed: MockRequest = {
  method: 'OPTIONS',
  headers: {
    origin: 'http://localhost:5173',
  },
};
const resOptionsAllowed = makeRes();
await handler(
  optionsAllowed as unknown as VercelRequest,
  resOptionsAllowed as unknown as VercelResponse,
);
assert.strictEqual(resOptionsAllowed.statusCode, 204, 'Expected 204 for allowed preflight');
assert.strictEqual(
  resOptionsAllowed.headers['access-control-allow-origin'],
  'http://localhost:5173',
  'Expected ACAO for allowed origin',
);

// OPTIONS disallowed origin
const optionsDisallowed: MockRequest = {
  method: 'OPTIONS',
  headers: {
    origin: 'http://evil.com',
  },
};
const resOptionsDisallowed = makeRes();
await handler(
  optionsDisallowed as unknown as VercelRequest,
  resOptionsDisallowed as unknown as VercelResponse,
);
assert.strictEqual(resOptionsDisallowed.statusCode, 403, 'Expected 403 for disallowed preflight');
assert.strictEqual(
  resOptionsDisallowed.headers['access-control-allow-origin'],
  undefined,
  'Disallowed origin should not get ACAO',
);

global.fetch = originalFetch;
console.log('Contact function tests passed.');
