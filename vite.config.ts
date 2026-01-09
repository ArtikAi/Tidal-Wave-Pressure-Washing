import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import testEmailHandler from './api/test-email';
import contactHandler from './api/contact';

import type { VercelRequest, VercelResponse } from './api/_lib/types';

function adaptVercelResponse(res: any): VercelResponse {
  const vercelRes = res as VercelResponse;

  if (typeof (vercelRes as any).status !== 'function') {
    (vercelRes as any).status = (statusCode: number) => {
      res.statusCode = statusCode;
      return vercelRes;
    };
  }

  if (typeof (vercelRes as any).send !== 'function') {
    (vercelRes as any).send = (body: string) => {
      if (!res.getHeader('Content-Type')) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      }
      res.end(body);
    };
  }

  // Optional: if any handler ever expects res.json()
  if (typeof (vercelRes as any).json !== 'function') {
    (vercelRes as any).json = (obj: unknown) => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(obj));
    };
  }

  return vercelRes;
}

function adaptVercelRequest(req: any): VercelRequest {
  // Node IncomingMessage already has method + headers.
  // Your VercelRequest type likely includes body?: any and query?: any.
  // We keep it minimal; handlers that need body should use readRequestBody(req).
  return req as VercelRequest;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      {
        name: 'local-api',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            try {
              if (!req.url || !req.url.startsWith('/api/')) {
                return next();
              }

              const url = req.url.split('?')[0];

              const vercelReq = adaptVercelRequest(req);
              const vercelRes = adaptVercelResponse(res);

              // Route to the correct handler
              if (url === '/api/test-email') {
                await testEmailHandler(vercelReq, vercelRes);
                return;
              }

              if (url === '/api/contact') {
                await contactHandler(vercelReq, vercelRes);
                return;
              }

              // Unknown API route
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ ok: false, error: 'not_found' }));
            } catch (error) {
              next(error);
            }
          });
        },
      },
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
