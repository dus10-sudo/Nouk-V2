'use client';

import Link from 'next/link';
import React from 'react';

/* --------- Mono inline icons (don’t change) --------- */
const glyph = (d: string) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
    <path fill="currentColor" d={d} />
  </svg>
);

const Icons = {
  library: glyph('M4 4h2v16H4zm4 0h2v16H8zm4 0h8v2h-8zm0 4h8v2h-8zm0 4h8v2h-8zm0 4h8v2h-8z'),
  kitchen: glyph('M6 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1H6V7zm-1 3h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9z'),
  theater: glyph('M3 6h18v10H3zM1 18h22v2H1z'),
  gamepad: glyph('M7 14H5v-2h2V10h2v2h2v2H9v2H7v-2zm8.5-1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm3 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM6 7h12a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-1.5l-2-1.5h-5L7.5 18H6a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4z'),
  toolbox: glyph('M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8zm4-3h8a2 2 0 0 1 2 2v1H6V7a2 2 0 0 1 2-2zm3 7h2v2h-2z'),
  desk: glyph('M4 10h16v2H4zm3 3h2v5H7zm8 0h2v5h-2zM6 6h12v2H6z'),
};

/* --------- Rooms (order/labels like mock) --------- */
const ROOMS = [
  { slug: 'library',    name: 'Library',    desc: 'Books, projects, ideas',       icon: Icons.library },
  { slug: 'kitchen',    name: 'Kitchen',    desc: 'Recipes, cooking, food talk',  icon: Icons.kitchen },
  { slug: 'theater',    name: 'Theater',    desc: 'Movies & TV',                  icon: Icons.theater },
  { slug: 'game-room',  name: 'Game Room',  desc: 'Games, music & hobbies',       icon: Icons.gamepad },
  { slug: 'garage',     name: 'Garage',     desc: 'DIY, tools, builds',           icon: Icons.toolbox },
  { slug: 'study',      name: 'Study',      desc: 'Focus, learning, planning',    icon: Icons.desk },
] as const;

/* --------- Color tokens tuned to the mock --------- */
/* (warmer parchment, lighter cards, softer chip, taupe icons, clay CTA) */
const PAPER = '#F4EFE6';
const CARD  = '#FBF6EE';
const EDGE  = '#E9E1D6';
const CHIP  = '#EDE5D9';
const TAUPE = '#6C645B';
const CLAY  = '#C97A57';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: PAPER, color: '#1f2937' }}>
      {/* Header */}
      <header className="pt-9 pb-1 text-center">
        <h1 className="text-[40px] leading-none font-serif tracking-tight text-stone-800">Nouk</h1>
      </header>

      {/* Rooms */}
      <section className="flex-1 px-4 pb-4">
        {/* tighter vertical rhythm: space-y-3, not 4 */}
        <div className="mx-auto w-full max-w-md space-y-3">
          {ROOMS.map((r) => (
            <Link
              key={r.slug}
              href={`/room/${r.slug}`}
              /* slightly smaller radius, lighter shadow */
              className="group block rounded-[18px] border shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-shadow"
              style={{ backgroundColor: CARD, borderColor: EDGE }}
            >
              {/* tighter padding: py-3.5 not py-4; smaller chip 36px, softer radius */}
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: CHIP, color: TAUPE }}
                  aria-hidden
                >
                  {r.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-[22px] leading-6 text-stone-900">{r.name}</div>
                  <div className="text-[13.5px] text-stone-500">{r.desc}</div>
                </div>
                <div className="ml-auto text-stone-300 group-hover:text-stone-400 select-none">›</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA (height/rounded matches mock more closely) */}
      <footer
        className="sticky bottom-0 border-t"
        style={{ backgroundColor: PAPER, borderColor: EDGE }}
      >
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <Link
            href="/compose"
            className="block w-full text-center font-medium text-white rounded-[20px] py-3 shadow-[inset_0_2px_0_rgba(255,255,255,0.35)] hover:brightness-95 transition"
            style={{ backgroundColor: CLAY }}
          >
            Share a Thought
          </Link>
        </div>
      </footer>
    </main>
  );
}
