// src/app/page.tsx
import Link from 'next/link';
import ShareThoughtButton from '@/components/ShareThought';

type RoomCard = {
  slug: string;
  name: string;
  description: string;
};

const ROOM_CARDS: RoomCard[] = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'Light, everyday check-ins and passing thoughts.',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    description: 'Cozy conversation and shared moments with others.',
  },
  {
    slug: 'garden',
    name: 'Garden',
    description: 'Gentle growth, intentions, and small steps forward.',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    description: 'Heavier feelings and emotional processing in a safe glow.',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description: 'Late-night thoughts, wonder, and abstract ideas.',
  },
  {
    slug: 'library',
    name: 'Library',
    description: 'Quiet prompts, journaling, and thoughtful writing.',
  },
];

function roomIcon(slug: string) {
  switch (slug) {
    case 'sunroom':
      return '🌤️';
    case 'living-room':
      return '🛋️';
    case 'garden':
      return '🌿';
    case 'lantern-room':
      return '🔮';
    case 'observatory':
      return '🌙';
    case 'library':
      return '📖';
    default:
      return '📎';
  }
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-6 pt-10">
        {/* Header */}
        <header className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-[var(--badge)] p-4 shadow-soft-lg">
            <span className="text-3xl">🌱</span>
          </div>
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Nouk</h1>
          <p className="text-sm leading-relaxed text-[var(--muted-strong)]">
            A cozy space for short-lived threads. Say something small, let it
            breathe, then let it fade.
          </p>
        </header>

        {/* Rooms list */}
        <section className="flex-1 space-y-3">
          {ROOM_CARDS.map((room) => (
            <Link key={room.slug} href={`/room/${room.slug}`} className="block">
              <article className="flex items-center justify-between rounded-[24px] bg-[var(--card)] px-4 py-3 shadow-soft-lg transition-transform active:scale-[0.99]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] shadow-inner-soft">
                    <span className="text-xl">{roomIcon(room.slug)}</span>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[var(--ink)]">
                      {room.name}
                    </h2>
                    <p className="text-xs text-[var(--muted-strong)]">
                      {room.description}
                    </p>
                  </div>
                </div>
                <span className="text-[var(--muted)]">›</span>
              </article>
            </Link>
          ))}
        </section>

        {/* CTA */}
        <footer className="mt-5">
          <ShareThoughtButton compact />
        </footer>
      </div>
    </main>
  );
}
