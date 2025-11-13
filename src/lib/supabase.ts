// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const sb = createClient(url, anon);

// ---- Types ----
export type Room = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  created_at: string;
};

export type Thread = {
  id: string;
  room_id: string;
  title: string;
  link_url: string | null;
  expires_at: string;
  created_at: string;
  message_count?: number;
  is_hot?: boolean;
};

export type Message = {
  id: string;
  thread_id: string;
  body: string;
  created_at: string;
};

// ---- Queries ----
export async function getRooms(): Promise<Room[]> {
  const { data, error } = await sb
    .from("rooms")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await sb
    .from("rooms")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getThreadsForRoom(slug: string): Promise<Thread[]> {
  const { data: room, error: roomErr } = await sb
    .from("rooms")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (roomErr) throw roomErr;
  if (!room) return [];

  const { data, error } = await sb
    .from("threads")
    .select(
      "id, room_id
