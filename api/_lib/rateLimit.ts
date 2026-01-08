import {
  RATE_LIMIT_MAX,
  RATE_LIMIT_TTL_SECONDS,
  RATE_LIMIT_WINDOW_MS,
} from './constants';
import { logWarning } from './logging';
import { redis } from './redis';

const fallbackRate = new Map<string, { count: number; ts: number }>();

export async function enforceRateLimit(ipHash: string, now: number, isAllowlisted: boolean) {
  if (isAllowlisted) {
    return { ok: true, source: 'allowlist' };
  }

  try {
    await redis(['ZREMRANGEBYSCORE', `rl:${ipHash}`, 0, now - RATE_LIMIT_WINDOW_MS]);
    const count = (await redis(['ZCARD', `rl:${ipHash}`])) as number;
    if (count >= RATE_LIMIT_MAX) {
      return { ok: false, source: 'redis' };
    }
    await redis(['ZADD', `rl:${ipHash}`, now, String(now)]);
    await redis(['EXPIRE', `rl:${ipHash}`, RATE_LIMIT_TTL_SECONDS]);
    return { ok: true, source: 'redis' };
  } catch (error) {
    logWarning('rate_limit_redis_error');
    const record = fallbackRate.get(ipHash) || { count: 0, ts: now };
    if (now - record.ts > RATE_LIMIT_WINDOW_MS) {
      record.count = 0;
      record.ts = now;
    }
    record.count += 1;
    fallbackRate.set(ipHash, record);
    if (record.count > 1) {
      return { ok: false, source: 'fallback' };
    }
    return { ok: true, source: 'fallback' };
  }
}
