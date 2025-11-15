// src/app/t/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { getOrCreateUserToken } from '@/lib/userToken';
import { aliasFromToken } from '@/lib/aliases';

type ThreadPageProps = {
  params: {
    id: string;
  };
};

type RoomRecord = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
};

type ThreadRecord = {
  id: string;
  title: string;
  link_url: string | null;
  created_at: string;
  expires_at: string | null;
  user_token: string | null;
  room_id: string;
};

type ReplyRecord = {
  id: string;
  body: string;
  created_at: string;
  user_token: string | null;
};

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | {
      status: 'ready';
      room: RoomRecord;
      thread: ThreadRecord;
      replies: ReplyRecord[];
    };

export default function ThreadPage({ params }: ThreadPageProps) {
  const { id } = params;
  const router = useRouter();

  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load thread, room, and replies
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // 1) Thread
        const { data: thread, error: threadError } = await supabase
          .from('threads')
          .select(
            'id, title, link_url, created_at, expires_at, user_token, room_id'
          )
          .eq('id', id)
          .single<ThreadRecord>();

        if (threadError || !thread) {
          console.error('[ThreadPage] Error loading thread', threadError);
          if (!cancelled) {
            setState({
              status: 'error',
              message: 'Could not load this Nouk.',
            });
          }
          return;
        }

        // 2) Room
        const { data: room, error: roomError } = await supabase
          .from('rooms')
          .select('id, slug, name, description')
          .eq('id', thread.room_id)
          .single<RoomRecord>();

        if (roomError || !room) {
          console.error('[ThreadPage] Error loading room', roomError);
          if (!cancelled) {
            setState({
              status: 'error',
              message: 'Could not find the room for this Nouk.',
            });
          }
          return;
        }

        // 3) Replies
        const { data: replies, error: repliesError } = await supabase
          .from('replies')
          .select('id, body, created_at, user_token')
          .eq('thread_id', id)
          .order('created_at', { ascending: true });

        if (repliesError) {
          console.error('[ThreadPage] Error loading replies', repliesError);
        }

        if (!cancelled) {
          setState({
            status: 'ready',
            room,
            thread,
            replies: (replies as ReplyRecord[]) ?? [],
          });
        }
      } catch (err) {
        console.error('[ThreadPage] Unexpected error', err);
        if (!cancelled) {
          setState({
            status: 'error',
            message: 'Something went wrong loading this Nouk.',
          });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSubmitReply() {
    if (state.status !== 'ready') return;

    const trimmed = replyText.trim();
    if (!trimmed) {
      setSubmitError('Say at least a few words.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const userToken = getOrCreateUserToken();

      const { data, error } = await supabase
        .from('replies')
        .insert({
          thread_id: state.thread.id,
          body: trimmed,
          user_token: userToken,
        })
        .select('id, body, created_at, user_token')
        .single<ReplyRecord>();

      if (error || !data) {
        console.error('[ThreadPage] Error creating reply', error);
        setSubmitError('Could not send that reply. Please try again.');
        setSubmitting(false);
        return;
      }

      // Optimistically append
      setState((prev) =>
        prev.status === 'ready'
          ? {
              ...prev,
              replies: [...prev.replies, data],
            }
          : prev
      );

      setReplyText('');
      setSubmitting(false);
    } catch (err) {
      console.error('[ThreadPage] Unexpected error submitting reply', err);
      setSubmitError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  // --- UI helpers ---

  function renderBody() {
    if (state.status === 'loading') {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--paper)]">
          <p className="text-[14px] text-[var(--muted-strong)]">
            Loading your Nouk…
          </p>
        </div>
      );
    }

    if (state.status === 'error') {
      return (
        <main className="min-h-screen bg-[var(--paper)]">
          <div className="mx-auto max-w-lg px-4 pb-6 pt-6">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="mb-3 text-[13px] text-[var(--muted)]"
            >
              ← Back to rooms
            </button>

            <div className="rounded-[24px] bg-[var(--card)] px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.22)]">
              <h1 className="text-[16px] font-semibold text-[var(--ink-strong)]">
                Something went wrong
              </h1>
              <p className="mt-1 text-[14px] text-[var(--muted-strong)]">
                {state.message}
              </p>
            </div>
          </div>
        </main>
      );
    }

    const { room, thread, replies } = state;

    const seedAlias = thread.user_token
      ? aliasFromToken(thread.user_token)
      : 'Cozy Guest';

    return (
      <main className="min-h-screen bg-[var(--paper)]">
        <div className="mx-auto max-w-lg px-4 pb-6 pt-6">
          {/* Breadcrumb */}
          <button
            type="button"
            onClick={() => router.push(`/room/${room.slug}`)}
            className="mb-3 text-[13px] text-[var(--muted)]"
          >
            ← Back to {room.name}
          </button>

          {/* Seed card */}
          <section className="mb-4 rounded-[26px] bg-[var(--card)] px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.22)]">
            <div className="mb-1 text-[12px] font-semibold tracking-[0.2em] text-[var(--muted)]">
              SEED
            </div>
            <h1 className="text-[18px] font-semibold text-[var(--ink-strong)]">
              {thread.title}
            </h1>

            {thread.link_url && (
              <div className="mt-2">
                <Link
                  href={thread.link_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] font-medium text-[var(--accent-strong)] underline underline-offset-2"
                >
                  Open link
                </Link>
              </div>
            )}

            <p className="mt-3 text-[13px] text-[var(--muted-strong)]">
              Started by <span className="font-semibold">{seedAlias}</span> in{' '}
              <span className="font-semibold">{room.name}</span>.
              Let the replies grow underneath.
            </p>
          </section>

          {/* Replies */}
          <section>
            {replies.length === 0 ? (
              <p className="mb-3 text-[13px] text-[var(--muted-strong)]">
                No replies yet. Be the first to leave a thought.
              </p>
            ) : (
              <p className="mb-2 text-[13px] text-[var(--muted)]">
                {replies.length} repl{replies.length === 1 ? 'y' : 'ies'}
              </p>
            )}

            <div className="space-y-3">
              {replies.map((reply) => {
                const alias = reply.user_token
                  ? aliasFromToken(reply.user_token)
                  : 'Guest';

                return (
                  <div
                    key={reply.id}
                    className="rounded-[18px] bg-[var(--surface)] px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.15)]"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[var(--muted-strong)]">
                        {alias}
                      </span>
                      <span className="text-[11px] text-[var(--muted)]">
                        {/* simple time – you can upgrade to formatted later */}
                        {new Date(reply.created_at).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-[14px] leading-snug text-[var(--ink)]">
                      {reply.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Reply form */}
          <section className="mt-5 rounded-[24px] bg-[var(--card)] px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.22)]">
            <div className="mb-1 text-[13px] font-medium text-[var(--muted-strong)]">
              Write a reply.
            </div>
            <textarea
              value={replyText}
              onChange={(e) => {
                setReplyText(e.target.value);
                if (submitError) setSubmitError(null);
              }}
              rows={3}
              placeholder="Say something small…"
              className="w-full resize-none rounded-[18px] border border-[color-mix(in_srgb,var(--muted)_35%,transparent)] bg-[var(--surface)] px-3 py-2 text-[14px] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            />
            {submitError && (
              <div className="mt-1 text-[12px] text-red-600">{submitError}</div>
            )}
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSubmitReply}
                disabled={submitting}
                className="rounded-[18px] bg-[var(--accent)] px-4 py-2 text-[14px] font-semibold text-[var(--paper)] shadow-[0_10px_26px_rgba(15,23,42,0.45)] disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send reply'}
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return renderBody();
}
