import { notFound } from 'next/navigation';
import Link from 'next/link';
import Composer from '@/components/Composer';
import { getThread, listMessages } from '@/lib/supabase';

type Params = { params: { id: string } };

export const dynamic = 'force-dynamic';

export default async function ThreadPage({ params }: Params) {
  const id = params.id;
  const thread = await getThread(id);
  if (!thread) return notFound();

  const messages = await listMessages(id);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">Rooms</Link>
        <span aria-hidden>›</span>
        <Link href={`/room/${thread.room_slug}`} className="hover:underline">
          {thread.room_name ?? thread.room_slug}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-foreground truncate">{thread.title ?? 'Thread'}</span>
      </div>

      {/* Header */}
      <header>
        <h1 className="text-xl font-semibold tracking-tight">{thread.title ?? 'Thread'}</h1>
        {thread.link_url ? (
          <a
            href={thread.link_url}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-sm underline"
          >
            Open link
          </a>
        ) : null}
      </header>

      {/* Messages */}
      <section className="space-y-3">
        {messages.length === 0 ? (
          <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No messages yet. Say hi 👋
          </div>
        ) : (
          <ul className="space-y-3">
            {messages.map((m: any) => (
              <li key={m.id} className="rounded-xl border bg-background p-3">
                <div className="text-sm whitespace-pre-wrap">{m.body}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Composer */}
      <Composer threadId={thread.id} />
    </main>
  );
}
