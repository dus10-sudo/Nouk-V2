// src/lib/queries.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const sb = createClient(supabaseUrl, supabaseKey);

export type Room = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  is_ephemeral: boolean;
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
  posts_count: number | null;
};

export type Reply = {
  id: string;
  thread_id: string;
  body: string;
  user_token: string | null;
  created_at: string;
};

export type ThreadWithRoom = Thread & { room: { slug: string; name: string } };

export async function listRooms(): Promise<Room[]> {
  const { data, error } = await sb
    .from('rooms')
    .select('id, slug, name, description, icon, is_active, is_ephemeral, created_at')
    .eq('is_active', true)
    .order('name', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await sb
    .from('rooms')
    .select('id, slug, name, description, icon, is_active, is_ephemeral, created_at')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function listThreadsForRoom(roomId: string): Promise<Thread[]> {
  const { data, error } = await sb
    .from('threads')
    .select('*')
    .eq('room_id', roomId)
    .eq('is_archived', false)
    .gt('expires_at', new Date().toISOString())
    .order('last_activity', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getThreadWithRoom(threadId: string): Promise<ThreadWithRoom | null> {
  // join via two selects (keeps it simple with anon key)
  const { data: t, error: te } = await sb
    .from('threads')
    .select('*')
    .eq('id', threadId)
    .maybeSingle();
  if (te) throw te;
  if (!t) return null;

  const { data: room, error: re } = await sb
    .from('rooms')
    .select('slug, name')
    .eq('id', t.room_id)
    .maybeSingle();
  if (re) throw re;

  return room ? ({ ...t, room } as ThreadWithRoom) : ({ ...t, room: { slug: '', name: '' } } as ThreadWithRoom);
}

export async function listReplies(threadId: string): Promise<Reply[]> {
  const { data, error } = await sb
    .from('replies')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}
// --- Fetch replies for a thread ---
export async function getRepliesForThread(threadId: string) {
  const { data, error } = await sb
    .from("replies")
    .select(`
      id,
      body,
      created_at,
      user_token
    `)
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}
