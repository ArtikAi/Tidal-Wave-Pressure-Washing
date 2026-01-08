import type { IncomingMessage, ServerResponse } from 'http';

export type JsonResponse = { ok: boolean; error?: string };

export type VercelRequest = IncomingMessage & {
  headers: Record<string, string | string[] | undefined>;
  method?: string;
  body?: unknown;
};

export type VercelResponse = ServerResponse & {
  status: (statusCode: number) => VercelResponse;
  send: (body: string) => void;
};
