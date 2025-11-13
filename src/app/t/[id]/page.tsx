// src/app/t/[id]/page.tsx

import { notFound } from "next/navigation";
import { getThread } from "@/lib/db";

type ThreadPageProps = {
  params: { id: string };
};

export default async function ThreadPage({ params }: ThreadPageProps) {
  const thread = await getThread(params.id);

  if (!thread) {
    return notFound();
  }

  const roomLabel =
    thread.room?.name || thread.room?.slug || "Room";

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-[720px] px-4 pb-24 pt-6">
        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          Rooms › {roomLabel} › {thread.title}
        </div>

        {/* Header */}
        <h1 className="mb-1 text-[32px] font-serif tracking-tight">
          {thread.title}
        </h1>

        <div className="mb-6 text-[13px] text-[var(--muted)]">
          Started in <span className="font-medium">{roomLabel}</span>. New
          replies gently fade after quiet hours.
        </div>

        {/* Seed body */}
        <div className="rounded-2xl bg-[var(--card)] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div className="mb-1 text-base font-medium">Seed</div>
          <div className="text-[15px] leading-snug">
            {thread.body ||
              "This Nouk will slowly fade if the conversation goes quiet."}
          </div>
        </div>
      </div>
    </main>
  );
}
