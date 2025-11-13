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
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-28 pt-10">
        {/* Top logo + title */}
        <header className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--badge)] shadow-soft">
            {/* placeholder sprout for now; we can swap to SVG later */}
            <span className="text-2xl">🌱</span>
          </div>
          <h1 className="font-serif text-[40px] leading-[1.05] tracking-[-0.03em]">
            Nouk
          </h1>
        </header>

        {/* Soft intro card */}
        <section className="mb-6 rounded-[28px] bg-card-soft px-5 py-4 shadow-soft border border-[var(--stroke)]">
          <p className="text-[14px] leading-snug text-muted">
            Soft, temporary conversations. Start something small, see who joins,
            and let it fade when the day is done.
          </p>
        </section>

        {/* Rooms list */}
        <section className="space-y-3">
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
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center bg-gradient-to-t from-[var(--paper)] via-[var(--paper)]/95 to-transparent pb-[env(safe-area-inset-bottom,16px)] pt-4">
          <div className="pointer-events-auto w-full max-w-[720px] px-4">
            <ShareThought />
          </div>
        </div>
      </div>
    </main>
  );
}
