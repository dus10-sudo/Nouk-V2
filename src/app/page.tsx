// src/app/page.tsx
import RoomCard from "@/components/RoomCard";
import ShareThought from "@/components/ShareThought";
import {
  IconLibrary,
  IconKitchen,
  IconTheater,
  IconGame,
  IconGarage,
  IconStudy,
} from "@/components/Icons";

export default function Page() {
  return (
    <main className="mx-auto max-w-[720px] px-4 pb-28">
      {/* Title */}
      <header className="pt-6 pb-2 text-center">
        <h1 className="font-serif text-[56px] leading-[1.02] tracking-[-0.018em]">
          Nouk
        </h1>
      </header>

      {/* Cards */}
      <section className="space-y-3 mb-24">
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
      </section>

      {/* Docked CTA (always visible) */}
      <div className="fixed left-0 right-0 bottom-0 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom,12px)] bg-gradient-to-t from-[var(--paper)] via-[var(--paper)]/95 to-transparent backdrop-blur-sm">
        <ShareThought />
      </div>
    </main>
  );
}
