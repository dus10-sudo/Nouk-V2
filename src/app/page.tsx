import RoomCard from '@/components/RoomCard';
import ShareThoughtButton from '@/components/ShareThoughtButton';
import {
  IconLibrary,
  IconKitchen,
  IconTheater,
  IconGame,
  IconGarage,
  IconStudy,
} from '@/components/Icons';

export default function Page() {
  return (
    <main className="mx-auto max-w-[720px] px-4 pb-28">
      {/* Title */}
      <header className="pt-6 pb-2 text-center">
        <h1 className="font-serif text-[56px] leading-[1.02] tracking-[-0.018em]">Nouk</h1>
      </header>

      {/* Rooms */}
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

      {/* Docked CTA */}
      <div className="fixed inset-x-0 bottom-0 flex justify-center px-4 pb-[10px]">
        <ShareThoughtButton />
      </div>
    </main>
  );
}
