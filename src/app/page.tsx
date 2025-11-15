import { supabase } from '@/lib/supabase-server';
import Link from 'next/link';

const ROOM_SLUG_ORDER = [
  'sunroom',
  'living-room',
  'garden',
  'lantern-room',
  'observatory',
  'library',
] as const;

export default async function HomePage() {
  const { data: rooms } = await supabase
    .from('rooms')
    .select('id, slug, name, description, icon')
    .order('name');

  const ordered = (rooms || []).sort((a, b) => {
    const ia = ROOM_SLUG_ORDER.indexOf(a.slug as any);
    const ib = ROOM_SLUG_ORDER.indexOf(b.slug as any);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  return (
    <main className="mx-auto max-w-md px-4 pt-6 pb-28">

      {/* Header */}
      <header className="mb-8">
        <div className="text-[11px] tracking-[0.35em] text-[var(--muted-strong)]">
          NOUK
        </div>
      </header>

      {/* Subheading */}
      <p className="mb-8 text-center text-[16px] leading-relaxed text-[var(--ink)]">
        A quiet little house for short-lived threads.
        Share something small, let it breathe, and let it fade.
      </p>

      {/* Rooms */}
      <div className="space-y-4">
        {ordered.map((room) => (
          <Link
            key={room.id}
            href={`/room/${room.slug}`}
            className="flex items-center gap-4 rounded-[28px] bg-[var(--card)] px-4 py-4 shadow-[0_8px_35px_rgba(15,23,42,0.25)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] text-[26px]">
              {room.icon}
            </span>

            <div className="flex-1">
              <div className="text-[16px] font-semibold text-[var(--ink)]">
                {room.name}
              </div>
              <div className="text-[14px] text-[var(--muted-strong)]">
                {room.description}
              </div>
            </div>

            <div className="text-[20px] text-[var(--muted)]">›</div>
          </Link>
        ))}
      </div>

    </main>
  );
}
