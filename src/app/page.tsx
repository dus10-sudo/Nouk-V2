// src/app/page.tsx
import Link from "next/link";

type Room = {
  slug: string;
  name: string;
  description: string;
  emoji: string;
};

const ROOMS: Room[] = [
  {
    slug: "sunroom",
    name: "Sunroom",
    description: "For light check ins, small wins, and passing thoughts.",
    emoji: "🌞",
  },
  {
    slug: "living-room",
    name: "Living Room",
    description: "For relaxed conversation, shared moments, and company.",
    emoji: "🛋️",
  },
  {
    slug: "garden",
    name: "Garden",
    description: "For intentions, tiny steps, and gentle personal growth.",
    emoji: "🌱",
  },
  {
    slug: "lantern-room",
    name: "Lantern Room",
    description: "For heavy feelings, venting, and emotional processing.",
    emoji: "🔮",
  },
  {
    slug: "observatory",
    name: "Observatory",
    description: "For late night thoughts, big questions, and wonder.",
    emoji: "🌙",
  },
  {
    slug: "library",
    name: "Library",
    description: "For journaling, prompts, and more thoughtful writing.",
    emoji: "📖",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-28 pt-10">
        {/* Tagline / intro */}
        <section className="mb-6 text-center">
          <p className="text-[15px] leading-relaxed text-[var(--muted-strong)]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </section>

        {/* Rooms list */}
        <section className="space-y-3">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/r/${room.slug}`}
              className="block rounded-[26px] bg-[var(--card)] px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.22)] transition-transform hover:-translate-y-[1px] active:translate-y-[1px]"
            >
              <div className="flex items-center gap-3">
                {/* Emoji in soft circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_10px_30px_rgba(15,23,42,0.20)]">
                  <span className="text-xl">{room.emoji}</span>
                </div>

                <div className="flex-1">
                  <div className="text-[16px] font-semibold text-[var(--ink-strong)]">
                    {room.name}
                  </div>
                  <div className="mt-[2px] text-[13px] leading-snug text-[var(--muted-strong)]">
                    {room.description}
                  </div>
                </div>

                {/* Chevron */}
                <div className="text-[16px] text-[var(--muted-strong)]">
                  ›
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
