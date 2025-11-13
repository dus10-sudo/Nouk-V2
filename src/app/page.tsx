// src/app/page.tsx

import RoomCard from "@/components/RoomCard";
import ShareThought from "@/components/ShareThought";
import Logo from "@/components/Logo";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 pb-28">
      {/* Top logo / wordmark */}
      <header className="pt-6 pb-6 flex justify-center">
        <Logo />
      </header>

      {/* Room cards */}
      <section className="space-y-3 mb-24">
        <RoomCard
          href="/room/library"
          title="Library"
          subtitle="Books, projects, ideas"
          icon="library"
        />
        <RoomCard
          href="/room/kitchen"
          title="Kitchen"
          subtitle="Recipes, cooking, food talk"
          icon="kitchen"
        />
        <RoomCard
          href="/room/theater"
          title="Theater"
          subtitle="Movies & TV"
          icon="theater"
        />
        <RoomCard
          href="/room/game-room"
          title="Game Room"
          subtitle="Games, music & hobbies"
          icon="game"
        />
        <RoomCard
          href="/room/garage"
          title="Garage"
          subtitle="DIY, tools, builds"
          icon="garage"
        />
        <RoomCard
          href="/room/study"
          title="Study"
          subtitle="Focus, learning, planning"
          icon="study"
        />
      </section>

      {/* Docked CTA */}
      <div className="fixed left-0 right-0 bottom-0 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom,12px)] bg-gradient-to-t from-[var(--paper)] via-[var(--paper)]/95 to-transparent backdrop-blur-sm">
        <div className="w-full max-w-[680px]">
          <ShareThought />
        </div>
      </div>
    </main>
  );
}
