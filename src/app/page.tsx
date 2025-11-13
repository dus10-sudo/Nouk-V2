"use client";

import RoomCard from "@/components/RoomCard";
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
  const rooms = [
    {
      href: "/room/library",
      icon: "library",
      title: "Library",
      subtitle: "Books, projects, ideas",
    },
    {
      href: "/room/kitchen",
      icon: "kitchen",
      title: "Kitchen",
      subtitle: "Recipes, cooking, food talk",
    },
    {
      href: "/room/theater",
      icon: "theater",
      title: "Theater",
      subtitle: "Movies & TV",
    },
    {
      href: "/room/game-room",
      icon: "game",
      title: "Game Room",
      subtitle: "Games, music & hobbies",
    },
    {
      href: "/room/garage",
      icon: "garage",
      title: "Garage",
      subtitle: "DIY, tools, builds",
    },
    {
      href: "/room/study",
      icon: "study",
      title: "Study",
      subtitle: "Focus, learning, planning",
    },
  ];

  return (
    <main className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] px-5 pb-28">

      {/* Soft Top Glow */}
      <div className="absolute left-0 right-0 top-0 h-48 bg-gradient-to-b from-[rgba(0,0,0,0.06)] to-transparent pointer-events-none"></div>

      {/* Sprout Icon */}
      <div className="w-full flex justify-center mt-6 mb-2">
        <IconSprout className="h-10 w-10 text-[var(--accent)] stroke-[2.2]" />
      </div>

      {/* Nouk Title */}
      <h1 className="text-center text-5xl font-semibold tracking-wide mb-8 text-[var(--title)]">
        Nouk
      </h1>

      {/* Rooms List */}
      <div className="flex flex-col gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.href}
            href={room.href}
            icon={room.icon}       // STRING, not a function → FIXES build errors
            title={room.title}
            subtitle={room.subtitle}
          />
        ))}
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-4 left-4 right-4">
        <button className="w-full rounded-full bg-[var(--accent)] py-4 text-white text-lg font-medium shadow-md active:scale-[0.98] transition">
          Share a Thought
        </button>
      </div>
    </main>
  );
}
