// src/app/room/[slug]/page.tsx
import Link from 'next/link';
import { getRoomBySlug, listThreadsForRoom } from '@/lib/queries';
import NewThreadButton from '@/components/NewThreadButton';
import ThreadCard from '@/components/ThreadCard';

type Props = { params: { slug: string } };

export default async function RoomPage({ params: { slug } }: Props) {
  const room = await getRoomBySlug(slug);
  if (!room) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-stone-600 dark:text-stone-400">Room not found.</p>
      </main>
    );
  }

  const threads = await listThreadsForRoom(room.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-stone-600 dark:text-stone-400">
        <Link href="/" className="hover:underline">Rooms</Link>
        <span aria-hidden> › </span>
        <span className="text-foreground">{room.name ?? slug}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">{room.name}</h1>
          {room.description && (
            <p className="text-stone-600 dark:text-stone-400">{room.description}</p>
          )}
        </div>
        <NewThreadButton roomSlug={slug} />
      </div>

      {/* Threads */}
      <ul className="space-y-3">
        {threads.map((t) => (
          <li key={t.id}>
            <ThreadCard threadId={t.id} title={t.title} lastActivity={t.last_activity} posts={t.posts_count ?? 0} />
          </li>
        ))}
      </ul>

      {threads.length === 0 && (
        <p className="text-stone-600 dark:text-stone-400">No threads yet. Be the first to start one.</p>
      )}
    </main>
  );
}
