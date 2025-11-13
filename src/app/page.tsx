// src/app/page.tsx
import Link from "next/link";

type Room = {
  slug: string;
  name: string;
  desc: string;
  icon: string; // emoji
};

const ROOMS: Room[] = [
  { slug: "living",  name: "Living Room",  desc: "General chat, low stress",        icon: "🛋️" },
  { slug: "kitchen", name: "Kitchen",      desc: "Recipes, cooking, food talk",     icon: "🍳" },
  { slug: "cinema",  name: "Cinema",       desc: "Movies & TV",                      icon: "🎬" },
  { slug: "library", name: "Library",      desc: "Books, projects, ideas",          icon: "📚" },
  { slug: "games",   name: "Game Room",    desc: "Games, music & hobbies",          icon: "🎮" },
  { slug: "lounge",  name: "Lounge",       desc: "Sports & socializing",            icon: "🥤" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3efe7] text-stone-900 antialiased">
      <div className="mx-auto max-w-lg px-4 pt-6 pb-[6.5rem] sm:pt-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-center font-serif text-3xl sm:text-4xl tracking-tight">
            Nouk
          </h1>
        </header>

        <ul className="space-y-3 sm:space-y-4">
          {ROOMS.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/room/${r.slug}`}
                className="group block rounded-2xl border border-stone-200/70 bg-white/70 backdrop-blur-[2px] px-4 py-4 shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/40"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none select-none">{r.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-serif text-xl">{r.name}</div>
                    <div className="truncate text-sm text-stone-600">{r.desc}</div>
                  </div>
                  <span
                    aria-hidden
                    className="ml-2 text-stone-400 transition-transform group-hover:translate-x-0.5"
                  >
                    ›
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom sticky action bar (no client handler; just a Link) */}
      <div className="fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#f3efe7] to-[rgba(243,239,231,0.6)] pt-2">
        <div className="mx-auto max-w-lg px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="rounded-2xl border border-stone-300/70 bg-white/80 backdrop-blur px-3 py-2">
            <Link
              href="/t/new"
              className="block w-full rounded-xl bg-[#e57f5d] px-4 py-3 text-center font-medium text-white shadow hover:opacity-95 active:opacity-90"
            >
              Share a thought
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
