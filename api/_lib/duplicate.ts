import { DUPLICATE_TTL_SECONDS, DUPLICATE_WINDOW_MS } from './constants';
import { logWarning } from './logging';
import { redis } from './redis';

const fallbackDuplicate = new Map<string, number>();

export async function checkDuplicate(payloadHash: string, now: number, isAllowlisted: boolean) {
  if (isAllowlisted) {
    return { ok: true, source: 'allowlist' };
  }

  try {
    const dupKey = `dup:${payloadHash}`;
    const exists = (await redis(['EXISTS', dupKey])) as number;
    if (exists) {
      return { ok: false, source: 'redis' };
    }
    const setResult = (await redis([
      'SET',
      dupKey,
      '1',
      'EX',
      DUPLICATE_TTL_SECONDS,
      'NX',
    ])) as string | null;
    if (setResult !== 'OK') {
      return { ok: false, source: 'redis' };
    }
    return { ok: true, source: 'redis' };
  } catch (error) {
    logWarning('duplicate_redis_error');
    const record = fallbackDuplicate.get(payloadHash);
    if (record && now - record < DUPLICATE_WINDOW_MS) {
      return { ok: false, source: 'fallback' };
    }
    fallbackDuplicate.set(payloadHash, now);
    return { ok: true, source: 'fallback' };
  }
}
