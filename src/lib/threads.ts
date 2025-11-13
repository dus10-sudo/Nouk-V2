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
