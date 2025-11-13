// src/app/room/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomBySlug, getThreadsForRoom } from "@/lib/supabase";
import ThreadCard from "@/components/ThreadCard";
import NewThreadButton from "@/components/NewThreadButton";

type Props = { params: { slug: string } };

export const revalidate = 0; // always fresh

export default async function RoomPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug);
  const room = await getRoomBySlug(slug);

  if (!room) return notFound();

  const threads = await getThreadsForRoom(slug);

  return (
    <main className="mx-auto max-w-screen-lg px-4 py-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif tracking-tight">{room.name}</h1>
          <p className="text-sm text-muted-foreground">{room.description}</p>
        </div>
        <Link href="/" className="text-sm underline hover:opacity-80">
          ← Rooms
        </Link>
      </header>

      <section className="space-y-3">
        {threads.length === 0 ? (
          <div className="rounded-2xl border bg-card/60 p-6 text-sm text-muted-foreground">
            No threads yet. Be the first to start something cozy.
          </div>
        ) : (
          threads.map((t) => <ThreadCard key={t.id} thread={t} />)
        )}
      </section>

      <div className="fixed bottom-5 right-5">
        <NewThreadButton roomSlug={slug} />
      </div>
    </main>
  );
}
