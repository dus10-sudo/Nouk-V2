// src/lib/threads.ts
import { supabase } from "./supabase";

export type ThreadWithRoom = {
  id: string;
  title: string;
  created_at: string;
  room: {
    slug: string | null;
    title: string | null;
  } | null;
};

export async function getThread(id: string): Promise<ThreadWithRoom | null> {
  const { data, error } = await supabase
    .from("threads")
    .select(
      `
      id,
      title,
      created_at,
      room:room_id (
        slug,
        title
      )
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getThread error", error);
    return null;
  }

  if (!data) return null;

  return data as ThreadWithRoom;
}
