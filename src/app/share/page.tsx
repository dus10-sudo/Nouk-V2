// src/app/share/page.tsx
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase";

type Room = {
  id: string;
  name: string;
  description: string | null;
};

async function createThread(formData: FormData) {
  "use server";

  const supabase = createServerSupabase();

  const room_id = (formData.get("room_id") as string) ?? "";
  const rawTitle = (formData.get("title") as string) ?? "";
  const rawLink = (formData.get("link_url") as string) ?? "";

  const title = rawTitle.trim();
  const link_url = rawLink.trim() || null;

  if (!room_id) {
    throw new Error("Room is required.");
  }

  if (!title && !link_url) {
    throw new Error("Say at least a few words, or paste a link.");
  }

  const user_token = crypto.randomUUID();

  const { data, error } = await supabase
    .from("threads")
    .insert({
      room_id,
      title: title || "Untitled Nouk",
      link_url,
      user_token,
    })
    .select("id")
    .single();

  if (error || !data?.id) {
    console.error("[share] Error creating thread", error);
    throw new Error("Could not create thread.");
  }

  redirect(`/thread/${data.id}`);
}

export default async function SharePage() {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("rooms")
    .select("id, name, description")
    .order("name", { ascending: true });

  const rooms: Room[] = (data as any) ?? [];

  return (
    <main className="min-h-screen bg-[var(--page-bg,#f3eee2)] px-4 py-4">
      <div className="mx-auto flex h-full max-w-md flex-col">
        <header className="mb-4">
          <h1 className="text-center text-xl font-semibold text-[var(--ink,#1f2933)]">
            Start a Nouk
          </h1>
          <p className="mt-1 text-center text-sm text-[var(--muted,#6b7280)]">
            Pick a corner of the house and leave something small there.
          </p>
        </header>

        <section className="rounded-2xl bg-[var(--card,#f8f3e6)] p-4 shadow-sm">
          {error && (
            <div className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
              Couldn&apos;t load rooms right now. Please try again later.
            </div>
          )}

          <form action={createThread} className="space-y-4">
            {/* Room picker */}
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted-strong,#4b5563)]">
                Where should this live?
              </label>
              <select
                name="room_id"
                className="w-full rounded-2xl border border-black/5 bg-white/90 px-3 py-2 text-sm text-[var(--ink,#111827)] outline-none ring-0 focus:border-[var(--accent,#f97316)]"
                defaultValue={rooms[0]?.id ?? ""}
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
              {rooms.length > 0 && rooms[0]?.description && (
                <p className="mt-1 text-[11px] text-[var(--muted,#6b7280)]">
                  Each room has a slightly different mood. Pick whatever feels
                  closest.
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted-strong,#4b5563)]">
                What&apos;s on your mind?
              </label>
              <input
                type="text"
                name="title"
                placeholder="Say something small to start…"
                className="w-full rounded-2xl border border-black/5 bg-white/90 px-3 py-2 text-sm text-[var(--ink,#111827)] outline-none ring-0 placeholder:text-[var(--muted,#9ca3af)] focus:border-[var(--accent,#f97316)]"
              />
            </div>

            {/* Optional link */}
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted-strong,#4b5563)]">
                Optional link
              </label>
              <input
                type="url"
                name="link_url"
                placeholder="YouTube, Spotify, article, anything…"
                className="w-full rounded-2xl border border-black/5 bg-white/90 px-3 py-2 text-sm text-[var(--ink,#111827)] outline-none ring-0 placeholder:text-[var(--muted,#9ca3af)] focus:border-[var(--accent,#f97316)]"
              />
              <p className="mt-1 text-[11px] text-[var(--muted,#6b7280)]">
                You can leave this blank if you just want to write.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="/home"
                className="flex-1 rounded-2xl border border-black/5 bg-transparent px-3 py-2 text-center text-sm text-[var(--muted-strong,#4b5563)]"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="flex-1 rounded-2xl bg-[var(--accent,#f97316)] px-3 py-2 text-center text-sm font-semibold text-[var(--paper,#fff7ed)] shadow-[0_12px_30px_rgba(249,115,22,0.55)] active:scale-[0.98] transition-transform"
              >
                Post it
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
