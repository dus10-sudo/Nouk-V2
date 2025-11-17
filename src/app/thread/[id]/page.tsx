'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type ThreadRow = {
  id: string;
  title: string | null;
  body: string | null;
  link_url: string | null;
  created_at: string;
  room_id: string;
};

type ReplyRow = {
  id: string;
  body: string;
  created_at: string;
};

type RoomRow = {
  id: string;
  title: string;
  slug: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function ThreadPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [thread, setThread] = useState<ThreadRow | null>(null);
  const [room, setRoom] = useState<RoomRow | null>(null);
  const [replies, setReplies] = useState<ReplyRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      const { data: threadData, error: threadError } = await supabase
        .from('threads')
        .select('id, title, body, link_url, created_at, room_id')
        .eq('id', params.id)
        .single();

      if (threadError || !threadData) {
        console.error('Error loading thread', threadError);
        setIsLoading(false);
        return;
      }

      const t = threadData as ThreadRow;
      setThread(t);

      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('id, title, slug')
        .eq('id', t.room_id)
        .single();

      if (!roomError && roomData) {
        setRoom(roomData as RoomRow);
      }

      const { data: repliesData, error: repliesError } = await supabase
        .from('replies')
        .select('id, body, created_at')
        .eq('thread_id', params.id)
        .order('created_at', { ascending: true });

      if (!repliesError && repliesData) {
        setReplies(repliesData as ReplyRow[]);
      }

      setIsLoading(false);
    }

    load();
  }, [params.id]);

  if (isLoading && !thread) {
    return (
      <main className="min-h-screen bg-[#f5eedf] flex items-center justify-center px-6 text-center">
        <p className="text-sm text-neutral-600">Loading&hellip;</p>
      </main>
    );
  }

  if (!thread) {
    return (
      <main className="min-h-screen bg-[#f5eedf] flex items-center justify-center px-6 text-center">
        <p className="text-sm text-neutral-600">This post couldn&apos;t be found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5eedf]">
      <div className="max-w-xl mx-auto px-4 pb-16 pt-6">
        {/* Back link */}
        <button
          type="button"
          onClick={() => {
            if (room) {
              router.push(`/home?room=${room.slug}`);
            } else {
              router.back();
            }
          }}
          className="mb-4 text-sm text-neutral-600 hover:text-neutral-900"
        >
          ← Back to {room?.title || 'Nouk'}
        </button>

        {/* Thread card */}
        <section className="rounded-3xl bg-white shadow-sm border border-neutral-200 px-4 py-4 mb-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              {room && (
                <p className="text-xs font-medium text-neutral-500">{room.title}</p>
              )}
              {thread.title && (
                <h1 className="mt-1 text-lg font-semibold text-neutral-900 break-words">
                  {thread.title}
                </h1>
              )}
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              {formatDate(thread.created_at)}
            </p>
          </div>

          {thread.body && (
            <p className="mt-3 text-sm text-neutral-900 whitespace-pre-wrap break-words">
              {thread.body}
            </p>
          )}

          {thread.link_url && (
            <a
              href={thread.link_url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-xs text-neutral-600 underline break-all"
            >
              {thread.link_url}
            </a>
          )}
        </section>

        {/* Replies */}
        <section className="space-y-3 mb-6">
          {replies.length === 0 ? (
            <p className="text-center text-sm text-neutral-600">
              No replies yet. Be the first to say something.
            </p>
          ) : (
            replies.map((reply) => (
              <div
                key={reply.id}
                className="rounded-3xl bg-white shadow-sm border border-neutral-200 px-4 py-3"
              >
                <p className="text-sm text-neutral-900 whitespace-pre-wrap break-words">
                  {reply.body}
                </p>
                <p className="mt-2 text-[11px] text-neutral-500">
                  {formatDate(reply.created_at)}
                </p>
              </div>
            ))
          )}
        </section>

        {/* Reply form - submits to /api/replies */}
        <section className="rounded-3xl bg-white shadow-sm border border-neutral-200 px-4 py-4">
          <p className="text-sm font-medium text-neutral-800 mb-2">Add a reply</p>
          <form method="POST" action="/api/replies" className="space-y-3">
            <input type="hidden" name="thread_id" value={thread.id} />
            <textarea
              name="body"
              rows={3}
              placeholder="Say something small..."
              className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-neutral-900 text-[#f5eedf] text-sm font-medium shadow-md active:scale-[0.98]"
              >
                Reply
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
