import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRoomBySlug, listThreads } from '@/lib/supabase';
import NewThreadButton from '@/components/NewThreadButton';

type Props = {
  params: { slug: string };
};

export default async function RoomPage({ params }: Props) {
  const slug = params.slug;

  // Load the room
  const room = await getRoomBySlug(slug);
  if (!room) return notFound();

  // Load active threads for this room
  const threads = await listThreads(room.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
        <Link href="/" className="hover:underline">Rooms</Link>
        <span aria-hidden>›</span>
        <span className="text-foreground">{room.title ?? slug}</span>
      </div>

      {/* Room header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {room.title}
          </h1>
          {room.description ? (
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              {room.description}
            </p>
          ) : null}
        </div>

        {/* Create thread */}
        <NewThreadButton roomSlug={slug} />
      </header>

      {/* Thread list */}
      <section>
        {threads.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            It’s quiet in here. Start the first thread?
          </p>
        ) : (
          <ul className="space-y-3">
            {threads.map((t: any) => (
              <li
                key={t.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
              >
                <Link href={`/t/${t.id}`} className="block">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                      {t.title}
                    </h3>
                    {/* Soft “hot” pulse when active */}
                    {t.is_hot ? (
                      <span className="inline-flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    ) : null}
                  </div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {t.reply_count ?? 0} replies · ends {new Date(t.expires_at).toLocaleString()}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
