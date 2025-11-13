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

  return data as ThreadWithRoom;
}
