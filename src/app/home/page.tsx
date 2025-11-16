'use client';

import Link from 'next/link';

type Room = {
  slug: string;
  name: string;
  description: string;
};

const ROOMS: Room[] = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'For light check-ins, small wins, and passing thoughts.',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    description: 'For relaxed conversation, shared moments, and company.',
  },
  {
    slug: 'garden',
    name: 'Garden',
    description: 'For intentions, tiny steps, and gentle personal growth.',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    description: 'For heavy feelings, venting, and emotional processing.',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description: 'For late-night thoughts, big questions, and wonder.',
  },
  {
    slug: 'library',
    name: 'Library',
    description: 'For thoughtful writing and quiet reflection.',
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-amber-50">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/house-interior.jpg')" }}
        />
        {/* Soft dark overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col px-4 pb-28 pt-16">
        {/* Header */}
        <header className="mb-8">
          <div className="text-xs tracking-[0.3em] text-amber-200/80">
            N O U K
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-amber-50">
            Choose your space
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-amber-100/90">
            A quiet little house for short-lived threads. Share something small,
            let it breathe, and let it fade.
          </p>
        </header>

        {/* Rooms */}
        <div className="space-y-4">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/room/${room.slug}`}
              className="group block rounded-3xl bg-amber-50/95 px-5 py-4 shadow-[0_14px_35px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-amber-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-[#3b2614]">
                    {room.name}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-[#62452a]">
                    {room.description}
                  </p>
                </div>
                <span className="mt-1 text-lg text-[#c47a2c] group-hover:translate-x-0.5 transition-transform">
                  ›
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
