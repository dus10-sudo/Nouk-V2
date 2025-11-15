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
    <main className="min-h-dvh bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-6 pt-10">
        {/* Header + blurb */}
        <header className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-elevated)] shadow-[0_14px_40px_rgba(15,23,42,0.22)]">
            <span className="text-xl text-[var(--accent)]">🌱</span>
          </div>
          <h1 className="font-serif text-[32px] leading-tight tracking-[-0.04em]">
            Nouk
          </h1>
          <p className="mt-3 text-[15px] leading-snug text-[var(--muted)]">
            A small, quiet house for short-lived threads. Pick a room, start a
            Nouk, let it fade when you&apos;re done talking.
          </p>
        </header>

        {/* How Nouk feels */}
        <section className="mb-7 rounded-[24px] bg-[var(--surface)] px-5 py-4 shadow-[0_18px_55px_rgba(15,23,42,0.14)]">
          <div className="mb-2 text-center text-[11px] font-semibold tracking-[0.22em] text-[var(--muted)]">
            HOW NOUK FEELS
          </div>
          <ul className="space-y-1.5 text-[13px] leading-snug text-[var(--muted-strong)]">
            <li>• Start a tiny conversation, not a feed.</li>
            <li>• Rooms feel like corners of a cozy house.</li>
            <li>• Threads quietly expire after a short while.</li>
          </ul>
        </section>

        {/* Rooms list */}
        <section className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold tracking-[0.18em] text-[var(--muted)]">
              ROOMS
            </h2>
            <span className="rounded-full border border-[color-mix(in_srgb,var(--muted)_35%,transparent)] px-3 py-1 text-[11px] text-[var(--muted)]">
              Pick a room to begin
            </span>
          </div>

          <div className="space-y-3 pb-4">
            {ROOMS.map((room) => (
              <Link
                key={room.slug}
                href={`/room/${room.slug}`} // ✅ /room, not /r
                className="block"
              >
                <div className="group flex items-center gap-3 rounded-[24px] bg-[var(--card)] px-4 py-4 shadow-[0_12px_36px_rgba(15,23,42,0.16)] transition-transform active:scale-[0.98]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-[15px] shadow-[0_6px_20px_rgba(15,23,42,0.22)]">
                    <span>{room.icon}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[16px] font-semibold">
                      {room.name}
                    </span>
                    <span className="truncate text-[13px] text-[var(--muted)]">
                      {room.description}
                    </span>
                  </div>
                  <span className="text-[18px] text-[var(--muted)] transition-transform group-hover:translate-x-0.5">
                    ›
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Share a Thought CTA */}
        <div className="mt-4">
          <ShareThoughtButton />
        </div>
      </div>
    </main>
  );
}
