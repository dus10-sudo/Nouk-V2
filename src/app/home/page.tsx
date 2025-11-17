// src/app/home/page.tsx
import Link from 'next/link';
import { supabase, Room, Thread } from '@/lib/supabase';

type HomePageProps = {
  searchParams?: { room?: string };
};

async function getData(activeSlug?: string) {
  const { data: rooms, error: roomsError } = await supabase
    .from('rooms')
    .select('id, slug, title')
    .order('title', { ascending: true });

  if (roomsError || !rooms || rooms.length === 0) {
    return { rooms: [] as Room[], activeRoom: null as Room | null, threads: [] as Thread[] };
  }

  const activeRoom =
    rooms.find((r) => r.slug === activeSlug) ??
    rooms[0];

  const { data: threads, error: threadsError } = await supabase
    .from('threads')
    .select('id, room_id, title, body, link_url, created_at')
    .eq('room_id', activeRoom.id)
    .order('created_at', { ascending: false });

  if (threadsError || !threads) {
    return { rooms, activeRoom, threads: [] as Thread[] };
  }

  return { rooms, activeRoom, threads };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const activeSlug = searchParams?.room;
  const { rooms, activeRoom, threads } = await getData(activeSlug);

  if (!activeRoom) {
    return (
      <main className="min-h-screen bg-[#f5eedf] flex items-center justify-center">
        <p className="text-center text-sm text-neutral-700 px-4">
          Nouk is almost ready, but there are no categories yet. Add a few rows
          to the <code>rooms</code> table (e.g. gaming, music, movies) in Supabase.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5eedf]">
      <div className="max-w-2xl mx-auto px-4 pb-16 pt-8">
        {/* Top title */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900 text-center">
            Inside Nouk
          </h1>
          <p className="mt-1 text-sm text-neutral-600 text-center">
            Small posts. Short conversations. Everything fades after a while.
          </p>
        </header>

        {/* Category tabs */}
        <nav className="mb-6 flex gap-2 overflow-x-auto no-scrollbar">
          {rooms.map((room) => {
            const isActive = room.id === activeRoom.id;
            return (
              <Link
                key={room.id}
                href={room.slug === rooms[0].slug ? '/home' : `/home?room=${room.slug}`}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition
                  ${
                    isActive
                      ? 'bg-neutral-900 text-[#f5eedf] border-neutral-900'
                      : 'bg-white/80 text-neutral-800 border-neutral-400 hover:bg-white'
                  }`}
              >
                {room.title}
              </Link>
            );
          })}
        </nav>

        {/* Share button */}
        <div className="mb-4 flex justify-end">
          <Link
            href={`/share?room=${activeRoom.slug}`}
            className="rounded-full bg-neutral-900 text-[#f5eedf] text-sm font-medium px-4 py-2 shadow-md hover:bg-neutral-800 transition"
          >
            Share a Thought
          </Link>
        </div>

        {/* Threads list */}
        {threads.length === 0 ? (
          <p className="text-sm text-neutral-600 text-center mt-10">
            It&apos;s quiet in <span className="font-medium">{activeRoom.title}</span>.
            Be the first to post something.
          </p>
        ) : (
          <ul className="space-y-3">
            {threads.map((thread) => (
              <li key={thread.id}>
                <Link
                  href={`/thread/${thread.id}`}
                  className="block rounded-2xl bg-white shadow-sm border border-neutral-200 px-4 py-3 hover:bg-white/90 transition"
                >
                  <h2 className="text-sm font-semibold text-neutral-900 mb-1">
                    {thread.title || '(no title)'}
                  </h2>
                  {thread.body && (
                    <p className="text-xs text-neutral-700 line-clamp-2">
                      {thread.body}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500">
                    <span>{activeRoom.title}</span>
                    <span>{new Date(thread.created_at).toLocaleString()}</span>
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
