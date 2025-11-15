// src/app/page.tsx
import Link from "next/link";
import ShareThoughtButton from "@/components/ShareThought";

const ROOMS = [
  {
    slug: "library",
    name: "Library",
    description: "Books, projects, ideas",
    icon: "▤",
  },
  {
    slug: "lounge",
    name: "Lounge",
    description: "Soft check-ins, daily life",
    icon: "▤",
  },
  {
    slug: "studio",
    name: "Studio",
    description: "Creative work & drafts",
    icon: "▤",
  },
  {
    slug: "theater",
    name: "Theater",
    description: "Movies, shows, deep dives",
    icon: "▢",
  },
  {
    slug: "game-room",
    name: "Game Room",
    description: "Games, streams, silly stuff",
    icon: "▢",
  },
  {
    slug: "cafe",
    name: "Café",
    description: "Open table, anything goes",
    icon: "▤",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--canvas)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-10 sm:max-w-lg">
        {/* Hero: sprout + title + tagline */}
        <header className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,255,255,0.85)] shadow-soft">
            <span className="text-2xl text-[var(--accent)] animate-pulse">🌱</span>
          </div>
          <h1 className="font-serif text-[32px] leading-tight tracking-[-0.05em]">
            Nouk
          </h1>
          <p className="mt-3 max-w-xs text-[14px] leading-snug text-[var(--ink-soft)]">
            A cozy space for short-lived threads. Share a small thought, then let
            it fade.
          </p>
        </header>

        {/* Spacer between hero and rooms */}
        <div className="h-10" />

        {/* Rooms section */}
        <section className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Rooms
            </h2>
          </div>

          <div className="space-y-3">
            {ROOMS.map((room) => (
              <Link key={room.slug} href={`/room/${room.slug}`} className="block">
                <div className="group flex items-center gap-3 rounded-[26px] bg-[var(--card)] px-4 py-4 shadow-soft transition-transform duration-150 ease-out hover:-translate-y-[2px] hover:shadow-soft-lg active:translate-y-[1px]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(0,0,0,0.04)] text-[14px] text-[var(--muted)]">
                    {room.icon}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[15px] font-semibold text-[var(--ink)]">
                      {room.name}
                    </span>
                    <span className="truncate text-[13px] text-[var(--muted)]">
                      {room.description}
                    </span>
                  </div>
                  <span className="text-[18px] text-[var(--muted)] transition-transform duration-150 group-hover:translate-x-[2px]">
                    ›
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Spacer so button feels anchored, not cramped */}
        <div className="h-6" />

        {/* Share a Thought CTA */}
        <section className="mt-auto">
          <ShareThoughtButton />
        </section>
      </div>
    </main>
  );
}
