// src/app/home/page.tsx
import Link from "next/link";
import Image from "next/image";

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
    <main className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/house-interior.jpg"
          alt="A cozy room with a fireplace, bookshelves, and armchairs."
          fill
          priority
          className="object-cover"
        />
        {/* Soft dark-to-warm overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-[#2b1408]/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 pb-28 pt-16">
        <div className="mx-auto flex h-full max-w-xl flex-col">
          {/* Header */}
          <header className="mb-6">
            <p className="text-[0.7rem] font-semibold tracking-[0.25em] text-amber-100/80 uppercase">
              Nouk
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-amber-50">
              Choose your space
            </h1>
            <p className="mt-2 text-sm text-amber-50/85">
              A quiet little house for short-lived threads. Share something
              small, let it breathe, and let it fade.
            </p>
          </header>

          {/* Room cards */}
          <div className="space-y-4 pb-6">
            {rooms.map((room) => (
              <Link
                key={room.slug}
                href={`/room/${room.slug}`}
                className="block rounded-3xl bg-[#faecd6]/96 px-5 py-4 shadow-[0_14px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
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
                  {/* Right arrow placeholder – later this is where we can swap in mini art icons */}
                  <span className="shrink-0 text-xl text-[#c1925e]">›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
