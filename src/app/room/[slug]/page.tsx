// src/app/room/[slug]/page.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  getRoomBySlug,
  listThreads,
  createThread,
  type Room,
  type Thread,
} from '@/lib/supabase';

export default function RoomPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const search = useSearchParams();

  const pendingCreate = useRef(false);
  const titleQP = search.get('title')?.trim() ?? '';
  const linkQP = search.get('link')?.trim() ?? '';

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
          const t = await listThreads(r.id);
          if (!alive) return;
          setThreads(t);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug]);

  // If we came from Share modal with ?title/link, auto-create then redirect
  useEffect(() => {
    if (!room) return;

    const hasCreateParams = titleQP.length > 0 || linkQP.length > 0;
    if (!hasCreateParams || pendingCreate.current) return;

    pendingCreate.current = true;

    (async () => {
      try {
        const id = await createThread(room.slug, titleQP, linkQP || null);

        // Clean URL and go to new thread
        const clean = new URL(window.location.href);
        clean.searchParams.delete('title');
        clean.searchParams.delete('link');

        router.replace(`/t/${id}`); // 👈 IMPORTANT: use /t, not /thread
      } catch (err) {
        console.error('Error auto-creating thread', err);
        // If creation fails, just remove QPs so we don't loop
        const clean = new URL(window.location.href);
        clean.searchParams.delete('title');
        clean.searchParams.delete('link');
        router.replace(clean.pathname);
        pendingCreate.current = false;
      }
    })();
  }, [room, titleQP, linkQP, router]);

  // header crumbs text
  const crumbs = useMemo(
    () => (room ? `Rooms › ${room.title ?? room.slug}` : 'Rooms'),
    [room]
  );

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
      </header>

      {/* Threads */}
      {loading ? (
        <div className="mt-10 text-[var(--muted)]">Loading…</div>
      ) : threads.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[var(--ring)] bg-[var(--card)] p-6 text-[var(--muted)] shadow-[var(--soft)]">
          It&apos;s quiet in here.
          <br />
          No Nouks yet in this room. Start one from the home screen&apos;s{' '}
          <span className="font-medium">Share a Thought</span> button and it
          will appear here as a little stem.
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {threads.map((t) => (
            <li key={t.id}>
              <Link
                href={`/t/${t.id}`}
                className="block rounded-2xl border border-[var(--ring)] bg-[var(--card)] p-4 shadow-[var(--shadow)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-[18px] leading-tight">
                      {t.title}
                    </div>
                    <div className="text-[13px] text-[var(--muted)] mt-1">
                      {t.posts_count ?? 0}{' '}
                      {t.posts_count === 1 ? 'post' : 'posts'}
                      {' · '}
                      updated{' '}
                      {new Date(t.last_activity).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="opacity-40">›</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
