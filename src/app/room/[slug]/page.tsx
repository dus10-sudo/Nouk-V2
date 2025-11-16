import Link from 'next/link';
import { notFound } from 'next/navigation';

const ROOMS = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'For light check ins, small wins, and passing thoughts.',
    longDescription:
      'A bright little corner for simple updates, tiny victories, and things you don’t need to explain too much.',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    description: 'For relaxed conversation, shared moments, and company.',
    longDescription:
      'A comfy room for hanging out, telling stories, and leaving notes for future you (or future friends).',
  },
  {
    slug: 'garden',
    name: 'Garden',
    description: 'For intentions, tiny steps, and gentle personal growth.',
    longDescription:
      'Somewhere to plant small goals, check in on them, and notice what’s growing over time.',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    description:
      'For heavy feelings, venting, and emotional processing.',
    longDescription:
      'A dim, quiet room for the stuff that feels heavy. No need to be polished — just honest.',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description:
      'For late night thoughts, big questions, and wonder.',
    longDescription:
      'A high-up window for zoomed-out thoughts, weird questions, and “what if”s.',
  },
  {
    slug: 'library',
    name: 'Library',
    description:
      'For journaling, prompts, and more thoughtful writing.',
    longDescription:
      'A slower room for longer notes, prompts, and more intentional writing.',
  },
];

type RoomPageProps = {
  params: {
    slug: string;
  };
};

export default function RoomPage({ params }: RoomPageProps) {
  const room = ROOMS.find((r) => r.slug === params.slug);

  if (!room) {
    notFound();
  }

  return (
    <main
      className="min-h-screen text-[#5a3b25]"
      style={{
        background:
          'radial-gradient(circle at top, #f7ebd5 0, #f1d8b7 45%, #e0bc94 100%)',
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-28 pt-10">
        <header className="mb-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-[#7b5a3a] underline-offset-2 hover:underline"
          >
            ← Back to rooms
          </Link>
        </header>

        <section>
          <h1 className="text-xl font-semibold text-[#5a3b25]">
            {room.name}
          </h1>
          <p className="mt-1 text-sm text-[#7b5a3a]">{room.description}</p>
          <p className="mt-4 text-sm leading-relaxed text-[#6c4a2d]">
            {room.longDescription}
          </p>

          <p className="mt-8 text-xs text-[#8a6640]">
            Threads and replies will live here soon. For now, this is just a
            quiet landing room.
          </p>
        </section>
      </div>
    </main>
  );
}
