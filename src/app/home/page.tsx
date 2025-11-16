// src/app/home/page.tsx
import Link from "next/link";

const rooms = [
  {
    slug: "sunroom",
    name: "Sunroom",
    description: "For light check-ins, small wins, and passing thoughts.",
  },
  {
    slug: "living-room",
    name: "Living Room",
    description: "For relaxed conversation, shared moments, and company.",
  },
  {
    slug: "garden",
    name: "Garden",
    description: "For intentions, tiny steps, and gentle personal growth.",
  },
  {
    slug: "lantern-room",
    name: "Lantern Room",
    description: "For heavy feelings, venting, and emotional processing.",
  },
  {
    slug: "observatory",
    name: "Observatory",
    description: "For late night thoughts, big questions, and wonder.",
  },
  {
    slug: "library",
    name: "Library",
    description: "For journaling, prompts, and more thoughtful writing.",
  },
];

export default function HomeInside() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f6e2c8] to-[#e2c29c] px-4 pb-28 pt-16">
      <div className="mx-auto max-w-xl">
        <header className="mb-8">
          <h1 className="text-sm font-semibold tracking-[0.25em] text-[#6a4a32] uppercase">
            Nouk
          </h1>
          <p className="mt-3 text-xl font-semibold text-[#3d2b20]">
            Choose your space
          </p>
          <p className="mt-2 text-sm text-[#7a5a40]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </header>

        <div className="space-y-4">
          {rooms.map((room) => (
            <Link
              key={room.slug}
              href={`/room/${room.slug}`}
              className="block rounded-3xl bg-[#faecd6]/95 px-5 py-4 shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition hover:translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-[#3d2b20]">
                    {room.name}
                  </div>
                  <p className="mt-1 text-sm text-[#7a5a40]">
                    {room.description}
                  </p>
                </div>
                <span className="shrink-0 text-xl text-[#c1925e]">›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
