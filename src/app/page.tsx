'use client';

import Link from 'next/link';
import React from 'react';

/* ---------- Minimal mono icons (inline SVGs) ---------- */
const Icon = {
  library: (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M4 4h3v16H4zM9 4h3v16H9zM14 4h6v2h-6zM14 8h6v2h-6zM14 12h6v2h-6zM14 16h6v2h-6z" />
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M5 9h14v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9zm3-4h8a2 2 0 0 1 2 2v1H6V7a2 2 0 0 1 2-2z" />
    </svg>
  ),
  theater: (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M3 6h18v10H3zM1 18h22v2H1z" />
    </svg>
  ),
  game: (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M7 14H5v-2h2V10h2v2h2v2H9v2H7v-2zm8.5-1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm3 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM6 7h12a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-1.5l-2-1.5h-5L7.5 18H6a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4z" />
    </svg>
  ),
  garage: (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M3 10l9-6 9 6v10a1 1 0 0 1-1 1h-4v-6H8v6H4a1 1 0 0 1-1-1V10z" />
    </svg>
  ),
  study: (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M4 4h16v2H4zM6 8h12v8H6zM4 18h16v2H4z" />
    </svg>
  ),
} as const;

type Room = {
  slug: string;
  name: string;
  description: string;
  icon: React.ReactNode;
};

const ROOMS: Room[] = [
  { slug: 'library',     name: 'Library',    description: 'Books, projects, ideas',  icon: Icon.library },
  { slug: 'kitchen',     name: 'Kitchen',    description: 'Recipes, cooking, food talk', icon: Icon.kitchen },
  { slug: 'theater',     name: 'Theater',    description: 'Movies & TV',             icon: Icon.theater },
  { slug: 'game-room',   name: 'Game Room',  description: 'Games, music & hobbies',  icon: Icon.game },
  { slug: 'garage',      name: 'Garage',     description: 'DIY, tools, builds',      icon: Icon.garage },
  { slug: 'study',       name: 'Study',      description: 'Focus, learning, planning', icon: Icon.study },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F3EFE7] text-stone-900 flex flex-col">
      {/* Header */}
      <header className="pt-9 pb-2 text-center">
        <h1 className="text-4xl font-serif tracking-tight">Nouk</h1>
      </header>

      {/* Rooms list */}
      <section className="flex-1 px-4 pb-6">
        <div className="mx-auto w-full max-w-md space-y-4">
          {ROOMS.map((r) => (
            <Link
              key={r.slug}
              href={`/room/${r.slug}`}
              className="group block rounded-2xl border border-[#E7E1D6] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-200/60 text-stone-600">
                  {r.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-[20px] leading-6">{r.name}</div>
                  <div className="text-sm text-stone-500">{r.description}</div>
                </div>
                <div className="ml-auto text-stone-300 group-hover:text-stone-400">›</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom bar */}
      <footer className="sticky bottom-0 bg-[#F3EFE7]/95 backdrop-blur-sm border-t border-[#E7E1D6]">
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <Link
            href="/compose"
            className="block w-full rounded-2xl bg-[#CF7556] text-white text-center py-3 font-medium shadow-[inset_0_2px_0_rgba(255,255,255,0.35)] hover:brightness-95 transition"
          >
            Share a thought
          </Link>
        </div>
      </footer>
    </main>
  );
}
