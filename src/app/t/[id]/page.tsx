// src/app/t/[id]/page.tsx

import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getThread } from "@/lib/threads";
import { supabase } from "@/lib/supabase";
import { addReply } from "@/lib/actions";

type PageProps = {
  params: { id: string };
};

type ReplyRow = {
  id: string;
  body: string;
  created_at: string;
};

export default async function ThreadPage({ params: { id } }: PageProps) {
  const thread = await getThread(id);

  if (!thread) {
    return (
      <main className="min-h-screen bg-paper text-ink">
        <div className="mx-auto max-w-[720px] px-4 py-16">
          <p className="text-[15px] text-[var(--muted)]">Thread not found.</p>
          <div className="mt-4">
            <Link
              href="/"
              className="text-[14px] text-accent underline underline-offset-2"
            >
              Back to rooms
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const roomName = thread.room?.name ?? thread.room?.slug ?? "Room";

  const { data: repliesData } = await supabase
    .from("replies")
    .select("id, body, created_at")
    .eq("thread_id", id)
    .order("created_at", { ascending: true });

  const replies: ReplyRow[] = (repliesData ?? []) as ReplyRow[];

  async function submitReply(formData: FormData) {
    "use server";
    const body = (formData.get("body") || "").toString().trim();
    if (!body) return;
    await addReply(id, body);
    revalidatePath(`/t/${id}`);
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-24 pt-6">
        {/* Breadcrumb */}
        <div className="mb-2 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Rooms
          </Link>
          {thread.room?.slug && (
            <>
              <span aria-hidden> › </span>
              <Link
                href={`/room/${thread.room.slug}`}
                className="hover:underline"
              >
                {roomName}
              </Link>
            </>
          )}
          <span aria-hidden> › </span>
          <span className="text-ink">{thread.title}</span>
        </div>

        {/* Thread card */}
        <section className="mb-4 rounded-3xl border border-[var(--ring)] bg-[var(--card)] p-5 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-[22px] leading-snug tracking-[-0.02em]">
                {thread.title}
              </h1>
              <p className="mt-2 text-[14px] text-[var(--muted)]">
                This Nouk will slowly fade if the conversation goes quiet.
              </p>
            </div>

            <div className="shrink-0 text-right text-[11px] text-[var(--muted)]">
              <div>
                Started{" "}
                {new Date(thread.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {thread.link_url && (
            <div className="mt-4 rounded-2xl bg-[var(--paper)]/60 p-3 text-[13px]">
              <div className="mb-1 text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                Linked
              </div>
              <a
                href={thread.link_url}
                target="_blank"
                rel="noreferrer"
                className="break-words text-[13px] text-accent underline underline-offset-2"
              >
                {thread.link_url}
              </a>
            </div>
          )}
        </section>

        {/* Replies */}
        <section className="flex-1 space-y-3">
          {replies.length === 0 ? (
            <p className="text-[14px] text-[var(--muted)]">
              No replies yet. Be the first to say something.
            </p>
          ) : (
            replies.map((r) => (
              <article
                key={r.id}
                className="rounded-2xl border border-[var(--ring)] bg-[var(--card)] p-4 shadow-card"
              >
                <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                  {r.body}
                </div>
                <div className="mt-2 text-right text-[11px] text-[var(--muted)]">
                  {new Date(r.created_at).toLocaleString()}
                </div>
              </article>
            ))
          )}
        </section>

        {/* Reply form */}
<section className="mt-5">
  <form
    key={replies.length}               // 👈 add this line
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
                Send
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
