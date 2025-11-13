// app/page.tsx — Server Component
import Link from "next/link";
import ShareThought from "@/components/ShareThought";
import { createClient } from "@supabase/supabase-js";

// Types that match your DB
type Room = {
  slug: string;
  name: string;
  description: string | null;
  is_active: boolean | null;
};

// Server-side fetch to avoid client handlers in SSR
async function fetchRooms(): Promise<Room[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon, { auth: { persistSession: false } });

  const { data, error } = await supabase
    .from("rooms")
    .select("slug,name,description,is_active")
    .order("name", { ascending: true });

  if (error) {
    // Render an empty array instead of throwing build errors
    console.error("rooms fetch error:", error.message);
    return [];
  }
  return (data || []).filter((r) => r.is_active !== false);
}

// Simple icon map to match the mock
const ICON: Record<string, string> = {
  library: "📚",
  kitchen: "🍲",
  "game-room": "🎮",
  theater: "📺",
  garage: "🧰",
  study: "📝",
};

export default async function HomePage() {
  const rooms = await fetchRooms();

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Page container */}
      <div className="mx-auto max-w-[680px] px-4 pb-28 pt-10 sm:pt-14">
        {/* Brand header */}
        <h1 className="text-center font-serif text-[48px] leading-none tracking-tight sm:text-[56px]">
          Nouk
        </h1>

        {/* Stack of room cards */}
        <div className="mt-8 space-y-4">
          {rooms.map((r) => {
            const icon = ICON[r.slug] ?? "🪑";
            return (
              <Link
                key={r.slug}
                href={`/room/${r.slug}`}
                className="block rounded-[20px] border border-[var(--stroke)] bg-[var(--card)]
                           shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_2px_10px_rgba(0,0,0,0.06)]
                           transition-transform active:translate-y-[1px]"
              >
                <div className="flex items-center gap-4 px-5 py-5">
                  {/* Icon badge */}
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl
                               bg-[var(--icon-bg)] text-[28px] shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_2px_8px_rgba(0,0,0,0.06)]"
                  >
                    <span className="translate-y-[1px]">{icon}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate font-serif text-[28px] leading-[1.1]">
                      {r.name}
                    </div>
                    {r.description ? (
                      <div className="mt-1 truncate text-[var(--muted)]">
                        {r.description}
                      </div>
                    ) : null}
                  </div>

                  {/* Chevron */}
                  <div className="text-[var(--muted)]">›</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed inset-x-0 bottom-4 flex justify-center px-4">
        <ShareThought />
      </div>
    </main>
  );
}
