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

  // Supabase returns `room` as an array → extract first element
  const roomData = Array.isArray(data.room) ? data.room[0] : data.room;

  return {
    id: data.id,
    title: data.title,
    created_at: data.created_at,
    link_url: data.link_url,
    room: {
      slug: roomData?.slug ?? "",
      name: roomData?.name ?? "",
    },
  };
}
// src/lib/threads.ts

import { supabase } from "./supabase";

// If you already have this type, keep yours and remove this duplicate.
export type ThreadWithRoom = {
  id: string;
  title: string;
  created_at: string;
  link_url: string | null;
  room: {
    slug: string;
    name: string;
  } | null;
};

export type ThreadReply = {
  id: string;
  body: string;
  created_at: string;
};

export type ThreadWithReplies = ThreadWithRoom & {
  replies: ThreadReply[];
};

export async function getThreadWithReplies(
  id: string
): Promise<ThreadWithReplies | null> {
  // 1) Get the thread + room
  const { data: thread, error } = await supabase
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

  if (error || !thread) {
    console.error("getThreadWithReplies: thread error", error);
    return null;
  }

  // 2) Get replies for this thread
  const { data: repliesData, error: repliesError } = await supabase
    .from("replies")
    .select("id, body, created_at")
    .eq("thread_id", id)
    .order("created_at", { ascending: true });

  if (repliesError) {
    console.error("getThreadWithReplies: replies error", repliesError);
  }

  const replies = (repliesData ?? []) as ThreadReply[];

  // 3) Normalize into a clean shape
  return {
    id: thread.id,
    title: thread.title,
    created_at: thread.created_at,
    link_url: thread.link_url ?? null,
    room: thread.room
      ? {
          slug: (thread as any).room.slug,
          name: (thread as any).room.name,
        }
      : null,
    replies,
  };
}
