// src/app/t/[id]/page.tsx

import Link from "next/link";
import { getThread } from "@/lib/db";

type ThreadPageProps = {
  params: { id: string };
};

export default async function ThreadPage({ params: { id } }: ThreadPageProps) {
  const thread = await getThread(id);

  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink">
        <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">
          <p className="text-[15px] text-[var(--muted)]">Thread not found.</p>
        </div>
      </main>
    );
  }

  // Supabase is returning `room` as an array like [{ slug, name }]
  const anyThread = thread as any;
  const room = Array.isArray(anyThread.room) ? anyThread.room[0] : anyThread.room;

  const roomLabel = room?.name || room?.slug || "Room";
  const roomHref = room?.slug ? `/room/${room.slug}` : "/";

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">
        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Rooms
          </Link>
          {room && (
            <>
              <span aria-hidden> · </span>
              <Link href={roomHref} className="hover:underline">
                {roomLabel}
              </Link>
            </>
          )}
          <span aria-hidden> · </span>
          <span>{anyThread.title ?? "Thread"}</span>
        </div>

        {/* Title */}
        <header className="mb-4">
          <h1 className="font-serif text-[26px] leading-tight tracking-[-0.02em]">
            {anyThread.title ?? "Untitled nouk"}
          </h1>
          {anyThread.created_at && (
            <p className="mt-1 text-[13px] text-[var(--muted)]">
              Started {new Date(anyThread.created_at).toLocaleString()}
            </p>
          )}
        </header>

        {/* Placeholder body (we’ll wire replies + link preview next) */}
        <section className="mt-2 rounded-2xl border border-[var(--ring)] bg-[var(--card)] p-4 text-[15px] text-[var(--muted)] shadow-[var(--shadow)]">
          This nouk is ready for replies. Conversation UI coming next.
        </section>
      </div>
    </main>
  );
}
