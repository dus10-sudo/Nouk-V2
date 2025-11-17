// src/app/thread/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase";

type ReplyRow = {
  id: string;
  body: string;
  created_at: string;
};

type ThreadRow = {
  id: string;
  title: string | null;
  created_at: string;
  link_url: string | null;
  // NOTE: Supabase returns related rows as an array, so we type it that way
  rooms: { name: string }[] | null;
  replies: ReplyRow[] | null;
};

async function addReply(formData: FormData) {
  "use server";

  const supabase = createServerSupabase();

  const thread_id = (formData.get("thread_id") as string) ?? "";
  const rawBody = (formData.get("body") as string) ?? "";
  const body = rawBody.trim();

  if (!thread_id || !body) {
    return;
  }

  const user_token = crypto.randomUUID();

  const { error } = await supabase.from("replies").insert({
    thread_id,
    body,
    user_token,
  });

  if (error) {
    console.error("[thread] Error adding reply", error);
    return;
  }

  revalidatePath(`/thread/${thread_id}`);
}

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("threads")
    .select(
      `
      id,
      title,
      created_at,
      link_url,
      rooms(name),
      replies(id, body, created_at)
    `
    )
    .eq("id", params.id)
    .order("created_at", { foreignTable: "replies", ascending: true })
    .maybeSingle();

  if (error) {
    console.error("[thread] Error loading thread", error);
  }

  const thread = (data as ThreadRow | null) ?? null;

  if (!thread) {
    notFound();
  }

  // rooms is an array; grab the first one if present
  const roomName = thread.rooms?.[0]?.name ?? "Somewhere in the house";

  const created = new Date(thread.created_at);
  const createdLabel = created.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const replies = thread.replies ?? [];

  return (
    <main className="min-h-screen bg-[var(--page-bg,#f3eee2)] px-4 py-4">
      <div className="mx-auto flex h-full max-w-md flex-col">
        {/* Header */}
        <header className="mb-3 flex items-center justify-between gap-2">
          <Link
            href="/home"
            className="rounded-full px-3 py-1 text-xs text-[var(--muted-strong,#4b5563)] hover:bg-black/5"
          >
            ⟵ Back to House
          </Link>
          <div className="text-right">
            <div className="text-[11px] font-medium text-[var(--muted-strong,#4b5563)]">
              {roomName}
            </div>
            <div className="text-[11px] text-[var(--muted,#6b7280)]">
              {createdLabel}
            </div>
          </div>
        </header>

        {/* Thread card */}
        <section className="mb-3 rounded-2xl bg-[var(--card,#f8f3e6)] p-4 shadow-sm">
          <h1 className="text-base font-semibold text-[var(--ink,#111827)]">
            {thread.title && thread.title.trim().length > 0
              ? thread.title
              : "Untitled Nouk"}
          </h1>

          {thread.link_url && (
            <a
              href={thread.link_url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-[11px] text-[var(--muted-strong,#374151)]"
            >
              Open link ↗
            </a>
          )}
        </section>

        {/* Replies */}
        <section className="flex-1 overflow-y-auto rounded-2xl bg-[var(--card,#f8f3e6)] p-3 shadow-inner">
          {replies.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-1 text-center text-sm text-[var(--muted,#6b7280)]">
              <div>No replies yet.</div>
              <div>Leave a small note below.</div>
            </div>
          )}

          {replies.length > 0 && (
            <ul className="space-y-2">
              {replies.map((reply) => {
                const d = new Date(reply.created_at);
                const label = d.toLocaleString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                });

                return (
                  <li
                    key={reply.id}
                    className="rounded-2xl bg-white/90 px-3 py-2 text-[13px] text-[var(--ink,#111827)] shadow-sm"
                  >
                    <div className="mb-1 text-[11px] text-[var(--muted,#6b7280)]">
                      {label}
                    </div>
                    <div className="whitespace-pre-wrap break-words">
                      {reply.body}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Reply form */}
        <section className="mt-3">
          <form action={addReply} className="space-y-2">
            <input type="hidden" name="thread_id" value={thread.id} />
            <textarea
              name="body"
              rows={3}
              placeholder="Leave a small reply…"
              className="w-full rounded-2xl border border-black/5 bg-white/90 px-3 py-2 text-sm text-[var(--ink,#111827)] outline-none ring-0 placeholder:text-[var(--muted,#9ca3af)] focus:border-[var(--accent,#f97316)]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-[var(--accent,#f97316)] px-4 py-1.5 text-xs font-semibold text-[var(--paper,#fff7ed)] shadow-[0_8px_20px_rgba(249,115,22,0.5)] active:scale-[0.98] transition-transform"
              >
                Send reply
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
