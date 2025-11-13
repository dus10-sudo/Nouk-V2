// src/lib/supabase.ts
// Pure client-side Supabase helpers (no server actions, no next/headers).

import { createClient } from '@supabase/supabase-js';

/* ---------- Client ---------- */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

/** Optional helper so API routes or other code can "get a client" without changing behavior. */
export function getClient(_service?: boolean) {
  // We ignore `_service` and always return the anon client for now.
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}

/* ---------- Types (app-facing) ----------
   NOTE: DB column `rooms.name` is exposed here as `title` for backward compatibility.
*/
export type Room = {
  id: string;
  slug: string;
  title: string;                // <- comes from DB `name` via SQL alias
  description?: string | null;
  is_active: boolean;
  is_ephemeral?: boolean | null;
  icon?: string | null;
  created_at: string;
};

export type Thread = {
  id: string;
  room_id: string;
  title: string;
  link_url: string | null;
  user_token: string | null;
  is_archived: boolean;
  expires_at: string;
  last_activity: string;
  created_at: string;
  posts_count: number;
};

export type Reply = {
  id: string;
  thread_id: string;
  body: string;
  user_token: string | null;
  created_at: string;
};

export type ThreadWithRoom = Thread & {
  room: {
    slug: string;
    title: string; // <- room.name aliased as title
  };
};

/* ---------- Utilities ---------- */
function token(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

/* ---------- Rooms ---------- */
export async function listRooms(): Promise<Room[]> {
  // Alias `name` -> `title` so the rest of the app can keep using `title`
  const { data, error } = await supabase
    .from('rooms')
    .select(
      `
      id,
      slug,
      name:title,
      description,
      is_active,
      is_ephemeral,
      icon,
      created_at
    `
    )
    .eq('is_active', true)
    .order('name', { ascending: true }); // order by DB column

  if (error) throw error;
  return (data ?? []) as Room[];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await supabase
    .from('rooms')
    .select(
      `
      id,
      slug,
      name:title,
      description,
      is_active,
      is_ephemeral,
      icon,
      created_at
    `
    )
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return (data as Room) ?? null;
}

/* ---------- Threads ---------- */
export async function listThreads(roomId: string): Promise<Thread[]> {
  const { data, error } = await supabase
    .from('threads')
    .select('*')
    .eq('room_id', roomId)
    .eq('is_archived', false)
    .gt('expires_at', new Date().toISOString())
    .order('last_activity', { ascending: false });

  if (error) throw error;
  return (data ?? []) as Thread[];
}

/** Get a single thread + its room slug/name (aliased to title) */
export async function getThreadWithRoom(id: string): Promise<ThreadWithRoom | null> {
  const { data, error } = await supabase
    .from('threads')
    .select(
      `
      *,
      room:rooms (
        slug,
        name:title
      )
    `
    )
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  // Shape for TS
  const t = data as any;
  const shaped: ThreadWithRoom = {
    ...t,
    room: {
      slug: t.room?.slug,
      title: t.room?.title,
    },
  };
  return shaped;
}

/** Create a new thread by room slug (optional link) and return new thread id */
export async function createThread(
  roomSlug: string,
  title: string,
  link_url?: string | null
): Promise<string> {
  const room = await getRoomBySlug(roomSlug);
  if (!room) throw new Error(`Room not found: ${roomSlug}`);

  const { data, error } = await supabase
    .from('threads')
    .insert({
      room_id: room.id,
      title,
      link_url: link_url ?? null,
      user_token: token(),
    })
    .select('id')
    .maybeSingle();

  if (error) throw error;
  return data!.id as string;
}

/* ---------- Replies ---------- */
export async function listReplies(threadId: string): Promise<Reply[]> {
  const { data, error } = await supabase
    .from('replies')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []) as Reply[];
}

export async function addReply(threadId: string, body: string): Promise<void> {
  const { error } = await supabase
    .from('replies')
    .insert({
      thread_id: threadId,
      body,
      user_token: token(),
    });

  if (error) throw error;
}
