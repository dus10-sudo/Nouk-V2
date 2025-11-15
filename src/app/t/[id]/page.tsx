// src/app/t/[id]/page.tsx
import { format } from 'date-fns';
import { redirect } from 'next/navigation';
import { getThreadWithReplies, postReply } from '@/lib/threads'; // adjust to your path

type ThreadPageProps = {
  params: { id: string };
};

const DOT_COLORS = ['#f97316', '#0ea5e9', '#22c55e', '#a855f7'];

export default async function ThreadPage({ params }: ThreadPageProps) {
  const thread = await getThreadWithReplies(params.id);

  if (!thread) {
    redirect('/');
  }

  // You can wire this later based on Supabase Realtime
  const hasSoftPresence = false;

  return (
    <div className="thread-page-bg min-h-screen text-[var(--ink)]">
      <div className="thread-vine-root mx-auto flex min-h-screen max-w-xl flex-col px-4 pb-5 pt-5">
        {/* vertical vine */}
        <div className="thread-vine" aria-hidden="true" />

        {/* header */}
        <header className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href={`/r/${thread.room_slug ?? ''}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(0,0,0,0.03)] text-sm"
            >
              ←
            </a>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {thread.room_name ?? 'Library'}
              </span>
              <h1 className="text-[18px] font-semibold leading-tight">
                {thread.title}
              </h1>
            </div>
          </div>

          {hasSoftPresence && (
            <div className="flex items-center gap-1 text-[11px] text-[var(--muted)]">
              <span className="soft-presence-dot" />
              <span>Someone was here recently</span>
            </div>
          )}
        </header>

        {/* seed card */}
        <section className="seed-card mb-4 px-4 py-4">
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
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

        {/* replies */}
        <main className="flex-1 space-y-3 pb-4">
          {thread.replies.length > 0 && (
            <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              Today
            </p>
          )}

          {thread.replies.map((reply: any, index: number) => {
            const color = DOT_COLORS[index % DOT_COLORS.length];

            return (
              <div key={reply.id} className="reply-animate relative ml-6">
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
              No replies yet. You can leave this Nouk to fade quietly, or say
              something back.
            </p>
          )}
        </main>

        {/* reply composer */}
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
              <span className="mr-auto text-[11px] text-[var(--muted)]">
                Tiny replies or longer thoughts are both welcome.
              </span>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_14px_30px_rgba(234,122,59,0.55)]"
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
