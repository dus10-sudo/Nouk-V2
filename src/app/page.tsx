import RoomCard from "@/components/RoomCard";
import { IconSprout } from "@/components/Logo";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 pb-24">

      {/* Sprout Icon */}
      <div className="flex justify-center pt-10 pb-3">
        <IconSprout className="h-7 w-7 text-[var(--accent)]" />
      </div>

      {/* Title */}
      <h1 className="text-center font-serif text-[48px] tracking-tight text-[var(--text)] pb-8">
        Nouk
      </h1>

      {/* Rooms */}
      <div className="space-y-4">
        <RoomCard
          href="/room/library"
          icon="library"
          title="Library"
          subtitle="Books, projects, ideas"
        />
        <RoomCard
          href="/room/kitchen"
          icon="kitchen"
          title="Kitchen"
          subtitle="Recipes, cooking, food talk"
        />
        <RoomCard
          href="/room/theater"
          icon="theater"
          title="Theater"
          subtitle="Movies & TV"
        />
        <RoomCard
          href="/room/game-room"
          icon="game"
          title="Game Room"
          subtitle="Games, music & hobbies"
        />
        <RoomCard
          href="/room/garage"
          icon="garage"
          title="Garage"
          subtitle="DIY, tools, builds"
        />
        <RoomCard
          href="/room/study"
          icon="study"
          title="Study"
          subtitle="Focus, learning, planning"
        />
      </div>

      {/* Share Button */}
      <div className="fixed bottom-6 left-0 right-0 px-6">
        <a
          href="/share"
          className="
            block w-full text-center 
            py-4 rounded-full 
            bg-[var(--accent)] 
            text-white font-medium
            text-lg shadow-md
            active:scale-95 transition
          "
        >
          Share a Thought
        </a>
      </div>
    </main>
  );
}
