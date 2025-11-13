// src/components/Composer.tsx
'use client';

import { useState } from 'react';

type Props = {
  threadId: string;
  // onSend(body) -> Promise<void>
  onSend: (threadId: string, body: string) => Promise<void>;
};

export default function Composer({ threadId, onSend }: Props) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    const body = text.trim();
    if (!body) return;
    setBusy(true);
    try {
      await onSend(threadId, body);
      setText('');
    } catch (e) {
      console.error(e);
      alert('Failed to send reply.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a cozy reply…"
        className="flex-1 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent px-3 py-2"
      />
      <button
        onClick={submit}
        disabled={busy}
        className="rounded-lg bg-stone-900 text-white px-3 py-2 text-sm disabled:opacity-60 dark:bg-stone-100 dark:text-stone-900"
      >
        Send
      </button>
    </div>
  );
}
