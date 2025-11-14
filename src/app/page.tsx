// src/app/page.tsx
import RoomCard from '@/components/RoomCard';
import Logo from '@/components/Logo';
import {
  IconLibrary,
  IconKitchen,
  IconTheater,
  IconGame,
  IconGarage,
  IconStudy,
} from '@/components/Icons';
import ShareThought from '@/components/ShareThought';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[960px] flex-col px-4 pb-28 pt-6 md:px-6 lg:px-8">
        {/* Logo + small caption */}
        <Logo />
        <p className="mb-4 text-center text-[13px] text-[var(--muted)]">
          Cozy, temporary conversations that fade after a day.
        </p>

        {/* Rooms heading (mobile-only label removed) */}
        {/* Room grid */}
        <section className="mt-4 grid gap-3 md:grid-cols-2">
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

        {/* Spacer so content doesn't hide behind the dock */}
        <div className="flex-1" />

        {/* Docked CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--ring)]/60 bg-[var(--paper)]/96 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-4 py-3 md:px-6 lg:px-8">
            <span className="hidden text-[13px] text-[var(--muted)] md:inline">
              Start a fresh Nouk in any room.
            </span>
            <div className="flex flex-1 justify-center md:flex-none">
              <ShareThought />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
