'use client';

import Link from 'next/link';
import React from 'react';

/* --------- Monochrome inline icons (taupe) --------- */
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

/* --------- Room data (order + labels like mock) --------- */
const ROOMS = [
  { slug: 'library',    name: 'Library',    desc: 'Books, projects, ideas',       icon: Icons.library },
  { slug: 'kitchen',    name: 'Kitchen',    desc: 'Recipes, cooking, food talk',  icon: Icons.kitchen },
  { slug: 'theater',    name: 'Theater',    desc: 'Movies & TV',                  icon: Icons.theater },
  { slug: 'game-room',  name: 'Game Room',  desc: 'Games, music & hobbies',       icon: Icons.gamepad },
  { slug: 'garage',     name: 'Garage',     desc: 'DIY, tools, builds',           icon: Icons.toolbox },
  { slug: 'study',      name: 'Study',      desc: 'Focus, learning, planning',    icon: Icons.desk },
] as const;

/* --------- Palette (numbers chosen to match the mock) --------- */
const PAPER = '#F2EDE4';     // page background
const CARD  = '#FAF7F1';     // card tint
const EDGE  = '#E8E1D6';     // borders
const CHIP  = '#EAE3D7';     // icon chip
const TAUPE = '#6F675D';     // mono icon/text accent
const CLAY  = '#C97856';     // CTA

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: PAPER, color: '#1f2937' }}>
      {/* Header */}
      <header className="pt-10 pb-3 text-center">
        <h1 className="text-[40px] leading-none font-serif tracking-tight text-stone-800">Nouk</h1>
      </header>

      {/* Rooms */}
      <section className="flex-1 px-4 pb-6">
        <div className="mx-auto w-full max-w-md space-y-4">
          {ROOMS.map((r) => (
            <Link
              key={r.slug}
              href={`/room/${r.slug}`}
              className="group block rounded-[20px] border shadow-sm transition-shadow"
              style={{ backgroundColor: CARD, borderColor: EDGE }}
            >
              <div className="flex items-center gap-3 px-4 py-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl text-[0px]"
                  style={{ backgroundColor: CHIP, color: TAUPE }}
                  aria-hidden
                >
                  <span className="text-[0]">{/* prevent baseline shift */}</span>
                  {r.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-[22px] leading-6 text-stone-900">{r.name}</div>
                  <div className="text-sm text-stone-500">{r.desc}</div>
                </div>
                <div className="ml-auto text-stone-300 group-hover:text-stone-400 select-none">›</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <footer
        className="sticky bottom-0 border-t"
        style={{ backgroundColor: PAPER, borderColor: EDGE }}
      >
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <Link
            href="/compose"
            className="block w-full text-center font-medium text-white rounded-[22px] py-3 shadow-[inset_0_2px_0_rgba(255,255,255,0.35)] hover:brightness-95 transition"
            style={{ backgroundColor: CLAY }}
          >
            Share a Thought
          </Link>
        </div>
      </footer>
    </main>
  );
}
