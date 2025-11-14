"use client";

import { useState } from "react";
import { addReply } from "@/lib/actions";

export default function ReplyForm({ threadId }: { threadId: string }) {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;

    setLoading(true);

    try {
      await addReply(threadId, body.trim());
      setBody("");
      setSent(true);
      setTimeout(() => setSent(false), 1500);
    } catch (err) {
      console.error("Reply error:", err);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-accent/50 p-4 shadow-sm bg-[var(--surface)]">
      <textarea
        placeholder="Write a reply..."
        className="w-full h-24 bg-transparent outline-none resize-none text-[16px]"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className={`mt-3 text-right w-full text-accent ${
          loading ? "opacity-50" : ""
        }`}
      >
        {loading ? "Sending..." : sent ? "Sent ✓" : "Send"}
      </button>
    </form>
  );
}
