// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const sb = createClient(url, anon, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ---------- Types ----------
export type Room = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
};

export type Thread = {
  id: string;
  room_id: string;
  title: string | null;
  link_url: string | null;
  created_at: string;
  expires_at: string;
  is_hot: boolean | null;
};

export type Message = {
  id: string;
  thread_id: string;
  body: string;
  created_at: string;
};

// ---------- Queries ----------
export async function getRooms(): Promise<Room[]> {
  const { data, error } = await sb
    .from("rooms")
    .select("id, slug, name, description")
    .order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await sb
    .from("rooms")
    .select("id, slug, name, description")
    .eq("slug", slug)
    .single();
  if (error) {
    // PGRST116 = row not found
    if ((error as any).code === "PGRST116") return null;
    throw error;
  }
  return (data as Room) ?? null;
}

export async function getThreadsForRoom(roomSlug: string): Promise<Thread[]> {
  const { data: room, error: roomErr } = await sb
    .from("rooms")
    .select("id")
    .eq("slug", roomSlug)
    .single();
  if (roomErr) throw roomErr;

  const { data, error } = await sb
    .from("threads")
    .select("id, room_id, title, link_url, created_at, expires_at, is_hot")
    .eq("room_id", room.id)
    .gt("expires_at", new Date().toISOString())
    .order("is_hot", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getThread(id: string): Promise<Thread | null> {
  const { data, error } = await sb
    .from("threads")
    .select("id, room_id, title, link_url, created_at, expires_at, is_hot")
    .eq("id", id)
    .single();
  if (error) {
    if ((error as any).code === "PGRST116") return null;
    throw error;
  }
  return (data as Thread) ?? null;
}

export async function listMessages(threadId: string): Promise<Message[]> {
  const { data, error } = await sb
    .from("messages")
    .select("id, thread_id, body, created_at")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

// ---------- Mutations ----------
export async function createThread(input: {
  roomSlug: string;
  title: string;
  link_url?: string | null;
}): Promise<string> {
  const { roomSlug, title, link_url = null } = input;

  const { data: room, error: roomErr } = await sb
    .from("rooms")
    .select("id")
    .eq("slug", roomSlug)
    .single();
  if (roomErr) throw roomErr;

  // Set expiry in app code (24h) to avoid “generation expression is not immutable”
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await sb
    .from("threads")
    .insert({
      room_id: room.id,
      title: title || null,
      link_url,
      expires_at: expiresAt,
    })
    .select("id")
    .single();

  if (error) throw error;
  return data!.id as string;
}

export async function addMessage(input: {
  threadId: string;
  body: string;
}): Promise<void> {
  const { error } = await sb
    .from("messages")
    .insert({ thread_id: input.threadId, body: input.body });
  if (error) throw error;
}

// ---------- Aliases to match your pages (so you don't need to edit them) ----------
export const listRooms = getRooms;
export const listThreadsForRoom = getThreadsForRoom;
export async function listThreads(roomSlug: string) {
  return getThreadsForRoom(roomSlug);
    }
