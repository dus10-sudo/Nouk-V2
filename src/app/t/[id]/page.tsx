// src/app/t/[id]/page.tsx
import Link from "next/link";
import { getThreadWithReplies } from "@/lib/threads";
import { addReply } from "@/lib/actions";

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const thread = await getThreadWithReplies(params.id);

  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink p-6">
        <p>Thread not found.</p>
      </main>
    );
  }

  const roomName = thread.room?.name ?? thread.room?.slug ?? "Room";

  // Server action wrapper
  async function submitReply(formData: FormData) {
    "use server";
    const body = formData.get("body")?.toString().trim();
    if (!body) return;
    await addReply(thread.id, body);
  }

  const replies = thread.replies ?? [];

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-[720px] min-h-screen flex flex-col px-4 pb-24 pt-6">

        {/* Breadcrumb */}
        <div className="mb-3 text-[13px] text-[var(--muted)]">
          <Link href="/rooms" className="hover:underline">
            Rooms
          </Link>{" "}
          ›{" "}
          <Link href={`/r/${thread.room.slug}`} className="hover:underline">
            {roomName}
          </Link>{" "}
          › {thread.title}
        </div>

        {/* Main thread card */}
        <div className="rounded-3xl border border-black/10 bg-[var(--surface)] p-6 shadow-sm mb-4">
          <div className="flex justify-between mb-2 text-[13px] text-[var(--muted)]">
            <span>Started</span>
            <span>
              {new Date(thread.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <h2 className="font-semibold text-2xl mb-2">{thread.title}</h2>

          <p className="text-[16px] leading-relaxed">
            {thread.body ??
              "This Nouk will slowly fade if the conversation goes quiet."}
          </p>

          {thread.link_url && (
            <div className="mt-4">
              <a
                href={thread.link_url}
                target="_blank"
                className="inline-block rounded-xl border border-accent/30 px-4 py-2 text-accent text-[15px] hover:bg-accent/10"
              >
                {new URL(thread.link_url).hostname}
              </a>
            </div>
          )}
        </div>

        {/* Replies */}
        <div className="space-y-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-3xl border border-black/10 bg-[var(--surface)] p-4 shadow-sm"
            >
              <p className="text-[15px] leading-relaxed mb-2">{reply.body}</p>
              <div className="text-right text-[12px] text-[var(--muted)]">
                {new Date(reply.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Reply form */}
        <section className="mt-6">
          <form
            key={replies.length} // ← auto-clear textarea
            action={submitReply}
            className="rounded-3xl border border-accent/50 bg-[var(--surface)] p-4 shadow-sm"
          >
            <textarea
              name="body"
              placeholder="Write a reply…"
              className="h-24 w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-accent px-4 py-1.5 text-[14px] font-medium text-white shadow-sm active:scale-[0.98]"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
