import { METRICS_TTL_SECONDS } from './constants';
import { redis } from './redis';

const fallbackMetrics = new Map<string, number>();

export function logInfo(message: Record<string, unknown>) {
  console.info(JSON.stringify({ level: 'info', ...message }));
}

export function logWarning(reason: string) {
  console.warn(JSON.stringify({ level: 'warn', reason }));
}

function getDateKey(now: number) {
  return new Date(now).toISOString().slice(0, 10).replace(/-/g, '');
}

function incrementFallbackMetric(key: string) {
  const current = fallbackMetrics.get(key) || 0;
  const next = current + 1;
  fallbackMetrics.set(key, next);
  return next;
}

async function incrementMetric(key: string) {
  try {
    const count = (await redis(['INCR', key])) as number;
    await redis(['EXPIRE', key, METRICS_TTL_SECONDS]);
    return { count, source: 'redis' };
  } catch (error) {
    return { count: incrementFallbackMetric(key), source: 'fallback' };
  }
}

export async function recordDecision(type: 'accepted' | 'rejected', reason: string | null, now: number) {
  const dateKey = getDateKey(now);
  const baseKey = `metrics:contact:${type}:${dateKey}`;
  const baseMetric = await incrementMetric(baseKey);

  if (reason) {
    const reasonKey = `metrics:contact:${type}:${reason}:${dateKey}`;
    const reasonMetric = await incrementMetric(reasonKey);
    logInfo({
      metric: type,
      reason,
      date: dateKey,
      count: reasonMetric.count,
      total: baseMetric.count,
      source: reasonMetric.source,
    });
    return;
  }

  logInfo({
    metric: type,
    date: dateKey,
    count: baseMetric.count,
    source: baseMetric.source,
  });
}
