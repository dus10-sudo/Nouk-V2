// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

/* ---------- ENV + CLIENT ---------- */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------- TYPES (match DB) ---------- */
export type Room = {
  id: string;
  slug: string;
  title: string;           // UI should show this
  description: string | null;
  is_active: boolean;
  created_at: string;
};

export type Thread = {
  id: string;
  room_id: string;
  title: string;
  link_url: string | null;
  user_token: string | null;  // optional if your RLS allows null
  is_archived: boolean;
  expires_at: string;
  last_activity: string | null;
  created_at: string;
  posts_count: number | null;
};

export type Reply = {
  id: string;
  thread_id: string;
  body: string;
  user_token: string | null;
  created_at: string;
};

export type ThreadWithRoom = Thread & {
  room: Pick<Room, 'slug' | 'title'>;
};

/* ---------- HELPERS ---------- */
function normalizeRoom(r: any): Room {
  // Some UIs referenced r.name earlier; to avoid breaking them we add a
  // synthetic 'name' property in selects below via `name: title`.
  return r as Room;
}

function normalizeRoomRelation(raw: any) {
  const rel = Array.isArray(raw) ? raw[0] : raw;
  if (!rel) return null;
  return { slug: rel.slug, title: rel.title };
}

/* ---------- ROOMS ---------- */
export async function listRooms(): Promise<(Room & { name?: string })[]> {
  const { data, error } = await supabase
    .from('rooms')
    .select('id, slug, title, description, is_active, created_at')
    .eq('is_active', true)
    .order('title', { ascending: true });

  if (error) throw error;
  const rows = (data || []).map((r: any) => ({
    ...normalizeRoom(r),
    // add .name for older UI that expects it
    name: r.title,
  }));
  return rows;
}

export async function getRoomBySlug(slug: string): Promise<(Room & { name?: string }) | null> {
  const { data, error } = await supabase
    .from('rooms')
    .select('id, slug, title, description, is_active, created_at')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return { ...normalizeRoom(data), name: (data as any).title };
}

/* ---------- THREADS ---------- */
export async function listThreadsForRoom(roomId: string): Promise<ThreadWithRoom[]> {
  const { data, error } = await supabase
    .from('threads')
    .select(
      `
      id, room_id, title, link_url, user_token, is_archived, expires_at, last_activity, created_at, posts_count,
      room:rooms!threads_room_id_fkey ( slug, title )
    `
    )
    .eq('room_id', roomId)
    .eq('is_archived', false)
    .gt('expires_at', new Date().toISOString())
    .order('last_activity', { ascending: false });

  if (error) throw error;
  if (!data) return [];

  return (data as any[]).map((row) => {
    const room = normalizeRoomRelation(row.room);
    return { ...(row as Thread), room: room! } as ThreadWithRoom;
  });
}

export async function getThread(id: string): Promise<ThreadWithRoom | null> {
  const { data, error } = await supabase
    .from('threads')
    .select(
      `
      id, room_id, title, link_url, user_token, is_archived, expires_at, last_activity, created_at, posts_count,
      room:rooms!threads_room_id_fkey ( slug, title )
    `
    )
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const room = normalizeRoomRelation((data as any).room);
  return { ...(data as Thread), room: room! } as ThreadWithRoom;
}

/* ---------- REPLIES ---------- */
export async function listReplies(threadId: string): Promise<Reply[]> {
  const { data, error } = await supabase
    .from('replies')
    .select('id, thread_id, body, user_token, created_at')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data || []) as Reply[];
}

/* ---------- CREATE ---------- */
// Signature matches your UI usage: createThread(roomSlug, title, link_url?)
export async function createThread(
  roomSlug: string,
  title: string,
  link_url?: string | null,
): Promise<string> {
  // lookup room id from slug
  const { data: room, error: roomErr } = await supabase
    .from('rooms')
    .select('id')
    .eq('slug', roomSlug)
    .maybeSingle();
  if (roomErr) throw roomErr;
  if (!room) throw new Error(`Room not found: ${roomSlug}`);

  const insert = {
    room_id: room.id,
    title,
    link_url: link_url ?? null,
  } as Partial<Thread>;

  const { data, error } = await supabase
    .from('threads')
    .insert(insert)
    .select('id')
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('No thread id returned');
  return (data as any).id as string;
}

export async function addReply(threadId: string, body: string): Promise<void> {
  const { error } = await supabase
    .from('replies')
    .insert({ thread_id: threadId, body });

  if (error) throw error;
}
