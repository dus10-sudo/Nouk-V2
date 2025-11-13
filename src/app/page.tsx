import Link from "next/link";
import { listRooms } from "@/lib/supabase";

export const revalidate = 15; // ISR: refresh room list periodically

export default async function HomePage() {
  const rooms = await listRooms();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-serif text-stone-900 dark:text-stone-100">
          Welcome to Nouk.
        </h1>
        <p className="text-stone-600 dark:text-stone-300">
          Cozy, low-stress conversations. Threads fade after quiet hours.
        </p>
      </header>

      <section className="rounded-2xl border border-stone-200 bg-stone-50/60 p-2 dark:border-stone-800 dark:bg-stone-900/40">
        <h2 className="px-3 py-2 text-lg font-medium text-stone-700 dark:text-stone-200">
          Rooms <span className="ml-2 rounded-full bg-stone-200 px-2 py-0.5 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-300">ephemeral</span>
        </h2>
        <ul className="divide-y divide-stone-200 dark:divide-stone-800">
          {rooms.map((r) => (
            <li key={r.id} className="group">
              <Link
                href={`/room/${r.slug}`}
                className="block px-3 py-4 transition hover:bg-stone-100 dark:hover:bg-stone-900"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-serif text-stone-900 dark:text-stone-100">
                      {r.name}
                    </div>
                    {r.description && (
                      <div className="text-sm text-stone-600 dark:text-stone-400">
                        {r.description}
                      </div>
                    )}
                  </div>
                  <span className="opacity-40 group-hover:opacity-70">›</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
