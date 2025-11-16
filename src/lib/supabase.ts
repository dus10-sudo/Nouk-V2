// src/lib/supabase.ts
import { cookies } from "next/headers";
import { createServerClient, createBrowserClient, type CookieOptions } from "@supabase/ssr";

// Use your environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/* --------------------------------------------------------
   1) BROWSER CLIENT (for client components)
--------------------------------------------------------- */
export function createBrowserSupabase() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/* --------------------------------------------------------
   2) SERVER CLIENT (for API routes & server components)
--------------------------------------------------------- */
export function createServerSupabase() {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          /* ignore */
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          /* ignore */
        }
      }
    }
  });
}

/* --------------------------------------------------------
   3) SIMPLE SHARED FALLBACK CLIENT (non-auth use)
--------------------------------------------------------- */
export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
