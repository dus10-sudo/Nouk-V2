import { addMessage, listMessages } from "@/lib/supabase";
import Composer from "@/components/Composer";
import { sb } from "@/lib/supabase";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export const revalidate = 0; // show fresh messages

async function getThreadMeta(id: string) {
  const { data, error } = await sb
    .from("threads")
    .select("id, title, expires_at")
    .eq("id", id)
    .single();
  if (error && (error as any).code !== "PGRST116") throw error;
  return data ?? null;
}

export default async function ThreadPage({ params }: Props) {
  const thread = await getThreadMeta(params.id);
  if (!thread) return notFound();

  const messages = await listMessages(thread.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-4">
        <h1 className="text-2xl font-serif text-stone-900 dark:text-stone-100">
          {thread.title ?? "Untitled Nouk"}
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Expires at: {new Date(thread.expires_at).toLocaleString()}
        </p>
      </header>

      <section className="space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl bg-stone-100 px-4 py-3 text-stone-900 dark:bg-stone-900 dark:text-stone-100"
          >
            {m.body}
          </div>
        ))}
      </section>

      <div className="mt-6">
        {/* Composer should call addMessage(thread.id, body) under the hood.
            If your Composer expects a prop, expose a tiny server action here. */}
        <Composer
          onSend={async (text: string) => {
            "use server";
            await addMessage(thread.id, text);
          }}
        />
      </div>
    </main>
  );
}
