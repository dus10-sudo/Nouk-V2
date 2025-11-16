// src/app/home/page.tsx

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase"; // <-- THIS IS CORRECT FOR YOUR PROJECT

export default async function HomePage() {
  const supabase = createClient();

  const { data: threads } = await supabase
    .from("threads")
    .select("id, title, room_id, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/house-interior.jpg"
          alt="Interior"
          fill
          priority
          className="object-cover opacity-60"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Page content */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-4 pt-16 pb-24">

        <h1 className="text-4xl font-bold mb-2">The Hearth</h1>
        <p className="text-neutral-300 mb-6">
          Take a breath. See what's on people's minds tonight.
        </p>

        <Link
          href="/share"
          className="block w-full text-center bg-amber-400 text-black font-semibold py-3 rounded-xl shadow-lg mb-8"
        >
          Share a Thought
        </Link>

        <div className="space-y-3">
          {threads?.map((t) => (
            <Link
              key={t.id}
              href={`/thread/${t.id}`}
              className="block p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10"
            >
              <p className="font-medium">{t.title}</p>
              <p className="text-xs text-neutral-400 mt-1">
                {new Date(t.created_at).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
