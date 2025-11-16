import Link from 'next/link';

type Room = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

const ROOMS: Room[] = [
  {
    slug: 'sunroom',
    name: 'Sunroom',
    description: 'For light check ins, small wins, and passing thoughts.',
    icon: '🌞',
  },
  {
    slug: 'living-room',
    name: 'Living Room',
    description: 'For relaxed conversation, shared moments, and company.',
    icon: '🛋️',
  },
  {
    slug: 'garden',
    name: 'Garden',
    description: 'For intentions, tiny steps, and gentle personal growth.',
    icon: '🌱',
  },
  {
    slug: 'lantern-room',
    name: 'Lantern Room',
    description: 'For heavy feelings, venting, and emotional processing.',
    icon: '🔮',
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    description: 'For late night thoughts, big questions, and wonder.',
    icon: '🌙',
  },
  {
    slug: 'library',
    name: 'Library',
    description:
      'For journaling, prompts, and more thoughtful writing.',
    icon: '📖',
  },
];

export default function HomePage() {
  return (
    <main
      className="min-h-screen text-[#5a3b25]"
      style={{
        background:
          'radial-gradient(circle at top, #f7ebd5 0, #f1d8b7 45%, #e0bc94 100%)',
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-28 pt-10">
        {/* Tagline only – no extra Nouk at top */}
        <section className="mb-6 text-center">
          <p className="text-sm leading-relaxed text-[#6c4a2d]">
            A quiet little house for short-lived threads. Share something
            small, let it breathe, and let it fade.
          </p>
        </section>

        {/* Rooms */}
        <section className="flex flex-1 flex-col gap-3 pb-4">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={`/room/${room.slug}`}
              className="block rounded-[28px] bg-[#fbead5] px-4 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-transform active:translate-y-[1px]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fdf4e7] text-xl shadow-[0_8px_16px_rgba(0,0,0,0.14)]">
                  {room.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-[#5a3b25]">
                    {room.name}
                  </h2>
                  <p className="mt-1 text-sm leading-snug text-[#7b5a3a]">
                    {room.description}
                  </p>
                </div>
                <span className="text-lg text-[#c3996b]">›</span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
