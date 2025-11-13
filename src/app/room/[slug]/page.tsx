// src/app/room/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getRoomBySlug, listThreadsForRoom } from '@/lib/supabase';
import ThreadCard from '@/components/ThreadCard';
import NewThreadButton from '@/components/NewThreadButton';

type Props = { params: { slug: string } };

export default async function RoomPage({ params }: Props) {
  const room = await getRoomBySlug(params.slug);
  if (!room) return notFound();

  // ✅ Pass the slug (string), not the Room object
  const threads = await listThreadsForRoom(room.slug);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{room.name}</h1>
          <p className="text-sm text-muted-foreground">{room.description}</p>
        </div>
        <NewThreadButton roomSlug={room.slug} />
      </header>

      {threads.length === 0 ? (
        <p className="text-sm text-muted-foreground">No threads yet. Be the first to post.</p>
      ) : (
        <ul className="space-y-3">
          {threads.map((t) => (
            <li key={t.id}>
              <ThreadCard thread={t} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
