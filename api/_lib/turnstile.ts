export async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { ok: false, reason: 'turnstile_not_configured' };
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip) {
    params.set('remoteip', ip);
  }

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const data = await result.json().catch(() => ({}));
  return { ok: Boolean((data as { success?: boolean }).success), data };
}
