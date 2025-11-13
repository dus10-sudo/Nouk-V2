// src/app/t/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getThreadWithRoom,
  listReplies,
  addReply,
  type ThreadWithRoom,
  type Reply,
} from '@/lib/supabase';
import Composer from '@/components/Composer';

type Params = { id: string };

export default async function ThreadPage({ params }: { params: Params }) {
  const { id } = params;

  const thread: ThreadWithRoom | null = await getThreadWithRoom(id);
  if (!thread) return notFound();

  const replies: Reply[] = await listReplies(id);

  const roomHref = thread.room?.slug ? `/room/${thread.room.slug}` : '/';
  const roomLabel = thread.room?.title ?? thread.room?.slug ?? 'Room';

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
        <Link href="/" className="hover:underline">
          Rooms
        </Link>
        {thread.room?.slug ? (
          <>
            <span aria-hidden>›</span>
            <Link href={roomHref} className="hover:underline">
              {roomLabel}
            </Link>
          </>
        ) : null}
        <span aria-hidden>›</span>
        <span className="text-foreground">{thread.title}</span>
      </div>

      <h1 className="text-2xl font-semibold">{thread.title}</h1>
      {thread.link_url ? (
        <a
          href={thread.link_url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          {thread.link_url}
        </a>
      ) : null}

      <section aria-label="Replies" className="space-y-3">
        {replies.map((r) => (
          <div key={r.id} className="rounded-xl border border-stone-200 dark:border-stone-800 p-3">
            {r.body}
          </div>
        ))}
        {replies.length === 0 && (
          <div className="text-stone-600 dark:text-stone-400">Be the first to reply.</div>
        )}
      </section>

      {/* Composer expects threadId */}
      <Composer threadId={thread.id} onSend={addReply} />
    </main>
  );
}
