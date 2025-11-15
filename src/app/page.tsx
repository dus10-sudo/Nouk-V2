// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

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

const ROOM_ICON_MAP: Record<string, string> = {
  'sunroom': '🌞',
  'living-room': '🛋️',
  'garden': '🌱',
  'lantern-room': '🔮',
  'observatory': '🌙',
  'library': '📖',
};

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

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* bottom nav adds extra height, so pad bottom */}
      <div className="mx-auto flex min-h-screen max-w-lg flex-col px-4 pt-6 pb-28">
        {/* Tagline */}
        <section className="mb-6 text-center">
          <p className="mx-auto max-w-md text-[15px] leading-relaxed text-[var(--muted-strong)]">
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
              {rooms.map((room) => {
                const icon = ROOM_ICON_MAP[room.slug] ?? '🌱';
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => router.push(`/rooms/${room.slug}`)}
                    className="flex w-full items-center justify-between rounded-[24px] bg-[var(--card)] px-4 py-4 text-left shadow-[0_16px_40px_rgba(15,23,42,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_10px_25px_rgba(15,23,42,0.3)]">
                        <span aria-hidden className="text-[22px]">
                          {icon}
                        </span>
                      </div>
                      <div>
                        <div className="mb-1 text-[16px] font-semibold text-[var(--ink)]">
                          {room.name}
                        </div>
                        <div className="text-[14px] leading-snug text-[var(--muted-strong)]">
                          {room.description}
                        </div>
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="ml-3 text-[20px] text-[var(--muted-strong)]"
                    >
                      ›
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
