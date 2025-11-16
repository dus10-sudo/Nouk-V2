// src/app/home/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';
import ShareThoughtButton from '@/components/ShareThought';
import { aliasFromToken } from '@/lib/aliases';

type ThreadRow = {
  id: string;
  title: string;
  link_url: string | null;
  created_at: string;
  user_token: string | null;
  room_id: string | null;
};

type RoomRow = {
  id: string;
  name: string;
  slug: string | null;
};

type ThreadWithRoom = ThreadRow & {
  room?: RoomRow | null;
};

function formatTimeAgo(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const sec = Math.floor(diffMs / 1000);
  if (sec < 30) return 'just now';
  if (sec < 60) return `${sec}s ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;

  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs}h ago`;

  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function HomeInsidePage() {
  const [threads, setThreads] = useState<ThreadWithRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        // 1) Get latest threads
        const { data: rawThreads, error: threadsError } = await supabase
          .from('threads')
          .select('id, title, link_url, created_at, user_token, room_id')
          .order('created_at', { ascending: false })
          .limit(40);

        if (threadsError) {
          console.error('[home] error loading threads', threadsError);
          throw threadsError;
        }

        const threadsData = (rawThreads ?? []) as ThreadRow[];

        if (threadsData.length === 0) {
          if (!cancelled) {
            setThreads([]);
            setLoading(false);
          }
          return;
        }

        // 2) Fetch the rooms those threads belong to
        const roomIds = Array.from(
          new Set(
            threadsData
              .map((t) => t.room_id)
              .filter((x): x is string => !!x)
          )
        );

        let roomsById = new Map<string, RoomRow>();

        if (roomIds.length > 0) {
          const { data: rooms, error: roomsError } = await supabase
            .from('rooms')
            .select('id, name, slug')
            .in('id', roomIds);

          if (roomsError) {
            console.error('[home] error loading rooms', roomsError);
            // We can still show threads without room labels
          } else if (rooms) {
            for (const r of rooms as RoomRow[]) {
              roomsById.set(r.id, r);
            }
          }
        }

        const withRooms: ThreadWithRoom[] = threadsData.map((t) => ({
          ...t,
          room: t.room_id ? roomsById.get(t.room_id) ?? null : null,
        }));

        if (!cancelled) {
          setThreads(withRooms);
          setLoading(false);
        }
      } catch (err) {
        console.error('[home] unexpected error', err);
        if (!cancelled) {
          setError('Something went wrong loading the house.');
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-4 pt-4">
        {/* Header: cozy interior illustration */}
        <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.45)]">
          {/* Background image */}
          <div className="absolute inset-0 bg-[url('/house-interior.jpg')] bg-cover bg-center" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,16,24,0.86)] via-[rgba(10,16,24,0.55)] to-[rgba(10,16,24,0.08)]" />

          {/* Content */}
          <div className="relative z-10 flex h-48 flex-col justify-end p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(248,250,252,0.7)]">
              Inside Nouk
            </div>
            <h1 className="mt-1 text-2xl font-semibold text-[var(--paper)]">
              The Hearth
            </h1>
            <p className="mt-1 max-w-xs text-[13px] leading-snug text-[rgba(248,250,252,0.8)]">
              Take a breath. See what&apos;s on people&apos;s minds tonight.
            </p>
          </div>
        </div>

        {/* Share button + intro */}
        <section className="mt-4">
          <p className="text-[13px] leading-snug text-[var(--muted-strong)]">
            Welcome in. You can read quietly, or{' '}
            <span className="font-semibold">share what&apos;s on your mind</span>.
          </p>

          <div className="mt-3">
            <ShareThoughtButton />
          </div>
        </section>

        {/* Feed */}
        <section className="mt-4 flex-1 pb-3">
          {loading && (
            <div className="space-y-2">
              <div className="h-20 animate-pulse rounded-2xl bg-[color-mix(in_srgb,var(--surface)_70%,#ffffff)]" />
              <div className="h-20 animate-pulse rounded-2xl bg-[color-mix(in_srgb,var(--surface)_70%,#ffffff)]" />
              <div className="h-20 animate-pulse rounded-2xl bg-[color-mix(in_srgb,var(--surface)_70%,#ffffff)]" />
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-[13px] text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && threads.length === 0 && (
            <div className="mt-4 rounded-2xl bg-[var(--card)] px-4 py-4 text-[13px] text-[var(--muted-strong)]">
              It&apos;s quiet right now. Be the first to light something here.
            </div>
          )}

          {!loading && !error && threads.length > 0 && (
            <ul className="mt-2 space-y-3">
              {threads.map((thread) => {
                const alias = thread.user_token
                  ? aliasFromToken(thread.user_token)
                  : 'Cozy Guest';

                const roomName = thread.room?.name ?? 'Somewhere in the house';

                const createdLabel = formatTimeAgo(thread.created_at);

                const hasLink = !!thread.link_url;

                return (
                  <li key={thread.id}>
                    <Link
                      href={`/t/${thread.id}`}
                      className="block rounded-2xl border border-[color-mix(in_srgb,var(--muted)_26%,transparent)] bg-[var(--card)] px-4 py-3 shadow-[0_14px_35px_rgba(15,23,42,0.18)] active:scale-[0.99] transition-transform"
                    >
                      <div className="flex items-start gap-3">
                        {/* Simple aura dot */}
                        <div className="mt-1 h-7 w-7 flex-shrink-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(253,224,171,1),rgba(248,250,252,0.3))] shadow-[0_0_0_1px_rgba(148,124,74,0.25)]" />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="truncate text-[13px] font-semibold text-[var(--ink)]">
                              {thread.title || 'Untitled Nouk'}
                            </div>
                            <div className="flex-shrink-0 text-[11px] text-[var(--muted)]">
                              {createdLabel}
                            </div>
                          </div>

                          <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--muted)]">
                            <span className="truncate">
                              {alias} · {roomName}
                            </span>
                            {hasLink && (
                              <span className="flex-shrink-0 rounded-full bg-black/5 px-2 py-[2px] text-[10px] uppercase tracking-[0.14em]">
                                Link
                              </span>
                            )}
                          </div>

                          {hasLink && (
                            <div className="mt-1 truncate text-[12px] text-[var(--muted-strong)]">
                              {thread.link_url}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
/* Hide bottom nav on the hearth page */
body.hiding-nav .bottom-nav {
  display: none !important;
}
