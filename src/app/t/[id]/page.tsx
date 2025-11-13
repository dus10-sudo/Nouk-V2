// src/app/t/[id]/page.tsx
import { getThreadById } from "@/lib/threads";
import Link from "next/link";

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const thread = await getThreadById(params.id);

  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink p-6">
        <p>Thread not found.</p>
      </main>
    );
  }

  const roomTitle = thread.room.title;
  const roomSlug = thread.room.slug;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">

        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          <Link href="/">Rooms</Link> ›{" "}
          <Link href={`/room/${roomSlug}`}>{roomTitle}</Link> › {thread.title}
        </div>

        {/* Thread Title */}
        <h1 className="text-[28px] font-serif mb-4">{thread.title}</h1>

        {/* Seed Card */}
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <div className="text-[15px] font-semibold mb-1">Seed</div>

          <p className="text-[17px] font-medium mb-3">{thread.title}</p>

          <p className="text-[15px] text-[var(--muted)] mb-4">
            This Nouk will slowly fade if the conversation goes quiet.
          </p>

          {thread.link_url && (
            <a
              href={thread.link_url}
              target="_blank"
              className="inline-block rounded-xl bg-paper px-4 py-2 text-[14px] text-accent underline"
            >
              {new URL(thread.link_url).hostname.replace("www.", "")}
            </a>
          )}
        </div>

        <p className="mt-6 text-center text-[14px] text-[var(--muted)]">
          It's just the seed for now. Add a reply below to let this Nouk grow.
        </p>

        {/* Reply Box (disabled for now) */}
        <div className="mt-6 rounded-3xl border border-[var(--accent-soft)] p-4">
          <textarea
            disabled
            className="w-full resize-none bg-transparent outline-none text-[16px]"
            placeholder="Write a reply…"
          />
          <button
            disabled
            className="mt-3 text-[15px] text-[var(--muted)] float-right"
          >
            Send (coming soon)
          </button>
        </div>

      </div>
    </main>
  );
}
