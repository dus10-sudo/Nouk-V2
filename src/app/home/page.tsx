// src/app/home/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type Room = {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
};

type Thread = {
  id: string;
  title: string | null;
  body: string | null;
  link_url: string | null;
  created_at: string;
};

export const dynamic = 'force-dynamic';

type HomeProps = {
  searchParams?: { room?: string };
};

export default async function HomePage({ searchParams }: HomeProps) {
  const activeSlugFromUrl =
    typeof searchParams?.room === 'string'
      ? searchParams.room
      : undefined;

  // 1) Load rooms
  const { data: roomsData, error: roomsError } = await supabase
    .from('rooms')
    .select('id, slug, title')
    .eq('is_active', true)
    .order('title', { ascending: true });

  if (roomsError) {
    console.error('[home] rooms error:', roomsError);
  }

  const rooms: Room[] = roomsData ?? [];

  if (rooms.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5eedf] text-neutral-900 flex items-center justify-center px-4">
        <p className="text-center text-sm text-neutral-700 max-w-xs">
          Nouk is almost ready, but there are no categories yet. Add a few
          rows to the <code>rooms</code> table (e.g. gaming, music, movies)
          in Supabase.
        </p>
      </main>
    );
  }

  // 2) Figure out which room is active
  const fallbackRoom = rooms[0];
  const activeRoom =
    rooms.find((r) => r.slug === activeSlugFromUrl) || fallbackRoom;

  // 3) Load threads for that room
  let threads: Thread[] = [];
  if (activeRoom) {
    const nowIso = new Date().toISOString();
    const { data: threadsData, error: threadsError } = await supabase
      .from('threads')
      .select('id, title, body, link_url, created_at')
      .eq('room_id', activeRoom.id)
      .eq('is_archived', false)
      .gt('expires_at', nowIso)
      .order('last_activity', { ascending: false });

    if (threadsError) {
      console.error('[home] threads error:', threadsError);
    }

    threads = threadsData ?? [];
  }

  return (
    <main className="min-h-screen bg-[#f5eedf] text-neutral-900">
      <div className="max-w-2xl mx-auto px-4 pb-16 pt-8">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-semibold mb-1">Inside Nouk</h1>
          <p className="text-sm text-neutral-600">
            Small posts. Short conversations. Everything fades after a while.
          </p>
        </header>

        {/* Category pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {rooms.map((room) => {
            const isActive = room.id === activeRoom.id;
            return (
              <Link
                key={room.id}
                href={`/home?room=${room.slug}`}
                className={[
                  'px-4 py-2 rounded-full text-sm border transition-colors',
                  isActive
                    ? 'bg-neutral-900 text-[#f5eedf] border-neutral-900'
                    : 'bg-[#f5eedf] text-neutral-800 border-neutral-400 hover:bg-neutral-200',
                ].join(' ')}
              >
                {room.title}
              </Link>
            );
          })}
        </div>

        {/* Share button */}
        <div className="flex justify-center mb-6">
          <Link
            href={`/share?room=${activeRoom.slug}`}
            className="rounded-full bg-neutral-900 text-[#f5eedf] px-5 py-2.5 text-sm font-medium shadow-md hover:bg-black"
          >
            Share a Thought
          </Link>
        </div>

        {/* Thread list */}
        {threads.length === 0 ? (
          <p className="text-center text-sm text-neutral-600 mt-8">
            It&apos;s quiet in <span className="font-medium">{activeRoom.title}</span>.{' '}
            Be the first to post something.
          </p>
        ) : (
          <ul className="space-y-3 mt-2">
            {threads.map((thread) => (
              <li
                key={thread.id}
                className="rounded-3xl bg-white shadow-sm border border-neutral-200 px-4 py-3"
              >
                <Link href={`/thread/${thread.id}`}>
                  <div className="flex flex-col gap-1">
                    {thread.title && (
                      <h2 className="text-sm font-semibold text-neutral-900">
                        {thread.title}
                      </h2>
                    )}
                    {thread.body && (
                      <p className="text-sm text-neutral-700 line-clamp-3">
                        {thread.body}
                      </p>
                    )}
                    {thread.link_url && (
                      <p className="text-xs text-neutral-500 mt-1">
                        Link: {thread.link_url}
                      </p>
                    )}
                    <p className="text-xs text-neutral-400 mt-1">
                      {new Date(thread.created_at).toLocaleString()}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
