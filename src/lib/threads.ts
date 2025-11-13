// src/lib/threads.ts
import { supabase } from "./supabase";

export type ThreadWithRoom = {
  id: string;
  title: string;
  created_at: string;
  body?: string | null;
  link_url?: string | null;
  room: {
    slug: string;
    name: string;
  };
};

export async function getThreadById(id: string): Promise<ThreadWithRoom | null> {
  const { data, error } = await supabase
    .from("threads")
    .select(
      `
        id,
        title,
        created_at,
        link_url,
        room:room_id (
          slug,
          name
        )
      `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("❌ getThreadById error:", error);
    return null;
  }

  const room = Array.isArray(data.room) ? data.room[0] : data.room;

  return {
    id: data.id,
    title: data.title,
    created_at: data.created_at,
    link_url: data.link_url ?? null,
    room: {
      slug: room.slug,
      name: room.name,
    },
  };
}
