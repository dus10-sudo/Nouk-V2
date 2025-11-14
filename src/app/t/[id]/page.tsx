// src/app/t/[id]/page.tsx
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getThreadWithReplies } from "@/lib/threads";
import { addReply } from "@/lib/actions";

type ThreadPageProps = {
  params: { id: string };
};

export default async function ThreadPage({ params }: ThreadPageProps) {
  const thread = await getThreadWithReplies(params.id);

  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink">
        <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">
          <p>Thread not found.</p>
        </div>
      </main>
    );
  }

  const roomName = thread.room.name || thread.room.slug || "Room";

  // Server action for posting a reply
  async function handleReply(formData: FormData) {
    "use server";
    const body = (formData.get("body") as string | null)?.trim();
    if (!body) return;

    await addReply(thread.id, body);
    revalidatePath(`/t/${thread.id}`);
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">
        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Rooms
          </Link>
          {" › "}
          <Link href={`/room/${thread.room.slug}`} className="hover:underline">
            {roomName}
          </Link>
          {" › "}
          <span>{thread.title}</span>
        </div>

        {/* Header row */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="font-serif text-[32px] leading-tight tracking-[-0.03em] text-[var(--ink-strong)]">
            {thread.title}
          </h1>

          <div className="rounded-full border border-[var(--border-subtle)] bg-[var(--card)] px-4 py-1 text-[13px] font-medium text-[var(--muted-strong)]">
            Living Nouk
          </div>
        </div>

        {/* Seed card */}
        <section className="mb-6 rounded-[28px] bg-[var(--card)] px-5 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
          <div className="mb-3 flex items-center justify-between gap-2 text-[13px] text-[var(--muted)]">
            <span className="font-medium">Seed</span>
            <span>
              Started{" "}
              {new Date(thread.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <h2 className="mb-2 text-xl font-semibold text-[var(--ink-strong)]">
            {thread.title}
          </h2>

          <p className="text-[16px] leading-relaxed text-[var(--ink-soft)]">
            This Nouk will slowly fade if the conversation goes quiet.
          </p>

          {thread.link_url && (
            <div className="mt-4">
              <a
                href={thread.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-faint)] px-4 py-2 text-[14px] font-medium text-[var(--accent-strong)] underline-offset-2 hover:underline"
              >
                {new URL(thread.link_url).hostname}
              </a>
            </div>
          )}
        </section>

        {/* Replies */}
        <section className="flex flex-1 flex-col gap-3">
          {thread.replies.length === 0 ? (
            <p className="text-center text-[14px] text-[var(--muted)]">
              It&apos;s just the seed for now. Add a reply below to let this
              Nouk grow.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {thread.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="rounded-[24px] bg-[var(--card)] px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                >
                  <p className="mb-2 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                    {reply.body}
                  </p>
                  <p className="text-right text-[12px] text-[var(--muted)]">
                    {new Date(reply.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reply box */}
        <section className="mt-6 rounded-[28px] bg-[var(--card-elevated)] p-4 shadow-[0_18px_45px_rgba(15,23,42,0.28)]">
          <form action={handleReply} className="flex flex-col gap-3">
            <textarea
              key={thread.replies.length} // force remount → clears after submit
              name="body"
              rows={3}
              className="w-full resize-none rounded-2xl border border-[var(--accent-soft)] bg-[var(--paper)] px-3 py-3 text-[15px] text-[var(--ink)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
              placeholder="Write a reply..."
            />
            <button
              type="submit"
              className="self-end rounded-full bg-[var(--accent)] px-5 py-2 text-[14px] font-semibold text-[var(--paper)] shadow-[0_10px_30px_rgba(0,0,0,0.25)] active:translate-y-[1px]"
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
