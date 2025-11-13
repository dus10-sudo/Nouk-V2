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
    <main className="mx-auto flex min-h-screen max-w-[720px] flex-col px-4 pb-28">
      {/* Title */}
      <header className="pt-8 pb-4 text-center">
        <h1 className="font-serif text-[56px] leading-[1.02] tracking-[-0.018em] text-ink">
          Nouk
        </h1>
      </header>

      {/* Rooms list */}
      <section className="flex-1 space-y-3">
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

      {/* Docked Share a Thought (uses existing ShareThought.tsx) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom,16px)]">
        <div className="pointer-events-auto w-full max-w-[720px] rounded-t-3xl bg-gradient-to-t from-[var(--paper)] via-[var(--paper)]/98 to-transparent pt-4">
          <div className="flex justify-center">
            <ShareThought />
          </div>
        </div>
      </div>
    </main>
  );
}          <RoomCard
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
