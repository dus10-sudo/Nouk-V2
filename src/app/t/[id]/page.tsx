// src/app/t/[id]/page.tsx
import Link from 'next/link';
import { addReply } from '@/lib/actions';
import { getThreadWithRoom, listReplies } from '@/lib/queries';
import Composer from '@/components/Composer';

type Props = { params: { id: string } };

export default async function ThreadPage({ params: { id } }: Props) {
  const thread = await getThreadWithRoom(id);
  if (!thread) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-stone-600 dark:text-stone-400">Thread not found.</p>
      </main>
    );
  }

  const replies = await listReplies(id);
  const roomHref = thread.room.slug ? ({ pathname: `/room/${thread.room.slug}` } as const) : ({ pathname: '/' } as const);
  const roomLabel = thread.room.name || thread.room.slug || 'Room';

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-stone-600 dark:text-stone-400">
        <Link href="/" className="hover:underline">Rooms</Link>
        {thread.room.slug ? (
          <>
            <span aria-hidden> › </span>
            <Link href={roomHref} className="hover:underline">{roomLabel}</Link>
          </>
        ) : null}
        <span aria-hidden> › </span>
        <span className="text-foreground">{thread.title}</span>
      </div>

      <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">{thread.title}</h1>

      <section className="space-y-3">
        {replies.map((r) => (
          <article key={r.id} className="rounded-xl border border-stone-200 dark:border-stone-700 p-4">
            <div className="text-stone-900 dark:text-stone-100 whitespace-pre-wrap">{r.body}</div>
            <div className="mt-2 text-xs text-stone-500">
              {new Date(r.created_at).toLocaleString()}
            </div>
          </article>
        ))}
        {replies.length === 0 && (
          <p className="text-stone-600 dark:text-stone-400">Be the first to reply.</p>
        )}
      </section>

      <Composer
        action={async (text: string) => {
          'use server';
          await addReply(id, text);
        }}
      />
    </main>
  );
}
