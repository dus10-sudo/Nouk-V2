// src/app/room/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewThreadButton from '@/components/NewThreadButton';
import ThreadCard from '@/components/ThreadCard';
import { getRoomBySlug, listThreadsForRoom } from '@/lib/supabase';

type Params = { params: { slug: string } };

export const dynamic = 'force-dynamic'; // ensure fresh data from Supabase

export default async function RoomPage({ params }: Params) {
  const slug = params.slug;

  // 1) Load room by slug
  const room = await getRoomBySlug(slug);
  if (!room) return notFound();

  // 2) Load threads in this room (by slug)
  const threads = await listThreadsForRoom(slug);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      {/* Top nav / breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">Rooms</Link>
        <span aria-hidden>›</span>
        <span className="text-foreground">{room.name ?? slug}</span>
      </div>

      {/* Room header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          {room.name ?? 'Room'}
        </h1>
        {room.description ? (
          <p className="mt-1 text-sm text-muted-foreground">{room.description}</p>
        ) : null}
      </header>

      {/* New thread action */}
      <div className="mb-6">
        <NewThreadButton roomSlug={slug} />
      </div>

      {/* Threads list */}
      <section aria-label="Threads">
        {threads && threads.length > 0 ? (
          <ul className="space-y-3">
            {threads.map((t: any) => (
              <li key={t.id}>
                <ThreadCard threadId={t.id} thread={t} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No threads yet. Be the first to start one.
          </div>
        )}
      </section>
    </main>
  );
}
