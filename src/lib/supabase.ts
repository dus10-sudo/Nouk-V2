// src/lib/supabase.ts
// Single source of truth for data types + queries + server actions.

import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

/* ---------------------------------- */
/*              TYPES                 */
/* ---------------------------------- */

export type Room = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  is_active: boolean | null;
  created_at?: string;
};

export type Thread = {
  id: string;
  room_id: string;
  title: string;
  link_url: string | null;
  user_token: string | null;
  is_archived: boolean | null;
  expires_at: string | null;
  last_activity: string | null;
  created_at?: string;
  posts_count?: number | null;
};

export type Reply = {
  id: string;
  thread_id: string;
  body: string;
  user_token: string | null;
  created_at?: string;
};

/** Extended shape used by thread detail */
export type ThreadWithRoom = Thread & {
  room: Pick<Room, 'slug' | 'title'> | null;
};

/* ---------------------------------- */
/*         SUPABASE CLIENT            */
/* ---------------------------------- */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(URL, ANON, {
  auth: { persistSession: false },
});

/* ---------------------------------- */
/*       ANON-IDENTITY COOKIE         */
/* ---------------------------------- */

const COOKIE_KEY = 'nouk_user_token';
function ensureToken(): string {
  const store = cookies();
  const existing = store.get(COOKIE_KEY)?.value;
  if (existing) return existing;
  const v = randomUUID();
  // not httpOnly on purpose so client code can read it if needed later
  store.set(COOKIE_KEY, v, {
    httpOnly: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
  return v;
}

/* ---------------------------------- */
/*            QUERIES                 */
/* ---------------------------------- */

export async function listRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from('rooms')
    .select('id, slug, title, description, is_active, created_at')
    .eq('is_active', true)
    .order('title', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await supabase
    .from('rooms')
    .select('id, slug, title, description, is_active, created_at')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data ?? null;
}

export async function listThreads(roomId: string): Promise<Thread[]> {
  const { data, error } = await supabase
    .from('threads')
    .select(
      'id, room_id, title, link_url, user_token, is_archived, expires_at, last_activity, created_at, posts_count',
    )
    .eq('room_id', roomId)
    .eq('is_archived', false)
    .gt('expires_at', new Date().toISOString())
    .order('last_activity', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getThread(id: string): Promise<ThreadWithRoom | null> {
  const { data, error } = await supabase
    .from('threads')
    .select(
      `
        id, room_id, title, link_url, user_token, is_archived, expires_at, last_activity, created_at, posts_count,
        room:rooms ( slug, title )
      `,
    )
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return (data as ThreadWithRoom) ?? null;
}

export async function listReplies(threadId: string): Promise<Reply[]> {
  const { data, error } = await supabase
    .from('replies')
    .select('id, thread_id, body, user_token, created_at')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/* ---------------------------------- */
/*          SERVER ACTIONS            */
/* ---------------------------------- */

export async function createThread(
  roomSlug: string,
  title: string,
  link_url?: string | null,
): Promise<string> {
  'use server';
  const room = await getRoomBySlug(roomSlug);
  if (!room) throw new Error(`Room not found: ${roomSlug}`);

  const user_token = ensureToken();

  const { data, error } = await supabase
    .from('threads')
    .insert({
      room_id: room.id,
      title,
      link_url: link_url ?? null,
      user_token,
      // if your SQL sets expires_at/last_activity defaults, these can be omitted
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function addReply(threadId: string, body: string): Promise<void> {
  'use server';
  const user_token = ensureToken();
  const { error } = await supabase
    .from('replies')
    .insert({ thread_id: threadId, body, user_token });
  if (error) throw error;
}

/* ---------------------------------- */
/*   Backward-compat exports (aliases)*/
/*   (keeps older imports compiling)  */
/* ---------------------------------- */
export const listMessages = listReplies;
export const addMessage = addReply;
export async function listThreadsForRoom(room: Room | string): Promise<Thread[]> {
  const roomId = typeof room === 'string' ? room : room.id;
  return listThreads(roomId);
}
