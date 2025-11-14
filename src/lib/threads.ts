// src/lib/threads.ts
import { supabase } from "./supabase";

export type ThreadWithRoom = {
  id: string;
  title: string;
  created_at: string;
  link_url: string | null;
  room: {
    slug: string;
    name: string;
  };
};

export type ThreadReply = {
  id: string;
  body: string;
  created_at: string;
};

export type ThreadWithReplies = ThreadWithRoom & {
  replies: ThreadReply[];
};

// Fetch a single thread (used by some pages)
export async function getThread(id: string): Promise<ThreadWithRoom | null> {
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

  if (error) {
    console.error("Error fetching thread:", error);
    return null;
  }

  if (!data) return null;

  // Supabase returns `room` as an array when using foreign-table syntax
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
  };
}

// Fetch thread + its replies
export async function getThreadWithReplies(
  id: string
): Promise<ThreadWithReplies | null> {
  const base = await getThread(id);
  if (!base) return null;

  const { data: repliesData, error: repliesError } = await supabase
    .from("replies")
    .select("id, body, created_at")
    .eq("thread_id", id)
    .order("created_at", { ascending: true });

  if (repliesError) {
    console.error("Error fetching replies:", repliesError);
  }

  const replies = (repliesData ?? []) as ThreadReply[];

  return {
    ...base,
    replies,
  };
}
