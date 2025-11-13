// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// ---- client ----
export const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  { auth: { persistSession: false } }
);

// ---- types (minimal) ----
export type Room = {
  id: string;
  slug: string;
  title: string;
  is_active: boolean;
  description?: string | null;
};

export type Thread = {
  id: string;
  room_id: string;
  title: string;
  link_url: string | null;
  created_at: string;
  expires_at: string;
  last_activity: string | null;
  is_archived: boolean;
  // denormalized fields we return from queries:
  room_slug?: string;
  room_name?: string;
};

export type Message = {
  id: string;
  thread_id: string;
  body: string;
  created_at: string;
};

// ---- rooms ----
export async function listRooms(): Promise<Room[]> {
  const { data, error } = await sb
    .from('rooms')
    .select('id, slug, title, is_active, description')
    .eq('is_active', true)
    .order('title', { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await sb
    .from('rooms')
    .select('id, slug, title, is_active, description')
    .eq('slug', slug)
    .maybeSingle();

  if (error) return null;
  return data ?? null;
}

// ---- threads ----
// NOTE: takes a *room slug* (string), because your page calls it that way.
export async function listThreadsForRoom(roomSlug: string): Promise<Thread[]> {
  // first get the room id
  const room = await getRoomBySlug(roomSlug);
  if (!room) return [];

  const { data, error } = await sb
    .from('threads')
    .select('id, room_id, title, link_url, created_at, expires_at, last_activity, is_archived')
    .eq('room_id', room.id)
    .eq('is_archived', false)
    .gt('expires_at', new Date().toISOString())
    .order('last_activity', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  // attach denormalized fields so the UI can breadcrumb without another fetch
  return (data ?? []).map(t => ({
    ...t,
    room_slug: room.slug,
    room_name: room.title,
  }));
}

// your NewThreadButton calls: createThread(roomSlug, title, link?)
export async function createThread(
  roomSlug: string,
  title: string,
  link_url?: string | null
): Promise<string> {
  const room = await getRoomBySlug(roomSlug);
  if (!room) throw new Error('Room not found');

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24h
  const { data, error } = await sb
    .from('threads')
    .insert({
      room_id: room.id,
      title: title.trim(),
      link_url: link_url ?? null,
      expires_at: expiresAt,
      is_archived: false,
    })
    .select('id')
    .single();

  if (error) throw new Error(error.message);
  return data!.id as string;
}

export async function getThread(id: string): Promise<Thread | null> {
  // get thread
  const { data: t, error } = await sb
    .from('threads')
    .select('id, room_id, title, link_url, created_at, expires_at, last_activity, is_archived')
    .eq('id', id)
    .maybeSingle();

  if (error || !t) return null;

  // enrich with room fields for breadcrumbs
  const { data: r } = await sb
    .from('rooms')
    .select('slug, title')
    .eq('id', t.room_id)
    .maybeSingle();

  return {
    ...t,
    room_slug: r?.slug,
    room_name: r?.title,
  };
}

// ---- messages (a.k.a. replies) ----
// Your pages import listMessages/addMessage, so we expose those names.
export async function listMessages(threadId: string): Promise<Message[]> {
  const { data, error } = await sb
    .from('messages')
    .select('id, thread_id, body, created_at')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addMessage(threadId: string, body: string): Promise<void> {
  const { error } = await sb.from('messages').insert({
    thread_id: threadId,
    body: body.trim(),
  });
  if (error) throw new Error(error.message);
}
