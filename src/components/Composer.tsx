"use client";

import { useState } from "react";
import { addMessage } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Composer({ threadId }: { threadId: string }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function send() {
    const body = text.trim();
    if (!body) return;
    setBusy(true);
    try {
      await addMessage(threadId, body);
      setText("");
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to send.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="sticky bottom-0 mt-4 rounded-2xl border bg-card p-3 shadow-sm">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Write a reply…"
        className="w-full resize-none rounded-xl border bg-background px-3 py-2 outline-none focus:ring"
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={send}
          disabled={busy || !text.trim()}
          className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow hover:shadow-md disabled:opacity-50"
        >
          {busy ? "Sending…" : "Reply"}
        </button>
      </div>
    </div>
  );
}
