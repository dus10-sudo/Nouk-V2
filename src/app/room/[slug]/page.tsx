// src/app/room/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRoomBySlug, listThreads, type Room, type Thread } from '@/lib/supabase';
import ThreadCard from '@/components/ThreadCard';
import NewThreadButton from '@/components/NewThreadButton';

type Params = { slug: string };

export default async function RoomPage({ params }: { params: Params }) {
  const { slug } = params;
  const room: Room | null = await getRoomBySlug(slug);
  if (!room) return notFound();

  const threads: Thread[] = await listThreads(room.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
        <Link href="/" className="hover:underline">
          Rooms
        </Link>
        <span aria-hidden>›</span>
        <span className="text-foreground">{room.title ?? slug}</span>
      </div>

      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{room.title}</h1>
        <NewThreadButton roomSlug={slug} />
      </header>

      <ul className="space-y-3">
        {threads.map((t) => (
          <li key={t.id}>
            <ThreadCard thread={t} />
          </li>
        ))}
        {threads.length === 0 && (
          <li className="text-stone-600 dark:text-stone-400">No threads yet.</li>
        )}
      </ul>
    </main>
  );
}
