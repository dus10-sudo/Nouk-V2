// src/app/home/page.tsx

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default async function HomePage() {
  const supabase = createClient();

  const { data: threads } = await supabase
    .from("threads")
    .select("id, title, created_at, room_id")
    .order("created_at", { ascending: false });

  return (
    <div className="relative min-h-screen w-full bg-black text-white">

      {/* Banner */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src="/house-interior.jpg"
          alt="Interior"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90" />
        
        <div classname="absolute bottom-4 left-5">
          <p className="text-xs uppercase tracking-widest text-neutral-300">
            Inside Nouk
          </p>
          <h1 className="text-3xl font-bold mt-1">The Hearth</h1>
          <p className="text-neutral-400 mt-1">
            Take a breath. See what’s on people’s minds tonight.
          </p>
        </div>
      </div>

      {/* Share Button */}
      <div className="px-5 mt-6">
        <Link
          href="/share"
          className="block w-full text-center bg-amber-300 text-black font-semibold py-3 rounded-xl shadow-md"
        >
          Share a Thought
        </Link>
      </div>

      {/* Feed */}
      <div className="mt-6 px-5 space-y-4 pb-24">
        {threads?.map((t) => (
          <Link
            key={t.id}
            href={`/thread/${t.id}`}
            className="block rounded-xl bg-white/10 p-4 border border-white/10 backdrop-blur"
          >
            <p className="font-medium mb-1">{t.title}</p>
            <p className="text-xs text-neutral-400">
              {new Date(t.created_at).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
