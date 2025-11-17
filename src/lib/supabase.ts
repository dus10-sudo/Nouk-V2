// src/lib/supabase.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars');
}

// Plain shared client used from server & client
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// Very loose types on purpose so TypeScript doesn’t block builds
export type Room = {
  id: string;
  slug: string;
  title: string;
};

export type Thread = {
  id: string;
  room_id: string;
  title: string;
  body: string | null;
  link_url: string | null;
  created_at: string;
};

export type Reply = {
  id: string;
  thread_id: string;
  body: string;
  created_at: string;
};
