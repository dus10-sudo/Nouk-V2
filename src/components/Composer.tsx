// src/components/Composer.tsx
'use client';

import { useState } from 'react';

export default function Composer({ action }: { action: (text: string) => Promise<void> }) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);

  async function send() {
    if (!text.trim()) return;
    setBusy(true);
    try {
      await action(text.trim());
      setText('');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-700 p-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Write a reply…"
        className="w-full bg-transparent outline-none"
      />
      <div className="mt-2 flex justify-end">
        <button
          disabled={busy || !text.trim()}
          onClick={send}
          className="px-3 py-2 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
        >
          {busy ? 'Sending…' : 'Send'}
        </button>
      </div>
    </div>
  );
}
