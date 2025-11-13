import { getThread } from "@/lib/threads";
import Link from "next/link";

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const thread = await getThread(params.id);

  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink">
        <div className="mx-auto max-w-[720px] px-4 pt-6">
          <p className="text-[20px] font-serif">Thread not found.</p>
        </div>
      </main>
    );
  }

  // Thread fields:
  const title = thread.title;
  const created = new Date(thread.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Room data
  const roomTitle = thread.room.name; // ← FIXED
  const roomSlug = thread.room.slug;  // ← FIXED

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">

        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Rooms
          </Link>{" "}
          &gt;{" "}
          <Link href={`/room/${roomSlug}`} className="hover:underline">
            {roomTitle}
          </Link>{" "}
          &gt; {title}
        </div>

        {/* Thread Header */}
        <h1 className="mb-3 font-serif text-[32px]">{title}</h1>

        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full border border-[var(--muted)] px-3 py-1 text-[12px]">
            Living Nouk
          </span>
        </div>

        {/* Seed Card */}
        <div className="rounded-3xl bg-[var(--card)] p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-[14px] text-[var(--muted)]">
            <span className="rounded-full bg-[var(--paper)] px-3 py-1">Seed</span>
            <span>{created}</span>
          </div>

          <h2 className="mb-2 font-serif text-[20px]">{title}</h2>

          <p className="text-[16px] leading-snug">
            This Nouk will slowly fade if the conversation goes quiet.
          </p>

          {/* Optional link preview */}
          {thread.link_url && (
            <a
              href={thread.link_url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-xl border border-[var(--accent)] px-4 py-2 text-[var(--accent)]"
            >
              {new URL(thread.link_url).hostname}
            </a>
          )}
        </div>

        {/* Reply box (coming soon) */}
        <p className="mt-10 text-center text-[15px] text-[var(--muted)]">
          It&apos;s just the seed for now. Add a reply below to let this Nouk grow.
        </p>

        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[720px] bg-paper px-4 pb-6 pt-4">
          <div className="rounded-3xl border border-[var(--accent)] bg-[var(--paper)] p-4 shadow-sm">
            <textarea
              className="w-full resize-none bg-transparent text-[16px] text-ink focus:outline-none"
              placeholder="Write a reply..."
              disabled
            ></textarea>
            <button
              disabled
              className="mt-3 float-right cursor-not-allowed text-[var(--muted)]"
            >
              Send (coming soon)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
