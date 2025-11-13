// src/server/actions.ts
'use server';

import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { supabase, getRoomBySlug } from '@/lib/supabase';

const COOKIE_KEY = 'nouk_user_token';
function ensureToken(): string {
  const store = cookies();
  const v = store.get(COOKIE_KEY)?.value ?? randomUUID();
  store.set(COOKIE_KEY, v, { httpOnly: false, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365, path: '/' });
  return v;
}

export async function createThread(roomSlug: string, title: string, link_url?: string | null): Promise<string> {
  const room = await getRoomBySlug(roomSlug);
  if (!room) throw new Error(`Room not found: ${roomSlug}`);

  const user_token = ensureToken();

  const { data, error } = await supabase
    .from('threads')
    .insert({ room_id: room.id, title, link_url: link_url ?? null, user_token })
    .select('id')
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function addReply(threadId: string, body: string): Promise<void> {
  const user_token = ensureToken();
  const { error } = await supabase.from('replies').insert({ thread_id: threadId, body, user_token });
  if (error) throw error;
}
