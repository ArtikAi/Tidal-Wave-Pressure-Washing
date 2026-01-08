const trustedScriptSources = new Set([
  'https://cdn.voiceflow.com/widget/bundle.mjs',
  'https://challenges.cloudflare.com/turnstile/v0/api.js',
]);

type ScriptAttributes = Record<string, string>;

type ScriptOptions = {
  id?: string;
  async?: boolean;
  defer?: boolean;
  type?: string;
  dataAttributes?: ScriptAttributes;
};

export function appendTrustedScript(source: string, options: ScriptOptions = {}) {
  if (!trustedScriptSources.has(source)) {
    console.warn(`Blocked untrusted script source: ${source}`);
    return null;
  }

  if (options.id) {
    const existingById = document.getElementById(options.id);
    if (existingById instanceof HTMLScriptElement) {
      return existingById;
    }
  }

  const existingBySrc = document.querySelector(`script[src="${source}"]`);
  if (existingBySrc instanceof HTMLScriptElement) {
    return existingBySrc;
  }

  const script = document.createElement('script');
  script.src = source;
  script.async = options.async ?? true;
  script.defer = options.defer ?? true;
  script.type = options.type ?? 'text/javascript';

  if (options.id) {
    script.id = options.id;
  }

  if (options.dataAttributes) {
    for (const [key, value] of Object.entries(options.dataAttributes)) {
      script.dataset[key] = value;
    }
  }

  const parent = document.head || document.body;
  parent.appendChild(script);
  return script;
}

export function sanitizePlainText(value: string, maxLength = 2000) {
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  return cleaned.trim().slice(0, maxLength);
}

export function toSafeHttpUrl(value: string, allowedOrigins: string[] = []) {
  try {
    const url = new URL(value, window.location.origin);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null;
    }
    if (allowedOrigins.length > 0 && !allowedOrigins.includes(url.origin)) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

export function isTrustedScriptSource(source: string) {
  return trustedScriptSources.has(source);
}
