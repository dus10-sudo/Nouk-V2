// src/app/t/[id]/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getThreadWithReplies } from "@/lib/threads";
import { addReply } from "@/lib/actions";
import { aliasFromToken } from "@/lib/alias";

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

  // Figure out *our* token for "You" labels (replies only).
  const cookieStore = cookies();
  const myToken =
    cookieStore.get("nouk_token")?.value ??
    cookieStore.get("nouk_user_token")?.value ??
    null;

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

        {/* Seed card (no alias needed here) */}
        <section className="mb-8 rounded-[28px] bg-[var(--card)] px-5 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
          <div className="mb-1 text-[11px] font-semibold tracking-[0.18em] text-[var(--muted)]">
            SEED
          </div>

          <h2 className="mb-3 font-serif text-[22px] leading-tight tracking-[-0.03em] text-[var(--ink-strong)]">
            {thread.title}
          </h2>

          {thread.link_url ? (
            <p className="mb-3 text-[14px]">
              <Link
                href={thread.link_url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
              >
                Open link
              </Link>
            </p>
          ) : null}

          <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
            It started here. Add a reply below to let this Nouk grow, or let it
            fade when you’re done talking.
          </p>
        </section>

        {/* Replies */}
        <section className="mb-6">
          {thread.replies.length === 0 ? (
            <p className="text-center text-[14px] text-[var(--muted)]">
              No replies yet. Be the first to leave a thought.
            </p>
          ) : (
            <div className="relative pl-4">
              {/* Simple vine line */}
              <div className="absolute left-1 top-0 h-full w-px bg-[var(--border-subtle)]" />

              <div className="space-y-4">
                {thread.replies.map((r) => {
                  const alias = r.user_token
                    ? aliasFromToken(r.user_token)
                    : "Cozy Guest";

                  const isMine =
                    !!myToken && !!r.user_token && myToken === r.user_token;

                  const created =
                    r.created_at &&
                    !Number.isNaN(Date.parse(r.created_at as any))
                      ? new Date(r.created_at)
                      : null;

                  const createdLabel = created
                    ? created.toLocaleString()
                    : "";

                  return (
                    <article
                      key={r.id}
                      className="relative ml-2 rounded-[22px] bg-[var(--card)] px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.10)]"
                    >
                      {/* Little node dot on the vine */}
                      <span className="absolute -left-[11px] top-4 h-3 w-3 rounded-full bg-[var(--card)] ring-2 ring-[var(--border-subtle)]" />

                      <div className="mb-1 flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-medium text-[var(--muted-strong)]">
                          {isMine ? "You" : alias}
                        </span>
                        {createdLabel && (
                          <span className="text-[11px] text-[var(--muted)]">
                            {createdLabel}
                          </span>
                        )}
                      </div>

                      <p className="text-[15px] leading-relaxed text-[var(--ink-soft)] whitespace-pre-wrap">
                        {r.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Reply form */}
        <section className="mt-auto">
          <form
            action={handleReply}
            className="rounded-[28px] bg-[var(--card)] px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.16)]"
          >
            <label className="mb-1 block text-[13px] font-medium text-[var(--muted-strong)]">
              Write a reply.
            </label>

            <textarea
              name="body"
              placeholder="Say something small to keep it going…"
              className="h-28 w-full resize-none rounded-2xl border border-[var(--border-subtle)] bg-transparent px-3 py-2 text-[15px] outline-none placeholder:text-[var(--muted)]"
            />

            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-[var(--accent)] px-6 py-2 text-[14px] font-medium text-white shadow-[0_12px_25px_rgba(185,99,64,0.55)] transition hover:translate-y-[1px] hover:shadow-[0_8px_18px_rgba(185,99,64,0.45)] active:translate-y-[2px] active:shadow-[0_3px_10px_rgba(185,99,64,0.35)]"
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
