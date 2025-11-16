import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server"; // adjust this path if needed

type Thread = {
  id: string;
  title: string | null;
  room_name: string | null;    // adjust to your column name (e.g. "room_slug" or "room")
  aura_label: string | null;   // adjust to your aura/author field
  created_at: string;
};

function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = Date.now();
  const diffMs = now - date.getTime();

  const diffSec = Math.round(diffMs / 1000);
  if (diffSec < 60) return "Just now";

  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;

  const diffDay = Math.round(diffHr / 24);
  return `${diffDay}d ago`;
}

export default async function HearthPage() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("threads") // adjust table name if needed
    .select("id, title, room_name, aura_label, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error loading threads:", error);
  }

  const threads: Thread[] = data ?? [];

  return (
    <main className="min-h-screen bg-black text-stone-50">
      <div className="mx-auto flex max-w-xl flex-col px-4 pb-28 pt-4 sm:px-5">
        {/* Hearth hero card */}
        <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/80">
          <div className="absolute inset-0">
            <Image
              src="/house-interior.jpg"
              alt="A cozy room with a stone fireplace, bookshelves, and armchairs"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black/90" />
          </div>

          <div className="relative px-5 py-6 sm:px-6 sm:py-7">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">
              Inside Nouk
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-amber-50 sm:text-3xl">
              The Hearth
            </h1>
            <p className="mt-2 text-sm text-amber-100/85">
              Take a breath. Here&apos;s what the room is thinking tonight.
            </p>
            <p className="mt-1 text-xs text-amber-100/70">
              Settle in. Read quietly, or add your own thought to the fire.
            </p>

            <div className="mt-4">
              {/* Adjust /share to whatever route opens your composer */}
              <Link
                href="/share"
                className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-medium text-stone-900 shadow-lg shadow-amber-400/50 transition hover:bg-amber-200 hover:shadow-amber-200/70 active:scale-95"
              >
                Share a Thought
              </Link>
            </div>
          </div>
        </section>

        {/* Feed */}
        <section aria-label="Recent thoughts" className="space-y-3">
          {threads.map((thread) => (
            <article
              key={thread.id}
              className="rounded-2xl border border-white/6 bg-zinc-900/80 px-4 py-3 shadow-sm shadow-black/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h2 className="text-sm font-medium text-amber-50 line-clamp-2">
                    {thread.title || "Untitled thought"}
                  </h2>

                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-amber-100/80">
                    <span className="inline-flex items-center rounded-full bg-amber-300/15 px-2 py-0.5">
                      {thread.aura_label ?? "Cozy Visitor"}
                    </span>

                    {thread.room_name && (
                      <>
                        <span className="text-amber-200/60">•</span>
                        <span>{thread.room_name}</span>
                      </>
                    )}
                  </div>
                </div>

                <span className="shrink-0 text-[11px] text-amber-100/60">
                  {thread.created_at
                    ? formatRelativeTime(thread.created_at)
                    : ""}
                </span>
              </div>
            </article>
          ))}

          {threads.length === 0 && (
            <p className="mt-6 text-center text-sm text-amber-100/70">
              It&apos;s quiet by the fire right now. Be the first to share
              something tonight.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
