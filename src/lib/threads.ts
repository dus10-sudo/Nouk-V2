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

  const raw: any = data;

  // Supabase sometimes returns related rows as an array; normalize to a single object or null
  const roomRaw = raw.room;
  const roomObj = Array.isArray(roomRaw) ? roomRaw[0] ?? null : roomRaw ?? null;

  const thread: ThreadWithRoom = {
    id: raw.id,
    title: raw.title,
    created_at: raw.created_at,
    room: roomObj
      ? {
          slug: roomObj.slug ?? null,
          title: roomObj.title ?? null,
        }
      : null,
  };

  return thread;
}
