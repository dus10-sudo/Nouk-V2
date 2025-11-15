// src/app/page.tsx

import Link from 'next/link';
import ShareThoughtButton from '@/components/ShareThought';

const ROOMS = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'For light check ins, small wins, and passing thoughts.',
    icon: '🌞',
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
    description:
      'For heavy feelings, venting, and emotional processing.',
    icon: '🔮',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description:
      'For late night thoughts, big questions, and wonder.',
    icon: '🌙',
  },
  {
    slug: 'library',
    name: 'Library',
    description:
      'For journaling, prompts, and more thoughtful writing.',
    icon: '📖',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto flex max-w-xl flex-col gap-6 px-5 pb-10 pt-8 sm:pt-10">
        {/* Header */}
        <header className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--logo-bg)] shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
            <span className="text-2xl" aria-hidden="true">
              🌱
            </span>
            <span className="sr-only">Nouk</span>
          </div>

          <p className="max-w-[22rem] text-[15px] leading-snug text-[var(--muted-strong)]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </header>

        {/* Rooms list */}
        <section aria-label="Rooms" className="space-y-3">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/r/${room.slug}`}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] rounded-[26px]"
            >
              <div className="flex items-center gap-3 rounded-[26px] bg-[var(--card)] px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.20)]">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_10px_25px_rgba(15,23,42,0.20)] text-[22px]"
                  aria-hidden="true"
                >
                  {room.icon}
                </div>

                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-[var(--ink-strong)]">
                    {room.name}
                  </div>
                  <div className="text-[13px] leading-snug text-[var(--muted-strong)]">
                    {room.description}
                  </div>
                </div>

                <span
                  className="ml-2 text-[18px] text-[var(--muted)]"
                  aria-hidden="true"
                >
                  ›
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* Share button at the bottom (not fixed, won’t cover Library) */}
        <div className="mt-4 mb-2">
          <ShareThoughtButton />
        </div>
      </div>
    </main>
  );
}
