// src/components/ThreadCard.tsx
'use client';

import Link from 'next/link';
import type { Thread } from '@/lib/supabase';

export default function ThreadCard({ thread }: { thread: Thread }) {
  return (
    <Link
      href={`/t/${thread.id}`}
      className="block rounded-xl border border-stone-200 dark:border-stone-800 p-4 hover:bg-stone-50 dark:hover:bg-stone-900"
    >
      <div className="flex items-center justify-between">
        <div className="text-lg">{thread.title}</div>
        <div className="text-xs text-stone-500">{thread.posts_count} posts</div>
      </div>
      {thread.link_url ? (
        <div className="text-sm text-stone-600 dark:text-stone-400 mt-1">{thread.link_url}</div>
      ) : null}
    </Link>
  );
}
