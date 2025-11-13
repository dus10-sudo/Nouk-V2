// src/components/NewThreadButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createThread } from '@/lib/supabase';

export default function NewThreadButton({ roomSlug }: { roomSlug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    const title = prompt('Thread title?')?.trim();
    if (!title) return;
    setLoading(true);
    try {
      const id = await createThread(roomSlug, title, null);
      router.push(`/t/${id}`);
    } catch (e) {
      console.error(e);
      alert('Failed to create thread.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCreate}
      disabled={loading}
      className="rounded-lg bg-stone-900 text-white px-3 py-2 text-sm disabled:opacity-60 dark:bg-stone-100 dark:text-stone-900"
      aria-busy={loading}
    >
      {loading ? 'Creating…' : 'New Thread'}
    </button>
  );
}
