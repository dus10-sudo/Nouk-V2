import RoomCard from "@/components/RoomCard";
import {
  IconLibrary, IconKitchen, IconTheater,
  IconGame, IconGarage, IconStudy
} from "@/components/Icons";
import ShareThoughtButton from "@/components/ShareThoughtButton";

const rooms = [
  { href: "/r/library", Icon: IconLibrary, title: "Library", subtitle: "Books, projects, ideas" },
  { href: "/r/kitchen", Icon: IconKitchen, title: "Kitchen", subtitle: "Recipes, cooking, food talk" },
  { href: "/r/theater", Icon: IconTheater, title: "Theater", subtitle: "Movies & TV" },
  { href: "/r/game-room", Icon: IconGame, title: "Game Room", subtitle: "Games, music & hobbies" },
  { href: "/r/garage", Icon: IconGarage, title: "Garage", subtitle: "DIY, tools, builds" },
  { href: "/r/study", Icon: IconStudy, title: "Study", subtitle: "Focus, learning, planning" },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-screen-sm px-4 pb-28 pt-10">
      {/* Spacer above heading to breathe like the mock */}
      <div className="h-2" />
      <h1 className="font-display text-display text-center mb-6">Nouk</h1>

      <section className="flex flex-col gap-4">
        {rooms.map((r) => (
          <RoomCard key={r.title} {...r} />
        ))}
      </section>

      <div className="h-6" />
      <ShareThoughtButton />
      <div className="h-2" />
    </main>
  );
}
