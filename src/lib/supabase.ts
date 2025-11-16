// src/lib/supabase.ts
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient as createServerClient } from "@supabase/supabase-js";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          "X-Client-Info": "Nouk/SSR",
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
