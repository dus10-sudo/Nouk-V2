// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const sb = createClient(URL, KEY);

// ---------- Types (soft/optional to tolerate missing columns) ----------
export type Room = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  is_special?: boolean | null;
  active_count?: number | null;
};

export type Thread = {
  id: string;
  room_id: string;
  title?: string | null;
  link_url?: string | null;
  created_at: string;
  expires_at?: string | null;
  is_hot?: boolean | null;
  // Optional joined fields when we SELECT with relations
  room_slug?: string | null;
  room_name?: string | null;
};

export type Message = {
  id: string;
  thread_id: string;
  body: string;
  created_at: string;
};

// ---------- Rooms ----------
export async function listRooms(): Promise<Room[]> {
  const { data, error } = await sb
    .from('rooms')
    .select('id, slug, name, description, is_special, active_count')
    .order('is_special', { ascending: false })
    .order('name', { ascending: true });

  if (error) throw error;
  return (data ?? []) as Room[];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await sb
    .from('rooms')
    .select('id, slug, name, description, is_special, active_count')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return (data as Room) ?? null;
}

// ---------- Threads ----------
export async function listThreadsForRoom(roomSlug: string): Promise<Thread[]> {
  // Resolve room id from slug
  const room = await getRoomBySlug(roomSlug);
  if (!room) return [];

  const { data, error } = await sb
    .from('threads')
    .select(
      [
        'id',
        'room_id',
        'title',
        'link_url',
        'created_at',
        'expires_at',
        'is_hot',
      ].join(', ')
    )
    .eq('room_id', room.id)
    .gt('expires_at', new Date().toISOString()) // show only non-expired
    .order('is_hot', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Attach room metadata so pages can show breadcrumbs without re-query
  return (data ?? []).map(t => ({
    ...t,
    room_slug: room.slug,
    room_name: room.name,
  })) as Thread[];
}

export async function getThread(id: string): Promise<Thread | null> {
  // Try to fetch thread + its room (if FK is set up)
  const { data, error } = await sb
    .from('threads')
    .select(
      [
        'id',
        'room_id',
        'title',
        'link_url',
        'created_at',
        'expires_at',
        'is_hot',
        'rooms!inner(id, slug, name)' // will be ignored if no FK; that’s fine
      ].join(', ')
    )
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  // Normalize optional room fields
  const anyData = data as any;
  const room = anyData.rooms?.[0] ?? anyData.rooms ?? null;

  return {
    id: anyData.id,
    room_id: anyData.room_id,
    title: anyData.title ?? null,
    link_url: anyData.link_url ?? null,
    created_at: anyData.created_at,
    expires_at: anyData.expires_at ?? null,
    is_hot: anyData.is_hot ?? null,
    room_slug: room?.slug ?? null,
    room_name: room?.name ?? null,
  } as Thread;
}

// Create a new thread in a room by slug
export async function createThread(
  roomSlug: string,
  opts: { title: string; link_url?: string | null }
): Promise<string> {
  const room = await getRoomBySlug(roomSlug);
  if (!room) throw new Error('Room not found');

  // default expires_at = now + 24h
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await sb
    .from('threads')
    .insert({
      room_id: room.id,
      title: opts.title,
      link_url: opts.link_url ?? null,
      expires_at: expires,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data!.id as string;
}

// ---------- Messages ----------
export async function listMessages(threadId: string): Promise<Message[]> {
  const { data, error } = await sb
    .from('messages')
    .select('id, thread_id, body, created_at')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []) as Message[];
}

export async function addMessage(threadId: string, body: string): Promise<void> {
  const trimmed = (body ?? '').trim();
  if (!trimmed) return;

  const { error } = await sb.from('messages').insert({
    thread_id: threadId,
    body: trimmed,
  });

  if (error) throw error;
}
