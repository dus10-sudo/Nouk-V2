// src/app/page.tsx
import Link from "next/link";
import ShareThoughtButton from "@/components/ShareThought";

const ROOMS = [
  {
    slug: "sunroom",
    icon: "🌤️",
    name: "Sunroom",
    description: "Light, everyday check-ins and passing thoughts.",
  },
  {
    slug: "living-room",
    icon: "🛋️",
    name: "Living Room",
    description: "Cozy conversation and shared moments with others.",
  },
  {
    slug: "garden",
    icon: "🌿",
    name: "Garden",
    description: "Gentle growth, intentions, and small steps forward.",
  },
  {
    slug: "lantern-room",
    icon: "🔮",
    name: "Lantern Room",
    description: "Heavier feelings and emotional processing in a safe space.",
  },
  {
    slug: "observatory",
    icon: "🌙",
    name: "Observatory",
    description: "Late-night thoughts, wonder, and abstract ideas.",
  },
  {
    slug: "library",
    icon: "📖",
    name: "Library",
    description: "Quiet prompts, journaling, and thoughtful writing.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--canvas)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-4 pt-5 sm:max-w-lg">
        {/* Hero */}
        <header className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] shadow-soft">
            <span className="text-xl text-[var(--accent)] animate-pulse">🌱</span>
          </div>

          <h1 className="font-serif text-[28px] leading-tight tracking-[-0.05em]">
            Nouk
          </h1>

          <p className="mt-2 max-w-xs text-[13px] leading-snug text-[var(--ink-soft)]">
            A cozy space for short-lived threads. Say something small, let it
            breathe, then let it fade.
          </p>
        </header>

        <div className="h-4" />

        {/* Rooms */}
        <section className="flex-1">
          <div className="space-y-2">
            {ROOMS.map((room) => (
              <Link key={room.slug} href={`/room/${room.slug}`} className="block">
                <div className="group flex items-center gap-3 rounded-[20px] bg-[var(--card)] px-4 py-3 shadow-soft transition-transform duration-150 hover:-translate-y-[2px] hover:shadow-soft-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(0,0,0,0.04)] text-[17px]">
                    <span>{room.icon}</span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[15px] font-semibold text-[var(--ink)]">
                      {room.name}
                    </span>
                    <span className="truncate text-[13px] text-[var(--muted)]">
                      {room.description}
                    </span>
                  </div>

                  <span className="text-[18px] text-[var(--muted)] transition-transform group-hover:translate-x-[2px]">
                    ›
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Tighter CTA */}
        <section className="mt-3">
          <ShareThoughtButton compact />
        </section>
      </div>
    </main>
  );
}
