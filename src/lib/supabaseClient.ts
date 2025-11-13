// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !anon) {
  throw new Error('Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const sb = createClient(url, anon, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export default sb;
