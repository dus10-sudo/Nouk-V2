// src/lib/actions.ts
'use server';

import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { getRoomBySlug } from './queries';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const sb = createClient(supabaseUrl, supabaseKey);

function ensureToken(): string {
  const store = cookies();
  const key = 'nouk_user_token';
  const existing = store.get(key)?.value;
  if (existing) return existing;

  const v = randomUUID();
  // httpOnly false so we can later do fun UX things client-side if needed
  store.set(key, v, {
    httpOnly: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });

  return v;
}

// Create a new thread that auto-expires 24h after creation.
// NOTE: expires_at is ONLY set here and never extended.
export async function createThread(
  roomSlug: string,
  title: string,
  link_url?: string | null
): Promise<string> {
  const room = await getRoomBySlug(roomSlug);
  if (!room) throw new Error(`Room not found: ${roomSlug}`);

  const user_token = ensureToken();
  const now = new Date();
  const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000); // +24h

  const { data, error } = await sb
    .from('threads')
    .insert({
      room_id: room.id,
      title,
      link_url: link_url ?? null,
      user_token,
      is_archived: false,
      expires_at: expires.toISOString(),
      last_activity: now.toISOString(),
    })
    .select('id')
    .maybeSingle();

  if (error) throw error;
  return data!.id as string;
}

// Add a reply and update last_activity ONLY (no expiry extension)
export async function addReply(threadId: string, body: string): Promise<void> {
  const user_token = ensureToken();

  const { error } = await sb
    .from('replies')
    .insert({ thread_id: threadId, body, user_token });

  if (error) throw error;

  // Bump last_activity for sorting, but DO NOT touch expires_at
  await sb
    .from('threads')
    .update({ last_activity: new Date().toISOString() })
    .eq('id', threadId);
}
