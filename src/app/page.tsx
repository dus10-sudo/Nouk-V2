'use client';

import Link from 'next/link';
import ShareThoughtButton from '@/components/ShareThought';

type Room = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

const ROOMS: Room[] = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'For light check ins, small wins, and passing thoughts.',
    icon: '☀️',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    description: 'For relaxed conversation, shared moments, and company.',
    icon: '🛋️',
  },
  {
    slug: 'garden',
    name: 'Garden',
    description: 'For intentions, tiny steps, and gentle personal growth.',
    icon: '🌱',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    description: 'For heavy feelings, venting, and emotional processing.',
    icon: '🔮',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description: 'For late night thoughts, big questions, and wonder.',
    icon: '🌙',
  },
  {
    slug: 'library',
    name: 'Library',
    description: 'For journaling, prompts, and more thoughtful writing.',
    icon: '📖',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Scrollable content area */}
      <main className="mx-auto flex max-w-xl flex-col px-4 pt-10 pb-28">
        {/* Logo + title */}
        <header className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_18px_45px_rgba(15,23,42,0.25)]">
            <span className="text-3xl">🌱</span>
          </div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[var(--ink-strong)]">
            Nouk
          </h1>
          <p className="mt-2 max-w-sm text-[14px] leading-snug text-[var(--muted-strong)]">
            A quiet little house for short-lived threads. Share something small,
            let it breathe, and let it fade.
          </p>

          {/* Screen-reader–only section label for accessibility */}
          <h2 className="sr-only">Rooms</h2>
        </header>

        {/* Room cards */}
        <section className="space-y-3">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/r/${room.slug}`}
              className="block rounded-[26px] bg-[var(--card)] shadow-[0_14px_40px_rgba(15,23,42,0.18)]"
            >
              <div className="flex items-center gap-3 px-4 py-3.5">
                {/* Icon pill */}
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_10px_25px_rgba(15,23,42,0.18)] text-xl">
                  <span aria-hidden="true">{room.icon}</span>
                </div>

                {/* Title + description */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[16px] font-semibold text-[var(--ink-strong)]">
                      {room.name}
                    </span>
                    <span
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-[var(--muted)]"
                      aria-hidden="true"
                    >
                      ❯
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-[var(--muted-strong)]">
                    {room.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>

      {/* Docked CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center pb-6">
        <div className="pointer-events-auto w-full max-w-xl px-4">
          <ShareThoughtButton />
        </div>
      </div>
    </div>
  );
}
