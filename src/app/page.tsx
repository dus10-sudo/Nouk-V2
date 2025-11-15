// src/app/page.tsx
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
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Content column */}
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-4 pb-[calc(env(safe-area-inset-bottom)+15rem)] pt-10">
        {/* Header */}
        <header className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#fefce8,#fef9c3_40%,#fde68a_75%)] shadow-[0_22px_45px_rgba(15,23,42,0.35)]">
            <span className="text-4xl">🌱</span>
          </div>
          <h1 className="text-[32px] font-semibold tracking-tight text-[var(--ink-strong)]">
            Nouk
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--muted-strong)]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </header>

        {/* Rooms list */}
        <section className="mt-10 space-y-3">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/r/${room.slug}`}
              className="block rounded-[26px] bg-[var(--card)] px-4 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.28)] transition-transform duration-150 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                {/* Icon pill */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#ffffff,#fef3c7)] shadow-[0_10px_25px_rgba(15,23,42,0.18)]">
                  <span className="text-2xl" aria-hidden="true">
                    {room.icon}
                  </span>
                </div>

                {/* Text block */}
                <div className="flex-1">
                  <h2 className="text-[16px] font-semibold text-[var(--ink-strong)]">
                    {room.name}
                  </h2>
                  <p className="mt-1 text-[14px] leading-snug text-[var(--muted-strong)]">
                    {room.description}
                  </p>
                </div>

                {/* Chevron */}
                <div
                  className="ml-2 text-[20px] text-[var(--muted)]"
                  aria-hidden="true"
                >
                  ›
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>

      {/* Docked CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
        <div className="pointer-events-auto w-full max-w-xl px-4">
          <ShareThoughtButton />
        </div>
      </div>
    </main>
  );
}
