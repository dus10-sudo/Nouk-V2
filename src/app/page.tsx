// src/app/page.tsx
import Link from "next/link";
import ShareThoughtButton from "@/components/ShareThought";
import { getRooms } from "@/lib/rooms";

// Order that rooms appear on the homepage
const ROOM_SLUG_ORDER = [
  "sunroom",
  "living-room",
  "garden",
  "lantern-room",
  "observatory",
  "library",
];

type DbRoom = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  is_active?: boolean | null;
};

const ROOM_META: Record<
  string,
  { label: string; tagline: string; emoji: string }
> = {
  "sunroom": {
    label: "Sunroom",
    emoji: "☀️",
    tagline: "Light, everyday check-ins and passing thoughts.",
  },
  "living-room": {
    label: "Living Room",
    emoji: "🛋️",
    tagline: "Cozy conversation and shared moments with others.",
  },
  "garden": {
    label: "Garden",
    emoji: "🌿",
    tagline: "Gentle growth, intentions, and small steps forward.",
  },
  "lantern-room": {
    label: "Lantern Room",
    emoji: "🔮",
    tagline: "Heavier feelings and emotional processing in a soft way.",
  },
  "observatory": {
    label: "Observatory",
    emoji: "🌙",
    tagline: "Late-night thoughts, wonder, and abstract ideas.",
  },
  "library": {
    label: "Library",
    emoji: "📖",
    tagline: "Quiet prompts, journaling, and thoughtful writing.",
  },
};

export default async function HomePage() {
  const dbRooms: DbRoom[] = await getRooms();

  const rooms = dbRooms
    .filter((r) => r.is_active ?? true)
    .sort((a, b) => {
      const ia = ROOM_SLUG_ORDER.indexOf(a.slug);
      const ib = ROOM_SLUG_ORDER.indexOf(b.slug);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    })
    .map((room) => {
      const meta = ROOM_META[room.slug];
      return {
        ...room,
        label: meta?.label ?? room.name,
        emoji: meta?.emoji ?? "📎",
        tagline: meta?.tagline ?? room.description ?? "",
      };
    });

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-4 pb-5 pt-6">
        {/* Hero */}
        <header className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--card)] shadow-[0_18px_40px_rgba(15,23,42,0.35)]">
            <span className="text-2xl">🌱</span>
          </div>
          <h1 className="text-[30px] font-semibold tracking-tight text-[var(--ink-strong)]">
            Nouk
          </h1>
          <p className="mt-2 max-w-sm text-[14px] leading-snug text-[var(--muted-strong)]">
            A cozy space for short-lived threads. Say something small, let it
            breathe, then let it fade.
          </p>
        </header>

        {/* Rooms list */}
        <section className="mt-4 flex-1">
          <div className="space-y-3">
            {rooms.map((room) => (
              <Link
                key={room.id}
                href={`/room/${room.slug}?title=${encodeURIComponent(
                  room.label,
                )}`}
                className="block rounded-[26px] bg-[var(--card)] px-4 py-3 shadow-soft-lg transition-transform hover:-translate-y-[1px] hover:shadow-soft-xl active:translate-y-[0px]"
              >
                <div className="flex items-center gap-3">
                  {/* Icon chip */}
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_8px_20px_rgba(15,23,42,0.18)] text-xl">
                    {room.emoji}
                  </div>

                  {/* Text */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-[15px] font-semibold text-[var(--ink-strong)]">
                        {room.label}
                      </h2>
                      <span className="text-[18px] text-[var(--muted)]">
                        &rsaquo;
                      </span>
                    </div>
                    <p className="mt-[2px] text-[13px] leading-snug text-[var(--muted-strong)]">
                      {room.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA dock */}
        <div className="mt-4">
          <ShareThoughtButton compact />
        </div>
      </div>
    </main>
  );
}
