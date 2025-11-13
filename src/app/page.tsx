// src/app/page.tsx
"use client";

import Link from "next/link";
import {
  IconLibrary,
  IconKitchen,
  IconTheater,
  IconGame,
  IconGarage,
  IconStudy,
  IconSprout,
} from "@/components/Icons";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 pb-24">

      {/* -----------------------------
           Header with sprout + logo
         ----------------------------- */}
      <header className="pt-12 pb-6 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--chip)] shadow-[var(--soft)]">
          <IconSprout className="h-10 w-10 text-[var(--accent)]" />
        </div>

        <h1 className="font-serif text-[48px] leading-[1.05] tracking-[-0.03em]">
          Nouk
        </h1>
      </header>

      {/* -----------------------------
           Room List
         ----------------------------- */}
      <div className="space-y-4 mt-4">
        <RoomCard
          href="/room/library"
          Icon={IconLibrary}
          title="Library"
          subtitle="Books, projects, ideas"
        />
        <RoomCard
          href="/room/kitchen"
          Icon={IconKitchen}
          title="Kitchen"
          subtitle="Recipes, cooking, food talk"
        />
        <RoomCard
          href="/room/theater"
          Icon={IconTheater}
          title="Theater"
          subtitle="Movies & TV"
        />
        <RoomCard
          href="/room/game-room"
          Icon={IconGame}
          title="Game Room"
          subtitle="Games, music & hobbies"
        />
        <RoomCard
          href="/room/garage"
          Icon={IconGarage}
          title="Garage"
          subtitle="DIY, tools, builds"
        />
        <RoomCard
          href="/room/study"
          Icon={IconStudy}
          title="Study"
          subtitle="Focus, learning, planning"
        />
      </div>

      {/* -----------------------------
           Share a Thought
         ----------------------------- */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4">
        <Link
          href="/share"
          className="w-full max-w-[700px] rounded-full bg-[var(--accent)] py-4 text-center font-medium text-white shadow-[var(--shadow)]"
        >
          Share a Thought
        </Link>
      </div>
    </main>
  );
}

/* ----------------------------------------------
   Room Card Component (inline for easy copy/paste)
   ---------------------------------------------- */
function RoomCard({
  href,
  title,
  subtitle,
  Icon,
}: {
  href: string;
  title: string;
  subtitle: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-3xl bg-[var(--card)]
                 border border-[var(--ring)] shadow-[var(--soft)] px-5 py-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--chip)]">
          <Icon className="h-7 w-7 text-[var(--icon)]" />
        </div>

        <div>
          <div className="font-medium text-[18px]">{title}</div>
          <div className="text-[14px] text-[var(--muted)]">{subtitle}</div>
        </div>
      </div>

      <span className="text-[var(--muted)] text-xl">›</span>
    </Link>
  );
}
