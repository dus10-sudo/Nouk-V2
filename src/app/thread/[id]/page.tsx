// src/app/thread/[id]/page.tsx
import { supabase, Thread, Reply, Room } from '@/lib/supabase';
import Link from 'next/link';

type ThreadPageProps = {
  params: { id: string };
};

async function getThreadData(id: string) {
  const { data: thread, error: threadError } = await supabase
    .from('threads')
    .select('id, room_id, title, body, link_url, created_at')
    .eq('id', id)
    .single();

  if (threadError || !thread) return null;

  const { data: room } = await supabase
    .from('rooms')
    .select('id, slug, title')
    .eq('id', thread.room_id)
    .single();

  const { data: replies } = await supabase
    .from('replies')
    .select('id, thread_id, body, created_at')
    .eq('thread_id', id)
    .order('created_at', { ascending: true });

  return {
    thread: thread as Thread,
    room: (room || null) as Room | null,
    replies: (replies || []) as Reply[],
  };
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const data = await getThreadData(params.id);
  if (!data) {
    return (
      <main className="min-h-screen bg-[#f5eedf] flex items-center justify-center">
        <p className="text-sm text-neutral-700">This post doesn&apos;t exist anymore.</p>
      </main>
    );
  }

  const { thread, room, replies } = data;

  return (
    <main className="min-h-screen bg-[#f5eedf]">
      <div className="max-w-xl mx-auto px-4 pb-20 pt-6">
        <Link
          href={room ? `/home?room=${room.slug}` : '/home'}
          className="text-xs text-neutral-600 inline-flex items-center mb-4"
        >
          ← Back to {room ? room.title : 'Nouk'}
        </Link>

        <article className="rounded-3xl bg-white shadow-sm border border-neutral-200 px-4 py-4 mb-4">
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
            <span>{room ? room.title : 'Somewhere in the house'}</span>
            <span>{new Date(thread.created_at).toLocaleString()}</span>
          </div>
          <h1 className="text-base font-semibold text-neutral-900 mb-2">
            {thread.title || '(no title)'}
          </h1>
          {thread.body && (
            <p className="text-sm text-neutral-800 whitespace-pre-wrap mb-2">
              {thread.body}
            </p>
          )}
          {thread.link_url && (
            <a
              href={thread.link_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-700 underline break-all"
            >
              {thread.link_url}
            </a>
          )}
        </article>

        {/* Replies */}
        <section className="space-y-3 mb-4">
          {replies.length === 0 ? (
            <p className="text-xs text-neutral-600 text-center">
              No replies yet. Be the first to say something.
            </p>
          ) : (
            replies.map((reply) => (
              <div
                key={reply.id}
                className="rounded-2xl bg-white shadow-sm border border-neutral-200 px-4 py-2"
              >
                <p className="text-sm text-neutral-800 whitespace-pre-wrap">
                  {reply.body}
                </p>
                <div className="mt-1 text-[10px] text-neutral-500 text-right">
                  {new Date(reply.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Reply form - handled by API route using plain HTML form */}
        <form
          action={`/api/replies`}
          method="POST"
          className="rounded-2xl bg-white shadow-sm border border-neutral-200 px-4 py-3 space-y-2"
        >
          <input type="hidden" name="thread_id" value={thread.id} />
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Add a reply
          </label>
          <textarea
            name="body"
            rows={3}
            placeholder="Say something small…"
            className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 resize-none"
          />
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="rounded-2xl bg-neutral-900 text-[#f5eedf] px-4 py-2 text-sm font-medium shadow-md"
            >
              Reply
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
