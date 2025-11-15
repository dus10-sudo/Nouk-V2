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
    icon: '☀️',
    description: 'For light check ins, small wins, and passing thoughts.',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    icon: '🛋️',
    description: 'For relaxed conversation, shared moments, and company.',
  },
  {
    slug: 'garden',
    name: 'Garden',
    icon: '🌱',
    description: 'For intentions, tiny steps, and gentle personal growth.',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    icon: '🔮',
    description: 'For heavy feelings, venting, and emotional processing.',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    icon: '🌙',
    description: 'For late night thoughts, big questions, and wonder.',
  },
  {
    slug: 'library',
    name: 'Library',
    icon: '📖',
    description: 'For journaling, prompts, and more thoughtful writing.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--paper)]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-8 pt-8">
        {/* Header */}
        <header className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
            <span className="text-3xl" aria-hidden="true">
              🌱
            </span>
          </div>

          <h1 className="mb-2 text-[28px] font-semibold tracking-tight text-[var(--ink)]">
            Nouk
          </h1>

          <p className="max-w-xs text-[14px] leading-relaxed text-[var(--muted-strong)]">
            A quiet little house for short-lived threads. Share something small,
            let it breathe, and let it fade.
          </p>
        </header>

        {/* Rooms */}
        <section className="flex-1">
          <div className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-[var(--muted)]">
            ROOMS
          </div>

          <div className="space-y-3">
            {ROOMS.map((room) => (
              <Link
                key={room.slug}
                href={`/r/${room.slug}`}
                className="block rounded-[26px] bg-[var(--card)] shadow-[0_18px_45px_rgba(15,23,42,0.22)] transition-transform active:scale-[0.98]"
              >
                <div className="flex min-h-[80px] items-center gap-3 px-4 py-3">
                  {/* Icon circle */}
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_10px_25px_rgba(15,23,42,0.18)]">
                    <span className="text-xl" aria-hidden="true">
                      {room.icon}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex flex-1 flex-col">
                    <div className="text-[15px] font-semibold text-[var(--ink)]">
                      {room.name}
                    </div>
                    <div className="mt-0.5 text-[13px] leading-snug text-[var(--muted-strong)]">
                      {room.description}
                    </div>
                  </div>

                  {/* Chevron */}
                  <div
                    className="ml-2 text-[var(--muted)]"
                    aria-hidden="true"
                  >
                    ›
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA – in normal flow so it never covers a card */}
        <section className="mt-6">
          <ShareThoughtButton />
        </section>
      </div>
    </main>
  );
}
