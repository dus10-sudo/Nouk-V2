// src/app/home/page.tsx
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase";

type ThreadRow = {
  id: string;
  title: string | null;
  created_at: string;
  rooms: {
    name: string;
  } | null;
};

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("threads")
    .select("id, title, created_at, rooms(name)")
    .order("created_at", { ascending: false })
    .limit(25);

  const threads: ThreadRow[] = (data as any) ?? [];

  return (
    <main className="min-h-screen bg-[var(--page-bg,#f3eee2)] px-4 py-4">
      <div className="mx-auto flex h-full max-w-md flex-col">
        {/* Header */}
        <header className="mb-4">
          <h1 className="text-center text-xl font-semibold text-[var(--ink,#1f2933)]">
            Inside Nouk
          </h1>
          <p className="mt-1 text-center text-sm text-[var(--muted,#6b7280)]">
            Quiet little posts that fade with time.
          </p>
        </header>

        {/* Feed */}
        <section className="flex-1 overflow-y-auto rounded-2xl bg-[var(--card,#f8f3e6)] p-3 shadow-sm">
          {error && (
            <div className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
              Couldn&apos;t load threads right now. Please try again later.
            </div>
          )}

          {!error && threads.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-[var(--muted,#6b7280)]">
              <div>It’s very quiet in here.</div>
              <div>Be the first to start something.</div>
            </div>
          )}

          {!error && threads.length > 0 && (
            <ul className="space-y-2">
              {threads.map((thread) => {
                const roomName = thread.rooms?.name ?? "Somewhere in the house";
                const date = new Date(thread.created_at);
                const formatted = date.toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                });

                return (
                  <li key={thread.id}>
                    <Link
                      href={`/thread/${thread.id}`}
                      className="block rounded-2xl border border-black/5 bg-white/80 px-3 py-2.5 text-sm shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition active:scale-[0.99]"
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <span className="truncate text-xs font-medium text-[var(--muted-strong,#4b5563)]">
                          {roomName}
                        </span>
                        <span className="shrink-0 text-[11px] text-[var(--muted,#6b7280)]">
                          {formatted}
                        </span>
                      </div>
                      <div className="line-clamp-2 text-[13px] text-[var(--ink,#111827)]">
                        {thread.title && thread.title.trim().length > 0
                          ? thread.title
                          : "Untitled Nouk"}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Share button */}
        <div className="mt-4">
          <Link
            href="/share"
            className="flex w-full items-center justify-center rounded-full bg-[var(--accent,#f97316)] px-6 py-3 text-[15px] font-semibold tracking-wide text-[var(--paper,#fff7ed)] shadow-[0_18px_40px_rgba(249,115,22,0.55)] active:scale-[0.98] transition-transform"
          >
            Share a Thought
          </Link>
        </div>
      </div>
    </main>
  );
}
