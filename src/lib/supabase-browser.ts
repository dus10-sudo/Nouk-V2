// src/lib/supabase-browser.ts
'use client';

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase-browser] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.'
  );
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: {
    persistSession: false,
  },
});

// Optional helper (not used yet, but handy later)
export function getOrCreateUserToken(): string {
  if (typeof window === 'undefined') return '';
  const STORAGE_KEY = 'nouk_utk';
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  const token =
    (window.crypto?.randomUUID && window.crypto.randomUUID()) ||
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

  window.localStorage.setItem(STORAGE_KEY, token);
  return token;
}
