// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

/* --------------------------------------------------------
   ENV VALUES
--------------------------------------------------------- */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/* --------------------------------------------------------
   1) SIMPLE BROWSER CLIENT
--------------------------------------------------------- */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* --------------------------------------------------------
   2) SERVER CLIENT (used in API routes)
--------------------------------------------------------- */
export function createServerSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/* --------------------------------------------------------
   3) Function names compatible with older file imports
--------------------------------------------------------- */
export function createBrowserSupabase() {
  return supabase;
}
