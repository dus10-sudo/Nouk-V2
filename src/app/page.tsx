// src/app/page.tsx

import Link from 'next/link';
import ShareThoughtButton from '@/components/ShareThought';

type RoomDef = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

const ROOMS: RoomDef[] = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'Light, everyday check-ins and passing thoughts.',
    icon: '☀️',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    description: 'Cozy conversation and shared moments with others.',
    icon: '🛋️',
  },
  {
    slug: 'garden',
    name: 'Garden',
    description: 'Gentle growth, intentions, and small steps forward.',
    icon: '🌱',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    description:
      'Heavier feelings and emotional processing in a soft glow.',
    icon: '🔮',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description: 'Late-night thoughts, wonder, and abstract ideas.',
    icon: '🌙',
  },
  {
    slug: 'library',
    name: 'Library',
    description: 'Quiet prompts, journaling, and thoughtful writing.',
    icon: '📖',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Main content */}
      <main className="mx-auto flex min-h-screen max-w-xl flex-col px-4 pb-32 pt-10">
        {/* Logo + title */}
        <header className="mb-6 flex flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_18px_55px_rgba(15,23,42,0.35)]">
            {/* sprout icon – already animated via your global styles */}
            <span className="text-3xl">🌱</span>
          </div>
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-[var(--ink-strong)]">
            Nouk
          </h1>
          <p className="max-w-md text-[15px] leading-snug text-[var(--muted-strong)]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </header>

        {/* Rooms list */}
        <section className="space-y-3">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/r/${room.slug}`}
              className="group block rounded-[26px] bg-[var(--card)] px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.22)] transition-transform duration-150 hover:-translate-y-[2px]"
            >
              <div className="flex items-center gap-3">
                {/* icon pill */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_10px_25px_rgba(15,23,42,0.18)]">
                  <span className="text-xl">{room.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-[15px] font-semibold text-[var(--ink-strong)]">
                      {room.name}
                    </h2>
                    <span className="text-[18px] text-[var(--muted)]">
                      ›
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-[var(--muted-strong)]">
                    {room.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>

      {/* Sticky bottom CTA bar */}
      <div
        className="
          fixed
          inset-x-0
          bottom-0
          z-20
          bg-gradient-to-t
          from-[rgba(245,238,225,0.98)]
          to-[rgba(245,238,225,0)]
          px-4
          pb-[max(env(safe-area-inset-bottom),16px)]
          pt-2
        "
      >
        <div className="mx-auto max-w-xl">
          <ShareThoughtButton />
        </div>
      </div>
    </div>
  );
}
