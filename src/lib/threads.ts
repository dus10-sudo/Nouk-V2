// src/lib/threads.ts
import { supabase } from "./supabase";

export type ReplyRow = {
  id: string;
  thread_id: string;
  body: string;
  user_token: string | null;
  created_at: string;
};

export type ThreadWithReplies = {
  id: string;
  title: string;
  created_at: string;
  link_url: string | null;
  room: { slug: string; name: string };
  replies: ReplyRow[];
};

export async function getThreadWithReplies(id: string): Promise<ThreadWithReplies | null> {
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
        ),
        replies:replies (
          id,
          thread_id,
          body,
          user_token,
          created_at
        )
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getThreadWithReplies error:", error);
    return null;
  }
  if (!data) return null;

  // Supabase returns `room` as array; normalize to object
  const roomData = Array.isArray(data.room) ? data.room[0] : data.room;

  return {
    id: data.id,
    title: data.title,
    created_at: data.created_at,
    link_url: data.link_url ?? null,
    room: {
      slug: roomData?.slug ?? "",
      name: roomData?.name ?? "",
    },
    replies: Array.isArray(data.replies) ? data.replies : [],
  };
}
