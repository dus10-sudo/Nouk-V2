// src/app/thread/[id]/page.tsx

import { createClient } from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: thread } = await supabase
    .from("threads")
    .select("id, title, created_at")
    .eq("id", params.id)
    .single();

  if (!thread) return notFound();

  const { data: replies } = await supabase
    .from("replies")
    .select("id, body, created_at")
    .eq("thread_id", params.id)
    .order("created_at", { ascending: true });

  async function reply(formData: FormData) {
    "use server";
    const supabase = createClient();
    const body = String(formData.get("body") || "").trim();
    if (!body) return;

    await supabase.from("replies").insert({
      thread_id: params.id,
      body,
    });

    redirect(`/thread/${params.id}`);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Thread */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>
        <p className="text-sm text-neutral-500">
          {new Date(thread.created_at).toLocaleString()}
        </p>
      </div>

      {/* Replies */}
      <div className="space-y-4 mb-10">
        {replies?.length ? (
          replies.map((r) => (
            <div
              key={r.id}
              className="rounded-xl bg-white/10 border border-white/10 p-4"
            >
              <p>{r.body}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {new Date(r.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-neutral-500 italic">No replies yet.</p>
        )}
      </div>

      {/* Reply Form */}
      <form action={reply} className="space-y-4">
        <textarea
          name="body"
          rows={3}
          placeholder="Reply..."
          className="w-full p-4 rounded-xl bg-white/10 border border-white/10 resize-none outline-none focus:border-white/40"
        />

        <button
          type="submit"
          className="w-full bg-amber-300 text-black py-3 rounded-xl font-semibold"
        >
          Send Reply
        </button>
      </form>
    </div>
  );
}
