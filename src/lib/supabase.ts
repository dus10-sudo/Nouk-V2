// src/lib/supabase.ts
// Pure client-side supabase helpers (no server actions, no next/headers).

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------- Types (align with your SQL) ----------
export type Room = {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  is_active: boolean;
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
    title: string;
  };
};

// ---------- Rooms ----------
export async function listRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_active', true)
    .order('title', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

// ---------- Threads ----------
export async function listThreads(roomId: string): Promise<Thread[]> {
  const { data, error } = await supabase
    .from('threads')
    .select('*')
    .eq('room_id', roomId)
    .eq('is_archived', false)
    .gt('expires_at', new Date().toISOString())
    .order('last_activity', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getThreadWithRoom(id: string): Promise<ThreadWithRoom | null> {
  const { data, error } = await supabase
    .from('threads')
    .select(
      `
      *,
      room:rooms (
        slug,
        title
      )
    `
    )
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  // supabase returns room as an object; assert shape for TS
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

function token(): string {
  // ephemeral “anonymous id” per action (fine for now)
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

// roomSlug + title (+ optional link) -> returns new thread id
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

// ---------- Replies ----------
export async function listReplies(threadId: string): Promise<Reply[]> {
  const { data, error } = await supabase
    .from('replies')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
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
