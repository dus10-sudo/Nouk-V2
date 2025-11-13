// src/app/t/[id]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { getThread } from "@/lib/threads";

type PageProps = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Nouk – Thread",
};

export default async function ThreadPage({ params }: PageProps) {
  const thread = await getThread(params.id);

  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink">
        <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-10">
          <p className="text-[15px] text-[var(--muted)]">Thread not found.</p>
        </div>
      </main>
    );
  }

  const roomLabel =
    thread.room?.title || thread.room?.slug || "Room";

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">
        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Rooms
          </Link>
          <span className="mx-1">›</span>
          <span>{roomLabel}</span>
          <span className="mx-1">›</span>
          <span className="text-[var(--ink)]">{thread.title}</span>
        </div>

        {/* Header */}
        <header className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[26px] font-semibold tracking-[-0.02em]">
              {thread.title}
            </h1>
            <p className="mt-1 text-[13px] text-[var(--muted)]">
              Started in <span className="font-medium">{roomLabel}</span>. New
              replies gently fade after quiet hours.
            </p>
          </div>

          <span className="rounded-full border border-[var(--borderSoft)] bg-[var(--card)] px-3 py-1 text-[12px] font-medium text-[var(--muted)]">
            Living Nouk
          </span>
        </header>

        {/* Seed card */}
        <section className="mb-10">
          <div className="rounded-3xl bg-[var(--card)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--paper)] text-[11px] font-medium text-[var(--muted)]">
                ○
              </span>
              <span className="text-[13px] font-medium text-[var(--muted)]">
                Seed
              </span>
            </div>
            <h2 className="text-[17px] font-semibold tracking-[-0.01em]">
              {thread.title}
            </h2>
            <p className="mt-1 text-[14px] text-[var(--muted)]">
              This Nouk will slowly fade if the conversation goes quiet.
            </p>
          </div>

          <p className="mt-6 text-center text-[13px] text-[var(--muted)]">
            It&apos;s just the seed for now. Add a reply below to let this Nouk
            grow.
          </p>
        </section>

        {/* Simple reply box placeholder (non-functional for now) */}
        <section className="mt-auto">
          <form className="rounded-3xl bg-[var(--card)] p-3 shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
            <textarea
              className="mb-3 h-24 w-full resize-none rounded-2xl border border-[var(--borderSoft)] bg-[var(--paper)] px-3 py-2 text-[14px] outline-none focus:border-[var(--accent)]"
              placeholder="Write a reply…"
            />
            <div className="flex justify-end">
              <button
                type="button"
                disabled
                className="rounded-2xl bg-[var(--accentSoft)] px-4 py-2 text-[14px] font-medium text-[var(--accent)] opacity-60"
              >
                Send (coming soon)
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
