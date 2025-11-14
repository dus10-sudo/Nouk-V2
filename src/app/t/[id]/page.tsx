import { getThread } from "@/lib/threads";
import { getRepliesForThread } from "@/lib/queries";
import Link from "next/link";

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const thread = await getThread(params.id);
  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink px-4 py-10">
        <p>Thread not found.</p>
      </main>
    );
  }

  const replies = await getRepliesForThread(thread.id);

  const roomName = thread.room?.name ?? thread.room?.slug ?? "Room";

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-[720px] min-h-screen flex flex-col px-4 pb-24 pt-6">
        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          <Link href="/rooms" className="underline">
            Rooms
          </Link>{" "}
          &gt;{" "}
          <Link href={`/room/${thread.room.slug}`} className="underline">
            {roomName}
          </Link>{" "}
          &gt; {thread.title}
        </div>

        {/* Thread Title */}
        <h1 className="text-3xl font-semibold mb-1">{thread.title}</h1>

        {/* Status badge */}
        <div className="inline-flex items-center px-4 py-2 border rounded-full text-sm mb-6">
          Living Nouk
        </div>

        {/* Seed Card */}
        <div className="rounded-3xl bg-surface p-6 shadow-sm mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--muted)]">
              Seed
            </span>
            <span className="text-[var(--muted)] text-sm">
              {new Date(thread.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <h2 className="font-semibold text-xl mb-2">{thread.title}</h2>
          <p className="text-[16px] leading-relaxed">
            This Nouk will slowly fade if the conversation goes quiet.
          </p>

          {thread.link_url && (
            <div className="mt-4">
              <a
                href={thread.link_url}
                className="inline-block px-4 py-2 border border-accent rounded-xl text-accent"
              >
                {new URL(thread.link_url).hostname.replace("www.", "")}
              </a>
            </div>
          )}
        </div>

        {/* Replies */}
        <div className="space-y-6 mb-12">
          {replies.length === 0 && (
            <p className="text-center text-[var(--muted)]">
              It's just the seed for now.
