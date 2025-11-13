// src/app/page.tsx
import Link from "next/link";
import { getRooms } from "@/lib/supabase";

export const revalidate = 0;

export default async function HomePage() {
  const rooms = await getRooms();

  return (
    <main className="mx-auto max-w-screen-lg px-4 py-8 space-y-6">
      <section>
        <h1 className="font-serif text-4xl tracking-tight">Welcome to Nouk.</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Cozy, low-stress conversations. Threads fade after quiet hours.
        </p>
      </section>

      <section className="rounded-3xl border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Rooms</h2>
          <span className="rounded-full bg-muted px-2 py-1 text-xs">ephemeral</span>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {rooms.map((r) => (
            <li key={r.id}>
              <Link
                href={`/room/${encodeURIComponent(r.slug)}`}
                className="block rounded-2xl border bg-background px-4 py-3 shadow-sm transition hover:shadow-md"
              >
                <div className="text-base font-medium">{r.name}</div>
                {r.description && (
                  <div className="text-xs text-muted-foreground">{r.description}</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
