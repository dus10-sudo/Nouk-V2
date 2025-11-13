// src/app/t/[id]/page.tsx

import { notFound } from "next/navigation";
import { getThread } from "@/lib/db";
import Link from "next/link";

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const thread = await getThread(params.id);

  if (!thread) return notFound();

  const roomLabel =
    thread.room?.name || thread.room?.slug || "Room";

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">

        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          Rooms › {roomLabel} › {thread.title}
        </div>

        {/* Header */}
        <h1 className="text-[32px] font-serif tracking-tight mb-1">
          {thread.title}
        </h1>

        <div className="text-[13px] text-[var(--muted)] mb-6">
          Started in <span className="font-medium">{roomLabel}</span>.  
          New replies gently fade after quiet hours.
        </div>

        {/* Seed Card */}
        <div className="mb-8 rounded-2xl bg-[var(--card)] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div className="text-base font-medium mb-1">Seed</div>
          <div className="text-[15px] leading-snug">
            {thread.body || "This Nouk will slowly fade if the conversation goes quiet."}
          </div>

          {/* 🔗 Optional external link preview (simple for now) */}
          {thread.link && (
            <a
              href={thread.link}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block text-[14px] text-[var(--accent)] underline"
            >
              {thread.link}
            </a>
          )}
        </div>

        {/* Message List */}
        <div className="flex-1">
          {thread.replies?.length === 0 && (
            <p className="text-center text-[14px] text-[var(--muted)]">
              It's just the seed for now. Add a reply below to let this Nouk grow.
            </p>
          )}

          {thread.replies?.map((r) => (
            <div
              key={r.id}
              className="mb-4 rounded-xl bg-[var(--card)] p-4 shadow-sm"
            >
              <div className="text-[15px] leading-snug">{r.body}</div>
            </div>
          ))}
        </div>

        {/* Reply Box */}
        <form
          action={`/api/threads/reply?id=${thread.id}`}
          method="POST"
          className="sticky bottom-4 mt-6 rounded-2xl bg-[var(--card)] p-4 shadow-[0_8px_20px_rgba(0,0,0,0.10)]"
        >
          <textarea
            name="body"
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-transparent p-3 text-[15px] outline-none"
            placeholder="Write a reply..."
            rows={3}
            required
          />
          <button
            type="submit"
            className="mt-3 float-right rounded-xl bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
