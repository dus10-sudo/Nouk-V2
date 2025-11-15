// src/app/t/[id]/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getThreadWithReplies } from "@/lib/threads";
import { addReply } from "@/lib/actions";
import { aliasFromToken } from "@/lib/alias";

type ThreadPageProps = { params: { id: string } };

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
  const cookieStore = cookies();
  const myToken = cookieStore.get("nouk_user_token")?.value ?? null;

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
              It&apos;s just the seed for now. Add a reply below to let this Nouk grow.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {thread.replies.map((r) => {
                const isMine = myToken && r.user_token && myToken === r.user_token;
                const alias = isMine
                  ? "You"
                  : aliasFromToken(r.user_token ?? "nouk-anon");

                return (
                  <div
                    key={r.id}
                    className="rounded-[24px] bg-[var(--card)] px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.12)] animate-in-reply"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px] font-medium text-[var(--muted-strong)]">
                        {alias}
                      </span>
                      <span className="text-[12px] text-[var(--muted)]">
                        {new Date(r.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-[var(--ink-soft)] whitespace-pre-wrap">
                      {r.body}
                    </p>
                  </div>
                );
              })}
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
// app/t/[id]/page.tsx
import { format } from 'date-fns';
import { redirect } from 'next/navigation';
import { postReply, getThreadById } from '@/lib/threads'; // adjust to your actual paths

type ThreadPageProps = {
  params: { id: string };
};

const DOT_COLORS = ['#f97316', '#0ea5e9', '#22c55e', '#a855f7'];

export default async function ThreadPage({ params }: ThreadPageProps) {
  const thread = await getThreadById(params.id);

  if (!thread) redirect('/');

  // You can wire this based on Realtime later
  const hasSoftPresence = false;

  return (
    <div className="thread-page-bg min-h-screen text-[var(--ink)]">
      <div className="thread-vine-root relative mx-auto flex min-h-screen max-w-xl flex-col px-4 pb-5 pt-5">
        {/* Vine */}
        <div className="thread-vine" aria-hidden="true" />

        {/* Header */}
        <header className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Back button – optional, hook up to router.back() if you like */}
            <a
              href={`/r/${thread.room_slug ?? ''}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(0,0,0,0.03)] text-sm"
            >
              ←
            </a>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                {thread.room_name ?? 'Library'}
              </span>
              <h1 className="text-lg font-semibold leading-tight">
                {thread.title}
              </h1>
            </div>
          </div>

          {/* Soft presence indicator */}
          {hasSoftPresence && (
            <div className="flex items-center gap-1 text-[11px] text-[var(--muted)]">
              <span className="soft-presence-dot" />
              <span>Someone was here recently</span>
            </div>
          )}
        </header>

        {/* Seed card */}
        <section className="seed-card mb-4 px-4 py-4">
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              Seed
            </span>
            <span className="text-[11px] text-[var(--muted)]">
              Started {format(new Date(thread.created_at), 'MMM d')}
            </span>
          </div>

          <h2 className="mb-1 text-lg font-semibold leading-snug">
            {thread.title}
          </h2>

          {thread.body && (
            <p className="mb-3 text-sm leading-relaxed text-[var(--ink-soft)]">
              {thread.body}
            </p>
          )}

          {thread.link_url && (
            <a
              href={thread.link_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-[rgba(179,140,97,0.35)] bg-[rgba(255,248,238,0.9)] px-3 py-1 text-xs font-medium text-[var(--accent)]"
            >
              {thread.link_url.replace(/^https?:\/\//, '')}
            </a>
          )}

          <p className="mt-3 text-[11px] italic text-[var(--muted)]">
            You started this cozy little corner.
          </p>
        </section>

        {/* Replies */}
        <main className="flex-1 space-y-3 pb-4">
          {thread.replies.length > 0 && (
            <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              Today
            </p>
          )}

          {thread.replies.map((reply: any, index: number) => {
            const color = DOT_COLORS[index % DOT_COLORS.length];

            return (
              <div
                key={reply.id}
                className="reply-animate relative ml-6"
              >
                <div
                  className="reply-dot"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                <div className="reply-bubble px-4 py-3">
                  <p className="text-sm leading-relaxed">{reply.body}</p>
                  <p className="mt-1 text-[11px] text-[var(--muted)]">
                    {format(new Date(reply.created_at), 'p')}
                  </p>
                </div>
              </div>
            );
          })}

          {thread.replies.length === 0 && (
            <p className="ml-1 mt-2 text-[12px] text-[var(--muted)]">
              No replies yet. You can leave this Nouk to fade quietly, or say something back.
            </p>
          )}
        </main>

        {/* Reply input */}
        <section className="reply-input-card mt-2 border border-[rgba(179,140,97,0.15)] px-3 py-3">
          <form action={postReply.bind(null, thread.id)} className="flex flex-col gap-2">
            <div className="reply-input-field flex-1 px-3 py-2">
              <textarea
                name="body"
                rows={2}
                className="h-12 w-full resize-none border-none bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
                placeholder="Write a reply..."
              />
            </div>
            <div className="mt-1 flex items-center justify-end gap-2">
              {/* Optional: tiny hint */}
              <span className="mr-auto text-[11px] text-[var(--muted)]">
                Tiny replies or longer thoughts are both welcome.
              </span>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent,#ea7a3b)] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_14px_30px_rgba(234,122,59,0.55)]"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
