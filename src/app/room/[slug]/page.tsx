// src/app/room/[slug]/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  getRoomBySlug,
  listThreads,
  type Room,
  type Thread,
} from '@/lib/supabase';

function isExpired(thread: Thread): boolean {
  const expires = (thread as any).expires_at as string | null | undefined;
  const is_archived = (thread as any).is_archived as boolean | undefined;

  if (is_archived) return true;
  if (!expires) return false;

  return new Date(expires) < new Date();
}

function isFadingSoon(thread: Thread): boolean {
  const expires = (thread as any).expires_at as string | null | undefined;
  if (!expires) return false;

  const diffMs = new Date(expires).getTime() - Date.now();
  const threeHoursMs = 3 * 60 * 60 * 1000;
  return diffMs > 0 && diffMs <= threeHoursMs;
}

export default function RoomPage() {
  const { slug } = useParams<{ slug: string }>();

  const [room, setRoom] = useState<Room | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  // Load room + threads
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const r = await getRoomBySlug(slug);
        if (!alive) return;
        setRoom(r);

        if (r) {
          const list = await listThreads(r.id);
          if (!alive) return;
          setThreads(list);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug]);

  const visibleThreads = useMemo(() => {
    const active = threads.filter((t) => !isExpired(t));

    // Sort by last_activity desc (fall back to created_at)
    return active.slice().sort((a, b) => {
      const aLast = (a as any).last_activity ?? a.created_at;
      const bLast = (b as any).last_activity ?? b.created_at;
      return new Date(bLast).getTime() - new Date(aLast).getTime();
    });
  }, [threads]);

  const crumbs = room ? `Rooms › ${room.title ?? room.slug}` : 'Rooms';

  return (
    <main className="mx-auto max-w-[720px] px-4 pb-20">
      {/* Breadcrumb */}
      <div className="pt-5 pb-1 text-[14px] text-[var(--muted)]">{crumbs}</div>

      {/* Header */}
      <header className="mb-2 flex items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-[40px] leading-[1.05] tracking-[-0.01em]">
            {room?.title ?? '…'}
          </h1>
          <p className="text-[16px] text-[var(--muted)]">
            {room?.description ?? ''}
          </p>
        </div>
        {/* intentionally no "New Thread" button here */}
      </header>

      {/* Content */}
      {loading ? (
        <div className="mt-10 text-[var(--muted)]">Loading…</div>
      ) : visibleThreads.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[var(--ring)] bg-[var(--card)] p-6 text-[var(--muted)] shadow-[var(--soft)]">
          It’s quiet in here. Start a Nouk for this room from the home screen’s{' '}
          <span className="font-medium">Start a Nouk</span> button.
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {visibleThreads.map((t) => {
            const fadingSoon = isFadingSoon(t);
            const postsCount = (t as any).posts_count as number | undefined;

            return (
              <li key={t.id}>
                <Link
                  href={`/t/${t.id}`}
                  className="block rounded-2xl border border-[var(--ring)] bg-[var(--card)] p-4 shadow-[var(--shadow)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate text-[18px] font-medium leading-tight">
                          {t.title}
                        </h2>
                        {fadingSoon && (
                          <span className="shrink-0 rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/5 px-2 py-[2px] text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--accent)]">
                            fading soon
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-[13px] text-[var(--muted)]">
                        {(postsCount ?? 0)}{' '}
                        {postsCount === 1 ? 'reply' : 'replies'} · updated{' '}
                        {new Date(
                          ((t as any).last_activity as string) ?? t.created_at
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-1 shrink-0 text-[18px] opacity-40">
                      ›
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
