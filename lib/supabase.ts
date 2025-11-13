// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Rooms -----------------------------------------------------
export type Room = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon?: string | null;
};

export async function listRooms(): Promise<Room[]> {
  const { data, error } = await sb
    .from("rooms")
    .select("id, slug, name, description, icon")
    .order("name", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await sb
    .from("rooms")
    .select("id, slug, name, description, icon")
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") throw error; // not found
  return data ?? null;
}

// --- Threads ---------------------------------------------------
export type Thread = {
  id: string;
  room_id: string;
  title: string | null;
  created_at: string;
  expires_at: string;
  is_hot: boolean | null;
  message_count: number | null;
};

export async function listThreadsForRoom(room: Room): Promise<Thread[]> {
  const { data, error } = await sb
    .from("threads")
    .select(
      "id, room_id, title, created_at, expires_at, is_hot, message_count"
    )
    .eq("room_id", room.id)
    .gt("expires_at", new Date().toISOString()) // only not-expired
    .order("is_hot", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createThread(roomId: string, title: string | null) {
  const { data, error } = await sb
    .from("threads")
    .insert({ room_id: roomId, title })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

// --- Messages --------------------------------------------------
export type Message = {
  id: string;
  thread_id: string;
  body: string;
  created_at: string;
};

export async function listMessages(threadId: string): Promise<Message[]> {
  const { data, error } = await sb
    .from("messages")
    .select("id, thread_id, body, created_at")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function addMessage(threadId: string, body: string) {
  const { error } = await sb.from("messages").insert({ thread_id: threadId, body });
  if (error) throw error;
}
