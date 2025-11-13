// src/lib/threads.ts

import { supabase } from "./supabase";

export type ThreadWithRoom = {
  id: string;
  title: string;
  created_at: string;
  link_url: string | null;
  posts_count: number;
  room_id: string;
  room: {
    slug: string;
    title: string;
  } | null;
};

export async function getThread(id: string): Promise<ThreadWithRoom | null> {
  // 1) Fetch the thread itself
  const { data: thread, error } = await supabase
    .from("threads")
    .select("id, title, created_at, link_url, posts_count, room_id")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error loading thread:", error);
    return null;
  }
  if (!thread) {
    return null;
  }

  // 2) Fetch the room this thread belongs to
  const { data: room, error: roomError } = await supabase
    .from("rooms")
    .select("slug, title")
    .eq("id", thread.room_id)
    .maybeSingle();

  if (roomError) {
    console.error("Error loading room for thread:", roomError);
  }

  return {
    id: thread.id,
    title: thread.title,
    created_at: thread.created_at,
    link_url: thread.link_url ?? null,
    posts_count: thread.posts_count ?? 0,
    room_id: thread.room_id,
    room: room
      ? {
          slug: room.slug,
          title: room.title,
        }
      : null,
  };
}
