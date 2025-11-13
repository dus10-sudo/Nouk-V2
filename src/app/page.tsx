// src/app/page.tsx
import Link from 'next/link';
import { listRooms, type Room } from '@/lib/supabase';

export default async function HomePage() {
  const rooms: Room[] = await listRooms();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Nouk Rooms</h1>
      <ul className="space-y-3">
        {rooms.map((r) => (
          <li key={r.id} className="rounded-xl border border-stone-200 dark:border-stone-800 p-4">
            <Link href={`/room/${r.slug}`} className="block">
              <div className="text-xl">{r.title}</div>
              {r.description ? (
                <div className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                  {r.description}
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
