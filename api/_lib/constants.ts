export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
export const MAX_LINKS = 1;
export const MAX_BODY_BYTES = 20 * 1024;
export const DUPLICATE_TTL_SECONDS = Math.ceil(DUPLICATE_WINDOW_MS / 1000);
export const RATE_LIMIT_TTL_SECONDS = Math.ceil(RATE_LIMIT_WINDOW_MS / 1000);
export const METRICS_TTL_SECONDS = 60 * 60 * 24 * 30;
