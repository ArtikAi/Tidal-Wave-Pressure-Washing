const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

export async function redis(command: unknown[]) {
  if (!redisUrl || !redisToken) {
    throw new Error('redis_not_configured');
  }

  const res = await fetch(redisUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redisToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || (data as { error?: string }).error) {
    throw new Error((data as { error?: string }).error || 'redis_error');
  }
  return (data as { result: unknown }).result;
}
