// src/app/t/[id]/page.tsx

import { getThread } from "@/lib/threads";

type ThreadPageProps = {
  params: { id: string };
};

export default async function ThreadPage({ params }: ThreadPageProps) {
  const thread = await getThread(params.id);

  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink">
        <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">
          <p className="text-[18px] font-medium">Thread not found.</p>
        </div>
      </main>
    );
  }

  // Room label – uses joined room data if it exists, otherwise falls back
  const roomName =
    (Array.isArray(thread.room) && thread.room[0]?.title) ||
    (Array.isArray(thread.room) && thread.room[0]?.slug) ||
    // if your type is not an array, this still safely checks
    (thread as any).room?.title ||
    (thread as any).room?.slug ||
    "Room";

  // Simple “pretty” version of the link (just the hostname)
  let prettyLink: string | null = null;
  if (thread.link_url) {
    try {
      const url = new URL(thread.link_url);
      prettyLink = url.hostname.replace(/^www\./, "");
    } catch {
      // if it's not a valid URL, just show the raw string
      prettyLink = thread.link_url;
    }
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">
        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          Rooms &gt; {roomName} &gt; {thread.title}
        </div>

        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-[28px] font-serif leading-tight tracking-[-0.02em] text-[var(--ink)]">
            {thread.title}
          </h1>
          <span className="rounded-full border border-[var(--border-soft)] bg-[var(--card)] px-3 py-1 text-[12px] font-medium text-[var(--muted-strong)]">
            Living Nouk
          </span>
        </div>

        {/* Seed card */}
        <div className="mb-10 rounded-[24px] bg-[var(--card)] px-5 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
          <div className="mb-3 flex items-center gap-3 text-[13px] text-[var(--muted-strong)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--accent)]">
              Seed
            </div>
            <span>Seed</span>
          </div>

          <h2 className="mb-2 text-[18px] font-semibold text-[var(--ink)]">
            {thread.title}
          </h2>
          <p className="text-[15px] leading-relaxed text-[var(--muted-strong)]">
            This Nouk will slowly fade if the conversation goes quiet.
          </p>

          {/* Simple link display, if a link was provided */}
          {thread.link_url && prettyLink && (
            <a
              href={thread.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--paper)] px-4 py-2 text-[13px] font-medium text-[var(--accent)] underline underline-offset-4"
            >
              {prettyLink}
            </a>
          )}
        </div>

        <p className="mb-8 text-center text-[14px] text-[var(--muted)]">
          It&apos;s just the seed for now. Add a reply below to let this Nouk
          grow.
        </p>

        {/* Reply box (disabled for now) */}
        <div className="mt-auto">
          <div className="rounded-[24px] border border-[var(--accent)] bg-[var(--paper)] px-5 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
            <textarea
              className="h-20 w-full resize-none border-none bg-transparent text-[15px] text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
              placeholder="Write a reply..."
              disabled
            />
          </div>
          <div className="mt-3 flex justify-end">
            <button
              className="rounded-full bg-[var(--accent-muted)] px-5 py-2 text-[14px] font-medium text-[var(--paper)] opacity-60"
              disabled
            >
              Send (coming soon)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
