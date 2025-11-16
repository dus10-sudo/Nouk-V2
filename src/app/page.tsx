// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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

const ROOM_EMOJI: Record<string, string> = {
  'sunroom': '🌞',
  'living-room': '🛋️',
  'garden': '🌱',
  'lantern-room': '🔮',
  'observatory': '🌙',
  'library': '📖',
};

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadRooms() {
      const { data, error } = await supabase
        .from('rooms')
        .select('id, slug, name, description');

      if (error) {
        console.error('[Home] Error loading rooms', error);
        return;
      }
      if (!data || cancelled) return;

      const ordered = [...data].sort((a, b) => {
        const ia = ROOM_SLUG_ORDER.indexOf(a.slug as any);
        const ib = ROOM_SLUG_ORDER.indexOf(b.slug as any);
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
      });

      setRooms(ordered);
    }

    loadRooms();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pt-10 pb-28">
        {/* Top header wordmark */}
        <header className="mb-6">
          <div className="text-[13px] font-semibold tracking-[0.18em] text-[var(--muted-strong)]">
            NOUK
          </div>
        </header>

        {/* Intro copy */}
        <section className="mb-6">
          <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </section>

        {/* Room list */}
        <section className="flex-1 space-y-3">
          {rooms.map((room) => {
            const emoji = ROOM_EMOJI[room.slug] ?? '💬';

            return (
              <Link
                key={room.id}
                href={`/rooms/${room.slug}`}
                className="
                  block
                  rounded-[26px]
                  bg-[var(--card)]
                  px-4 py-3.5
                  shadow-[0_18px_55px_rgba(15,23,42,0.28)]
                  transition-transform
                  active:scale-[0.99]
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-11 w-11 shrink-0 items-center justify-center
                      rounded-full
                      bg-[var(--surface)]
                      shadow-[0_10px_30px_rgba(15,23,42,0.28)]
                    "
                  >
                    <span className="text-[22px] leading-none">
                      {emoji}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="text-[15px] font-semibold text-[var(--ink)]">
                      {room.name}
                    </div>
                    <div className="text-[13px] leading-snug text-[var(--muted-strong)]">
                      {room.description}
                    </div>
                  </div>

                  <div className="text-[18px] text-[var(--muted)]">›</div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
