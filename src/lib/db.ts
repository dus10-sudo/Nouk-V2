import { supabase } from "./supabase";

export async function getThread(id: string) {
  const { data, error } = await supabase
    .from("threads")
    .select(
      `
        id,
        title,
        body,
        created_at,
        room:rooms (
          id,
          slug,
          name
        )
      `
    )
    .eq("id", id)
    .maybeSingle(); // safer than .single() when we might get no row

  if (error) {
    console.error("getThread error:", error);
    return null;
  }

  if (!data) return null;

  // Supabase may return `room` as an array; normalize to a single object
  const anyData = data as any;
  const roomRaw = anyData.room;
  const room =
    Array.isArray(roomRaw) && roomRaw.length > 0 ? roomRaw[0] : roomRaw ?? null;

  return {
    ...data,
    room,
  } as typeof data & { room: { id: string; slug: string; name: string } | null };
}
