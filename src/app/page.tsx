// src/app/page.tsx
import Link from 'next/link';
import { listRooms } from '@/lib/queries';

export default async function Home() {
  const rooms = await listRooms();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4 text-stone-900 dark:text-stone-100">Nouk Rooms</h1>

      {rooms.length === 0 ? (
        <p className="text-stone-600 dark:text-stone-400">No rooms yet.</p>
      ) : (
        <ul className="space-y-3">
          {rooms.map((r) => (
            <li key={r.id}>
              <Link
                className="block rounded-xl border border-stone-200 dark:border-stone-700 p-4 hover:border-stone-400 dark:hover:border-stone-500 transition"
                href={`/room/${r.slug}`}
              >
                <div className="text-xl text-stone-900 dark:text-stone-100">{r.name}</div>
                {r.description && (
                  <div className="text-sm text-stone-600 dark:text-stone-400">{r.description}</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
