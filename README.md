# Tidal Wave Pressure Cleaning

## Vercel Setup (App + Secure Contact API)
- Deploy with the included `vercel.json` (static Vite build from `dist`, SPA fallback, and `/api` routes).
- Environment variables (set in Vercel project settings, server-side values never exposed to the client):
  - `VITE_TURNSTILE_SITE_KEY` (client) – Cloudflare Turnstile site key.
  - `TURNSTILE_SECRET_KEY` (server) – Cloudflare Turnstile secret key.
- `ALLOWED_ORIGINS` – Comma-separated allowlist for CORS (e.g., `https://tidalwavepressurecleaning.com,http://localhost:5173`).
  - `RESEND_API_KEY` – Resend API key for outbound email.
  - `CONTACT_FROM_EMAIL` – Verified sender for Resend.
  - `CONTACT_TO_EMAIL` – Destination email for form submissions.
  - `LOG_SALT` – Required HMAC salt for hashing IPs.
  - `UPSTASH_REDIS_REST_URL` – Upstash Redis REST URL (rate limiting + duplicate detection + metrics).
  - `UPSTASH_REDIS_REST_TOKEN` – Upstash Redis REST token.
  - `RATE_LIMIT_ALLOWLIST` – Comma-separated IPs to bypass rate limiting (e.g., `127.0.0.1,::1`).
- Frontend form posts to `/api/contact`.
- Run locally with `npm install`, `npm run dev` (frontend) and `vercel dev` if you want to exercise the API route locally.

## Security Headers (Vercel)
Headers are set in `vercel.json` for all routes.

Strict CSP (current):
```
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';
form-action 'self';
img-src 'self' https: data:;
font-src 'self' data:;
style-src 'self' 'unsafe-inline';
script-src 'self' https://challenges.cloudflare.com;
script-src-attr 'none';
connect-src 'self' https://challenges.cloudflare.com;
frame-src https://www.google.com https://challenges.cloudflare.com;
worker-src 'self' blob:;
upgrade-insecure-requests
```

Compatible CSP (if you need to allow additional inline scripts):
```
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';
form-action 'self';
img-src 'self' https: data:;
font-src 'self' data:;
style-src 'self' 'unsafe-inline';
script-src 'self' https://challenges.cloudflare.com 'unsafe-inline';
script-src-attr 'none';
connect-src 'self' https://challenges.cloudflare.com;
frame-src https://www.google.com https://challenges.cloudflare.com;
worker-src 'self' blob:;
upgrade-insecure-requests
```

JSON-LD is now loaded from `public/schema.jsonld` to avoid inline script hashes. Update that file when business metadata changes.

Other headers in `vercel.json`: HSTS (`Strict-Transport-Security`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive `Permissions-Policy`.

## Security Notes
- React output is escaped by default; `dangerouslySetInnerHTML` is blocked by lint/CI.
- Dynamic script injection is allowlisted via `src/utils/security.ts`; Turnstile loads on demand.
- Run `npm run security:check` (grep for `dangerouslySetInnerHTML`) and `npm run install-script-check` (postinstall allowlist) in CI.

## Upstash Redis (Rate Limit, Duplicate Detection, Metrics)
- Use REST mode credentials: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- Set `LOG_SALT` so IPs are HMAC-hashed before any storage/logging.
- Set `RATE_LIMIT_ALLOWLIST` for trusted dev IPs.
- Behavior: sliding window 5 requests / 10 minutes per IP hash; duplicate submissions suppressed for 10 minutes; fail-closed fallback allows only one request per 10-minute window on Redis errors.

## Contact Function Monitoring (Vercel)
The `/api/contact` function logs JSON metrics without PII:
```
{"level":"info","metric":"accepted","date":"20250108","count":12,"source":"redis"}
{"level":"info","metric":"rejected","reason":"spam_terms","date":"20250108","count":4,"total":9,"source":"redis"}
```
Recommended alert thresholds:
- Rejected requests > 10 in 10 minutes (low-traffic baseline).
- Rejection rate > 50% sustained for 15+ minutes.
- Spikes in `reason=rate_limited` or `reason=turnstile_failed`.

Alerting options:
- Vercel log drains to an APM/log service (e.g., Datadog, Better Stack) and create alerts on the JSON fields above.
- Custom webhook processor that triggers Slack/email when thresholds are exceeded.

## Production Hardening Checklist (Vercel)
- [ ] HTTPS works and redirects HTTP → HTTPS; HSTS present.
- [ ] CSP, X-Frame-Options/frame-ancestors, X-Content-Type-Options, Referrer-Policy, Permissions-Policy present (check with `curl -I https://yourdomain`).
- [ ] `ALLOWED_ORIGINS` includes only production domains.
- [ ] Turnstile site/secret keys set; verification succeeds.
- [ ] Rate limit settings verified; duplicates blocked.
- [ ] Spam rejection logs visible in Vercel logs/log drain; alerts configured.
- [ ] Lead retention/backup policy defined if storing submissions elsewhere.
- [ ] Privacy policy updated; cookie banner added if trackers are enabled.

## How to Test in Production
- Headers: `curl -I https://yourdomain` and confirm CSP, HSTS, XFO, Referrer-Policy, Permissions-Policy, nosniff.
- Contact API: send a valid request
  ```
  curl -i -X POST https://yourdomain/api/contact \
    -H "Origin: https://yourdomain" \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User","email":"test@example.com","phone":"+1 555 555 5555","address":"123 Test St","service":"house-washing","message":"Testing","company":"","turnstileToken":"TEST"}'
  ```
  Expect `200 OK` when Turnstile is valid; expect 4xx with `{"ok":false,"error":...}` for invalid inputs. For CORS, ensure `Origin` is in `ALLOWED_ORIGINS`.
- ALLOWED_ORIGINS tips: list exact origins in lowercase, no trailing slash; include both with and without `www` if you serve both (e.g., `https://tidalwavepressurecleaning.com,https://www.tidalwavepressurecleaning.com`).
