import type { VercelRequest, VercelResponse } from './_lib/types';
import { reject, respond } from './_lib/response';

type ResendSuccess = { id: string };
type ResendError = { message?: string; name?: string; statusCode?: number };

async function sendTestEmail() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error('email_not_configured');
  }

  // 🔎 DEBUG: print what env values are actually being used (no secrets leaked)
  console.log('TEST EMAIL CONFIG:', {
    fromEmail,
    toEmail,
    hasApiKey: Boolean(apiKey),
  });

  // Timeout so local dev/serverless never hangs on fetch
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: 'Resend test email',
        text: 'If you received this, Resend is correctly configured.',
      }),
      signal: controller.signal,
    });

    // Resend may return non-JSON on some failures; don't crash on parse
    const data = (await response.json().catch(() => null)) as
      | ResendSuccess
      | ResendError
      | null;

    if (!response.ok) {
      console.error('Resend test failed:', {
        status: response.status,
        statusText: response.statusText,
        data,
      });
      throw new Error('email_send_failed');
    }

    return data as ResendSuccess;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('Resend test failed: request timed out');
      throw new Error('email_send_timeout');
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const now = Date.now();

  if (req.method !== 'GET') {
    return reject(res, 'method_not_allowed', 405, 'Method not allowed', '', now);
  }

  try {
    const result = await sendTestEmail();

    // Log the ID so you can confirm it in Resend dashboard
    console.log('Resend test success:', result);

    // IMPORTANT: keep response shape to match your JsonResponse typing
    return respond(res, 200, { ok: true }, '');
  } catch (error) {
    console.error('Test email failed:', {
      message: error instanceof Error ? error.message : String(error),
    });

    const reason =
      error instanceof Error && error.message === 'email_not_configured'
        ? 'email_not_configured'
        : 'test_failed';

    const message = reason === 'email_not_configured' ? 'Email not configured' : 'Test failed';

    const statusCode = 500;

    return reject(res, reason, statusCode, message, '', now);
  }
}
