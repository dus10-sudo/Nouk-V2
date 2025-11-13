// src/app/page.tsx
'use client';

import RoomCard from '@/components/RoomCard';
import {
  BooksIcon,
  PotIcon,
  ClapperIcon,
  GamepadIcon,
  ToolboxIcon,
  DeskIcon,
} from '@/components/icons';
import { useRouter } from 'next/navigation';

const ROOMS = [
  { slug: 'library', title: 'Library', subtitle: 'Books, projects, ideas', Icon: BooksIcon },
  { slug: 'kitchen', title: 'Kitchen', subtitle: 'Recipes, cooking, food talk', Icon: PotIcon },
  { slug: 'theater', title: 'Theater', subtitle: 'Movies & TV', Icon: ClapperIcon },
  { slug: 'game-room', title: 'Game Room', subtitle: 'Games, music & hobbies', Icon: GamepadIcon },
  { slug: 'garage', title: 'Garage', subtitle: 'DIY, tools, builds', Icon: ToolboxIcon },
  { slug: 'study', title: 'Study', subtitle: 'Focus, learning, planning', Icon: DeskIcon },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="mx-auto max-w-screen-sm px-4 pb-[calc(env(safe-area-inset-bottom)+120px)]">
      <h1 className="text-[44px] leading-none tracking-tight text-center font-[var(--font-serif)] pt-10 pb-6">
        Nouk
      </h1>

      <div className="space-y-4">
        {ROOMS.map(({ slug, title, subtitle, Icon }) => (
          <RoomCard key={slug} href={`/room/${slug}`} Icon={Icon} title={title} subtitle={subtitle} />
        ))}
      </div>

      {/* Fixed CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40">
        <div className="mx-auto max-w-screen-sm px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-3">
          <button
            onClick={() => router.push('/new')}
            className="w-full rounded-2xl primary text-[18px] font-medium py-4 shadow-soft"
          >
            Share a Thought
          </button>
        </div>
      </div>
    </main>
  );
}
