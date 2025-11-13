// src/components/ThreadCard.tsx
"use client";

import Link from "next/link";

type Props = {
  threadId: string;
  title?: string | null;
  messageCount?: number | null;
  expiresAt?: string;
};

export default function ThreadCard({ threadId, title, messageCount, expiresAt }: Props) {
  return (
    <Link
      href={`/t/${threadId}`}
      className="block rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 bg-white/70 dark:bg-neutral-900/60 p-4 hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{title || "Untitled thread"}</h3>
        {typeof messageCount === "number" && (
          <span className="text-xs opacity-70">{messageCount} msgs</span>
        )}
      </div>
      {expiresAt && (
        <div className="mt-1 text-xs opacity-60">
          Expires {new Date(expiresAt).toLocaleString()}
        </div>
      )}
    </Link>
  );
}
