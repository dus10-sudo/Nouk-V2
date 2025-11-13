import { notFound } from 'next/navigation';
import Link from 'next/link';
import Composer from '@/components/Composer';
import { getThread, listMessages } from '@/lib/supabase';

// If your lib doesn't export these fields, we keep them optional here
type ThreadLike = {
  id: string;
  title?: string | null;
  link_url?: string | null;
  // optional room metadata (may or may not be present from your query)
  room_slug?: string | null;
  room_name?: string | null;
  room_id?: string | null;
};

type Params = { params: { id: string } };

export const dynamic = 'force-dynamic';

export default async function ThreadPage({ params }: Params) {
  const id = params.id;

  const t = (await getThread(id)) as unknown as ThreadLike | null;
  if (!t) return notFound();

  const messages = await listMessages(id);

  // Build a safe breadcrumb target. Prefer slug if present, otherwise just go back to Rooms.
  const roomHref = t.room_slug ? `/room/${t.room_slug}` : '/';
  const roomLabel = t.room_name ?? t.room_slug ?? 'Room';

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Rooms</Link>
        <span aria-hidden>›</span>
        {t.room_slug ? (
          <>
            <Link href={roomHref} className="hover:underline">{roomLabel}</Link>
            <span aria-hidden>›</span>
          </>
        ) : null}
        <span className="text-foreground truncate">{t.title ?? 'Thread'}</span>
      </nav>

      {/* Header */}
      <header>
        <h1 className="text-xl font-semibold tracking-tight">{t.title ?? 'Thread'}</h1>
        {t.link_url ? (
          <a
            href={t.link_url}
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
      <Composer threadId={t.id} />
    </main>
  );
}
