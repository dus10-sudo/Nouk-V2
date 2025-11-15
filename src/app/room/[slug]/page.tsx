// src/app/room/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

type RoomPageProps = {
  params: {
    slug: string;
  };
};

type RoomRecord = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
};

type ThreadRecord = {
  id: string;
  title: string;
  created_at: string;
  expires_at: string | null;
  last_activity: string | null;
  is_archived: boolean;
};

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; room: RoomRecord; threads: ThreadRecord[] };

function backgroundClassForSlug(slug: string): string {
  switch (slug) {
    case 'lantern-room':
      return 'bg-gradient-to-b from-[#2b1b33] via-[#35223f] to-[var(--paper)]';
    case 'observatory':
      return 'bg-gradient-to-b from-[#020617] via-[#0b1220] to-[var(--paper)]';
    case 'sunroom':
      return 'bg-gradient-to-b from-[#fff7d6] via-[#fdf1c5] to-[var(--paper)]';
    case 'garden':
      return 'bg-gradient-to-b from-[#ecfdf3] via-[#d9f7e5] to-[var(--paper)]';
    case 'library':
      return 'bg-gradient-to-b from-[#f5f2ea] via-[#f1ebdf] to-[var(--paper)]';
    case 'living-room':
    default:
      return 'bg-gradient-to-b from-[#f4ede5] via-[#efe5da] to-[var(--paper)]';
  }
}

export default function RoomPage({ params }: RoomPageProps) {
  const { slug } = params;
  const router = useRouter();

  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // 1) Room
        const { data: room, error: roomError } = await supabase
          .from('rooms')
          .select('id, slug, name, description')
          .eq('slug', slug)
          .single<RoomRecord>();

        if (roomError || !room) {
          console.error('[RoomPage] Error loading room', roomError);
          if (!cancelled) {
            setState({
              status: 'error',
              message: 'Could not find this room.',
            });
          }
          return;
        }

        // 2) Threads in this room
        const { data: threads, error: threadError } = await supabase
          .from('threads')
          .select('id, title, created_at, expires_at, last_activity, is_archived')
          .eq('room_id', room.id)
          .eq('is_archived', false)
          .order('last_activity', { ascending: false });

        if (threadError) {
          console.error('[RoomPage] Error loading threads', threadError);
        }

        if (!cancelled) {
          setState({
            status: 'ready',
            room,
            threads: (threads as ThreadRecord[]) ?? [],
          });
        }
      } catch (err) {
        console.error('[RoomPage] Unexpected error', err);
        if (!cancelled) {
          setState({
            status: 'error',
            message: 'Something went wrong loading this room.',
          });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state.status === 'loading') {
    return (
      <main
        className={`min-h-screen ${backgroundClassForSlug(
          slug
        )} flex items-center justify-center`}
      >
        <p className="text-[14px] text-[var(--muted-strong)]">
          Finding this corner of the house…
        </p>
      </main>
    );
  }

  if (state.status === 'error') {
    return (
      <main
        className={`min-h-screen ${backgroundClassForSlug(slug)}`}
      >
        <div className="mx-auto max-w-lg px-4 pb-6 pt-6">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="mb-3 text-[13px] text-[var(--muted)]"
          >
            ← Back to rooms
          </button>

          <div className="rounded-[24px] bg-[var(--card)] px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.22)]">
            <h1 className="text-[16px] font-semibold text-[var(--ink-strong)]">
              Something went wrong
            </h1>
            <p className="mt-1 text-[14px] text-[var(--muted-strong)]">
              {state.message}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const { room, threads } = state;

  return (
    <main
      className={`min-h-screen ${backgroundClassForSlug(slug)}`}
    >
      <div className="mx-auto max-w-lg px-4 pb-6 pt-6">
        {/* Header */}
        <button
          type="button"
          onClick={() => router.push('/')}
          className="mb-3 text-[13px] text-[var(--muted)]"
        >
          ← Back to rooms
        </button>

        <header className="mb-4">
          <h1 className="text-2xl font-semibold text-[var(--ink-strong)]">
            {room.name}
          </h1>
          {room.description && (
            <p className="mt-1 text-[14px] text-[var(--muted-strong)]">
              {room.description}
            </p>
          )}
        </header>

        {/* Threads list */}
        {threads.length === 0 ? (
          <p className="text-[13px] text-[var(--muted-strong)]">
            No Nouks here yet. Start one from the home screen.
          </p>
        ) : (
          <ul className="space-y-3">
            {threads.map((thread) => (
              <li key={thread.id}>
                <Link
                  href={`/t/${thread.id}`}
                  className="block rounded-[24px] bg-[var(--card)] px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.22)] active:scale-[0.99] transition-transform"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[15px] font-semibold text-[var(--ink-strong)]">
                      {thread.title}
                    </span>
                    <span className="text-[11px] text-[var(--muted)]">
                      {thread.last_activity
                        ? new Date(
                            thread.last_activity
                          ).toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: '2-digit',
                          })
                        : new Date(thread.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[12px] text-[var(--muted-strong)]">
                    Fades soon. Add a reply if it matters right now.
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
