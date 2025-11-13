// src/lib/supabase.ts
// Pure client-side Supabase helpers (no server actions, no next/headers).

import { createClient } from '@supabase/supabase-js';

/* ---------- Client ---------- */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

/** Optional helper so API routes or other code can "get a client". */
export function getClient(_service?: boolean) {
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
  title: string;                // <- derived from DB `name`
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
    title: string; // <- derived from rooms.name
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
  const { data, error } = await supabase
    .from('rooms')
    .select('id, slug, name, description, is_active, is_ephemeral, icon, created_at')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) throw error;

  // map DB shape -> app shape (name -> title)
  const mapped = (data ?? []).map((r: any) => ({
    id: r.id,
    slug: r.slug,
    title: r.name,
    description: r.description ?? null,
    is_active: r.is_active,
    is_ephemeral: r.is_ephemeral ?? null,
    icon: r.icon ?? null,
    created_at: r.created_at,
  })) as Room[];

  return mapped;
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await supabase
    .from('rooms')
    .select('id, slug, name, description, is_active, is_ephemeral, icon, created_at')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const r = data as any;
  const room: Room = {
    id: r.id,
    slug: r.slug,
    title: r.name,
    description: r.description ?? null,
    is_active: r.is_active,
    is_ephemeral: r.is_ephemeral ?? null,
    icon: r.icon ?? null,
    created_at: r.created_at,
  };
  return room;
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

/** Get a single thread + its room slug/name (mapped to title) */
export async function getThreadWithRoom(id: string): Promise<ThreadWithRoom | null> {
  const { data, error } = await supabase
    .from('threads')
    .select(
      `
      *,
      room:rooms (
        slug,
        name
      )
    `
    )
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const t = data as any;
  const shaped: ThreadWithRoom = {
    id: t.id,
    room_id: t.room_id,
    title: t.title,
    link_url: t.link_url,
    user_token: t.user_token,
    is_archived: t.is_archived,
    expires_at: t.expires_at,
    last_activity: t.last_activity,
    created_at: t.created_at,
    posts_count: t.posts_count,
    room: {
      slug: t.room?.slug,
      title: t.room?.name, // map rooms.name -> title
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
