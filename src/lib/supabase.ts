// src/lib/supabase.ts
'use client';

import { createClient, RealtimeChannel } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !anon) {
  console.warn('Supabase env missing. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.');
}

export const supabase = createClient(url, anon, {
  auth: { persistSession: false, autoRefreshToken: false },
  db: { schema: 'public' },
});

// ---------- ROOMS ----------
export type Room = { id: string; slug: string; name: string; };

export async function listRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from('rooms')
    .select('id, slug, name')
    .order('name', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

// ---------- THREADS ----------
export type Thread = {
  id: string;
  room_id: string;
  title: string;
  author_alias: string | null;
  created_at: string;
  ttl_expires_at: string | null;
};

async function getRoomIdBySlug(slug: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('rooms')
    .select('id')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data?.id ?? null;
}

export async function listThreads(roomSlug: string): Promise<Thread[]> {
  const roomId = await getRoomIdBySlug(roomSlug);
  if (!roomId) return [];
  const { data, error } = await supabase
    .from('threads')
    .select('id, room_id, title, author_alias, created_at, ttl_expires_at')
    .eq('room_id', roomId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createThread(roomSlug: string, title: string, alias?: string) {
  const roomId = await getRoomIdBySlug(roomSlug);
  if (!roomId) throw new Error('Room not found for slug: ' + roomSlug);
  const { data, error } = await supabase
    .from('threads')
    .insert([{ room_id: roomId, title, author_alias: alias ?? null }])
    .select('id')
    .single();
  if (error) throw error;
  return data.id as string;
}

export function subscribeThreads(roomSlug: string, onInsert: (t: Thread) => void) {
  const channel = supabase.channel(`threads:${roomSlug}`);
  // We watch all thread inserts; the filter runs client-side after we fetch roomId
  (async () => {
    const roomId = await getRoomIdBySlug(roomSlug);
    channel.on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'threads' },
      (payload) => {
        const row = payload.new as Thread;
        if (!roomId || row.room_id !== roomId) return;
        onInsert(row);
      }
    );
    channel.subscribe();
  })();

  return () => {
    channel.unsubscribe();
  };
}

// ---------- MESSAGES ----------
export type Message = {
  id: string;
  thread_id: string;
  author_alias: string | null;
  body: string;
  created_at: string;
};

export async function listMessages(threadId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('id, thread_id, author_alias, body, created_at')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addMessage(threadId: string, body: string, alias?: string) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ thread_id: threadId, body, author_alias: alias ?? null }])
    .select('id')
    .single();
  if (error) throw error;
  return data.id as string;
}

export function subscribeMessages(threadId: string, onInsert: (m: Message) => void) {
  const channel: RealtimeChannel = supabase.channel(`messages:${threadId}`);
  channel.on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages', filter: `thread_id=eq.${threadId}` },
    (payload) => onInsert(payload.new as Message)
  );
  channel.subscribe();
  return () => channel.unsubscribe();
}
