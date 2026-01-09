import { defineConfig, loadEnv, type Connect, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';

import testEmailHandler from './api/test-email';
import contactHandler from './api/contact';

import type { VercelRequest, VercelResponse } from './api/_lib/types';

type MutableVercelResponse = VercelResponse & {
  status?: (statusCode: number) => VercelResponse;
  send?: (body: string) => void;
  json?: (obj: unknown) => void;
};

function adaptVercelResponse(res: Connect.ServerResponse): VercelResponse {
  const vercelRes = res as MutableVercelResponse;

  if (typeof vercelRes.status !== 'function') {
    vercelRes.status = (statusCode: number) => {
      res.statusCode = statusCode;
      return vercelRes as VercelResponse;
    };
  }

  if (typeof vercelRes.send !== 'function') {
    vercelRes.send = (body: string) => {
      if (!res.getHeader('Content-Type')) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      }
      res.end(body);
    };
  }

  // Optional: if a handler expects res.json()
  if (typeof vercelRes.json !== 'function') {
    vercelRes.json = (obj: unknown) => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(obj));
    };
  }

  return vercelRes as VercelResponse;
}

function adaptVercelRequest(req: Connect.IncomingMessage): VercelRequest {
  // Node IncomingMessage already has method + headers.
  // We keep it minimal; handlers that need body should use readRequestBody(req).
  return req as VercelRequest;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  const localApiPlugin: Plugin = {
    name: 'local-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(
        async (
          req: Connect.IncomingMessage,
          res: Connect.ServerResponse,
          next: Connect.NextFunction,
        ) => {
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
        },
      );
    },
  };

  return {
    plugins: [
      react(),
      localApiPlugin,
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
