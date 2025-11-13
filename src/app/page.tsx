// src/app/page.tsx
import Link from "next/link";

type Room = { slug: string; title: string; subtitle: string; icon: "books"|"pot"|"ticket"|"gamepad"|"toolbox"|"desk" };

const ROOMS: Room[] = [
  { slug: "library",   title: "Library",   subtitle: "Books, projects, ideas",   icon: "books" },
  { slug: "kitchen",   title: "Kitchen",   subtitle: "Recipes, cooking, food talk", icon: "pot" },
  { slug: "theater",   title: "Theater",   subtitle: "Movies & TV",               icon: "ticket" },
  { slug: "game-room", title: "Game Room", subtitle: "Games, music & hobbies",    icon: "gamepad" },
  { slug: "garage",    title: "Garage",    subtitle: "DIY, tools, builds",        icon: "toolbox" },
  { slug: "study",     title: "Study",     subtitle: "Focus, learning, planning", icon: "desk" },
];

export default function HomePage() {
  return (
    <main className="paper-wrap">
      <h1 className="paper-title">Nouk</h1>

      <div className="paper-stack">
        {ROOMS.map((r) => (
          <Link key={r.slug} href={`/room/${r.slug}`} className="paper-card">
            <div className="flex items-center gap-3">
              <span className="paper-chip">
                <span
                  className={[
                    "icon",
                    r.icon === "books" ? "icon-mask-books" :
                    r.icon === "pot" ? "icon-mask-pot" :
                    r.icon === "ticket" ? "icon-mask-ticket" :
                    r.icon === "gamepad" ? "icon-mask-gamepad" :
                    r.icon === "toolbox" ? "icon-mask-toolbox" :
                    "icon-mask-desk"
                  ].join(" ")}
                />
              </span>

              <div className="grow">
                <div className="paper-card-title">{r.title}</div>
                <div className="paper-card-sub">{r.subtitle}</div>
              </div>

              <span className="paper-chevron">›</span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ height: 24 }} />

      {/* Link instead of onClick to avoid server/client handler errors */}
      <Link href="/compose" className="paper-cta">Share a Thought</Link>
    </main>
  );
}
