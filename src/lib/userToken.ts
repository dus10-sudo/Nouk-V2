// src/lib/userToken.ts

const STORAGE_KEY = 'nouk_user_token_v1';

let cachedToken: string | null = null;

/**
 * Returns a stable, anonymous token for this browser.
 * - Stored in localStorage so it sticks between sessions
 * - Never exposes any personal info
 */
export function getOrCreateUserToken(): string {
  // If we've already got it in memory, return it
  if (cachedToken) return cachedToken;

  // Only touch localStorage in the browser
  if (typeof window === 'undefined') {
    // Fallback token for any accidental server-side usage
    cachedToken = `srv-${randomId()}`;
    return cachedToken;
  }

  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing && typeof existing === 'string') {
      cachedToken = existing;
      return cachedToken;
    }
  } catch {
    // If localStorage is blocked, we’ll just generate an in-memory token
  }

  const fresh = randomId();
  cachedToken = fresh;

  try {
    window.localStorage.setItem(STORAGE_KEY, fresh);
  } catch {
    // Ignore storage errors – token will just last for this session
  }

  return fresh;
}

/**
 * Simple random ID helper.
 * Uses crypto.randomUUID when available, falls back to a lightweight random string.
 */
function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return 'nouk-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
