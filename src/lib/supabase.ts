// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

/* ---------- Types ---------- */
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

export type ThreadWithRoom = Thread & {
  room: Pick<Room, 'slug' | 'title'> | null;
};

/* ---------- Supabase client (works on server & client) ---------- */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(URL, ANON, { auth: { persistSession: false } });

/* ---------- Read queries only (safe to import anywhere) ---------- */
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
    .select('id, room_id, title, link_url, user_token, is_archived, expires_at, last_activity, created_at, posts_count')
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
    .select(`
      id, room_id, title, link_url, user_token, is_archived, expires_at, last_activity, created_at, posts_count,
      room:rooms ( slug, title )
    `)
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

/* Back-compat aliases (reads only) */
export const listMessages = listReplies;
export async function listThreadsForRoom(room: Room | string) {
  const roomId = typeof room === 'string' ? room : room.id;
  return listThreads(roomId);
        }
