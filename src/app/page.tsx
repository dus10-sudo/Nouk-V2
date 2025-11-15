// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import ShareThoughtButton from '@/components/ShareThought';

type Room = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

const ROOM_SLUG_ORDER = [
  'sunroom',
  'living-room',
  'garden',
  'lantern-room',
  'observatory',
  'library',
] as const;

export default function HomePage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadRooms() {
      setLoading(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('id, slug, name, description');

      if (error) {
        console.error('[Home] Error loading rooms', error);
        setLoading(false);
        return;
      }
      if (!data || cancelled) {
        setLoading(false);
        return;
      }

      const ordered = [...data].sort((a, b) => {
        const ia = ROOM_SLUG_ORDER.indexOf(a.slug as any);
        const ib = ROOM_SLUG_ORDER.indexOf(b.slug as any);
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
      });

      setRooms(ordered);
      setLoading(false);
    }

    loadRooms();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleLogoClick() {
    // For now: scroll to top smoothly.
    // Later we can repurpose this for Notebook / global nav.
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col px-4 pb-6 pt-3">
        {/* Top header bar */}
        <header className="mb-4 flex items-center justify-between">
          <div className="text-[13px] font-semibold tracking-[0.18em] text-[var(--muted-strong)]">
            NOUK
          </div>
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_6px_18px_rgba(15,23,42,0.35)] active:scale-[0.96] transition-transform"
          >
            <span aria-hidden className="text-[18px]">
              🌱
            </span>
          </button>
        </header>

        {/* Hero / tagline */}
        <section className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_18px_55px_rgba(15,23,42,0.45)]">
            <span aria-hidden className="text-3xl">
              🌱
            </span>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-[var(--muted-strong)]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </section>

        {/* Rooms list */}
        <section className="flex-1">
          {loading ? (
            <div className="rounded-[24px] bg-[var(--card)] px-4 py-4 text-[14px] text-[var(--muted-strong)] shadow-[0_16px_40px_rgba(15,23,42,0.35)]">
              Loading rooms…
            </div>
          ) : (
            <div className="space-y-3">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => router.push(`/rooms/${room.slug}`)}
                  className="flex w-full items-center justify-between rounded-[24px] bg-[var(--card)] px-4 py-4 text-left shadow-[0_16px_40px_rgba(15,23,42,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <div>
                    <div className="mb-1 text-[16px] font-semibold text-[var(--ink)]">
                      {room.name}
                    </div>
                    <div className="text-[14px] leading-snug text-[var(--muted-strong)]">
                      {room.description}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="ml-3 text-[20px] text-[var(--muted-strong)]"
                  >
                    ›
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Share button at the very bottom (not fixed) */}
        <div className="mt-5">
          <ShareThoughtButton />
        </div>
      </div>
    </main>
  );
}
