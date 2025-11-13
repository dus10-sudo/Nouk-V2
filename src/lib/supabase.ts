// src/lib/supabase.ts
import sb from './supabaseClient';

// ---- Types that align with your SQL schema ----
export type Room = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

export type Thread = {
  id: string;
  room_id: string;
  title: string;
  link_url: string | null;
  created_at: string;
  expires_at: string;
  // included from join for breadcrumbs
  room_slug?: string;
  room_name?: string;
};

export type Message = {
  id: string;
  thread_id: string;
  body: string;
  created_at: string;
};

// ---- Rooms ----
export async function listRooms(): Promise<Room[]> {
  const { data, error } = await sb
    .from('rooms')
    .select('id, name, slug, description, created_at')
    .order('name', { ascending: true });

  if (error) throw new Error(`listRooms: ${error.message}`);
  return data ?? [];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await sb
    .from('rooms')
    .select('id, name, slug, description, created_at')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') throw new Error(`getRoomBySlug: ${error.message}`);
  return data ?? null;
}

// ---- Threads ----
export async function listThreadsForRoom(roomSlug: string): Promise<Thread[]> {
  // find room.id first
  const room = await getRoomBySlug(roomSlug);
  if (!room) return [];

  const { data, error } = await sb
    .from('threads')
    .select(`
      id,
      room_id,
      title,
      link_url,
      created_at,
      expires_at
    `)
    .eq('room_id', room.id)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (error) throw new Error(`listThreadsForRoom: ${error.message}`);

  // decorate with room fields for UI breadcrumbs
  const withRoom = (data ?? []).map(t => ({
    ...t,
    room_slug: room.slug,
    room_name: room.name,
  })) as Thread[];

  return withRoom;
}

export async function getThread(id: string): Promise<Thread | null> {
  // pull thread + also grab room fields in a second call
  const { data: t, error } = await sb
    .from('threads')
    .select('id, room_id, title, link_url, created_at, expires_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`getThread: ${error.message}`);
  if (!t) return null;

  const { data: r, error: rErr } = await sb
    .from('rooms')
    .select('slug, name')
    .eq('id', t.room_id)
    .single();
  if (rErr && rErr.code !== 'PGRST116') throw new Error(`getThread(room): ${rErr.message}`);

  return {
    ...t,
    room_slug: r?.slug,
    room_name: r?.name,
  } as Thread;
}

// ---- Messages ----
export async function listMessages(threadId: string): Promise<Message[]> {
  const { data, error } = await sb
    .from('messages')
    .select('id, thread_id, body, created_at')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`listMessages: ${error.message}`);
  return data ?? [];
}

export async function addMessage(threadId: string, body: string): Promise<string> {
  const { data, error } = await sb
    .from('messages')
    .insert({ thread_id: threadId, body })
    .select('id')
    .single();

  if (error) throw new Error(`addMessage: ${error.message}`);
  return data!.id as string;
}

// ---- Create thread (3rd arg is OPTIONAL link) ----
export async function createThread(
  roomSlug: string,
  title: string,
  link_url?: string | null
): Promise<string> {
  const room = await getRoomBySlug(roomSlug);
  if (!room) throw new Error(`Room not found for slug: ${roomSlug}`);

  const { data, error } = await sb
    .from('threads')
    .insert({
      room_id: room.id,
      title,
      link_url: link_url ?? null,
      // if you didn't set DB default for expires_at:
      // expires_at: new Date(Date.now() + 24*60*60*1000).toISOString(),
    })
    .select('id')
    .single();

  if (error) throw new Error(`createThread: ${error.message}`);
  return data!.id as string;
}
