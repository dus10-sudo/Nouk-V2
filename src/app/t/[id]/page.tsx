// src/app/t/[id]/page.tsx
import { notFound } from "next/navigation";
import { getThread, listMessages } from "@/lib/supabase";
import Composer from "@/components/Composer";

type Props = { params: { id: string } };

export const revalidate = 0;

export default async function ThreadView({ params }: Props) {
  const id = decodeURIComponent(params.id);
  const thread = await getThread(id);
  if (!thread) return notFound();
  const messages = await listMessages(id);

  const expires = new Date(thread.expires_at).toLocaleString();

  return (
    <main className="mx-auto max-w-screen-md px-4 py-6 space-y-6">
      <header>
        <h1 className="text-2xl font-serif">{thread.title}</h1>
        <p className="text-xs text-muted-foreground">Expires {expires}</p>
      </header>

      <section className="space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border bg-card p-3 text-sm shadow-sm"
          >
            {m.body}
            <div className="mt-1 text-[10px] text-muted-foreground">
              {new Date(m.created_at).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </section>

      <Composer threadId={id} />
    </main>
  );
}
