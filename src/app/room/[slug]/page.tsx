import Link from "next/link";
import { getRoomBySlug, listThreadsForRoom } from "@/lib/supabase";
import NewThreadButton from "@/components/NewThreadButton";
import ThreadCard from "@/components/ThreadCard";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export const revalidate = 5;

export default async function RoomPage({ params }: Props) {
  const room = await getRoomBySlug(params.slug);
  if (!room) return notFound();

  const threads = await listThreadsForRoom(room);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-stone-900 dark:text-stone-100">
            {room.name}
          </h1>
          {room.description && (
            <p className="text-stone-600 dark:text-stone-400">{room.description}</p>
          )}
        </div>
        <NewThreadButton roomId={room.id} />
      </div>

      <div className="space-y-3">
        {threads.length === 0 ? (
          <div className="rounded-xl border border-dashed border-stone-300 p-6 text-center text-stone-600 dark:border-stone-800 dark:text-stone-400">
            Quiet for now. Start something gentle.
          </div>
        ) : (
          threads.map((t) => (
            <Link key={t.id} href={`/t/${t.id}`} className="block">
              <ThreadCard thread={t} />
            </Link>
          ))
        )}
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-stone-600 underline-offset-2 hover:underline dark:text-stone-400">
          ← Back to rooms
        </Link>
      </div>
    </main>
  );
}
