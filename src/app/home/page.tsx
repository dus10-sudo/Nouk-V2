// src/app/home/page.tsx
import Image from "next/image";
import Link from "next/link";

const rooms = [
  {
    slug: "sunroom",
    title: "Sunroom",
    description: "For light check-ins, small wins, and passing thoughts.",
  },
  {
    slug: "living-room",
    title: "Living Room",
    description:
      "For relaxed conversation, shared moments, and company.",
  },
  {
    slug: "garden",
    title: "Garden",
    description:
      "For intentions, tiny steps, and gentle personal growth.",
  },
  {
    slug: "lantern-room",
    title: "Lantern Room",
    description:
      "For heavy feelings, venting, and emotional processing.",
  },
  {
    slug: "observatory",
    title: "Observatory",
    description:
      "For late-night thoughts, big questions, and wonder.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-[#fdf3e3]">
      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/house-interior.jpg" // <--- make sure this matches the file in /public
          alt="A cozy room with a fireplace, bookshelves, and armchairs."
          fill
          priority
          className="object-cover"
        />
        {/* lighter overlay so the art is visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 pb-32 pt-20">
          <div className="space-y-2">
            <div className="text-xs tracking-[0.3em] text-amber-200/80">
              N O U K
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#fdf3e3]">
              Choose your space
            </h1>
            <p className="text-sm leading-relaxed text-[#fbe9cf]">
              A quiet little house for short-lived threads. Share something
              small, let it breathe, and let it fade.
            </p>
          </div>

          <div className="space-y-4">
            {rooms.map((room) => (
              <Link
                key={room.slug}
                href={`/room/${room.slug}`}
                className="block rounded-3xl bg-[#f9eedf]/92 px-5 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-[#4b2f21]">
                      {room.title}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#6a4a35]">
                      {room.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-lg text-[#c28b4b]">
                    &#8250;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
