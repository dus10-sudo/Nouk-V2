// src/app/page.tsx
import Link from 'next/link';
import { listRooms } from '@/lib/supabase';

export default async function Home() {
  const rooms = await listRooms();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 dark:text-white">Nouk</h1>
      <ul className="space-y-3">
        {rooms.map((r) => (
          <li key={r.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4">
            <Link href={`/room/${r.slug}`} className="block">
              <div>
                <div className="text-xl font-serif text-stone-900 dark:text-stone-100">
                  {r.title}
                </div>
                {r.description && (
                  <div className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                    {r.description}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
        {rooms.length === 0 && <li className="dark:text-zinc-300">No rooms yet.</li>}
      </ul>
    </main>
  );
}
