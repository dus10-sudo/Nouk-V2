// src/components/Composer.tsx
'use client';

import { useState } from 'react';

type Props = {
  placeholder?: string;
  onSubmit: (text: string) => Promise<void> | void;
  buttonLabel?: string;
};

export default function Composer({ placeholder, onSubmit, buttonLabel = 'Post' }: Props) {
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    setBusy(true);
    try {
      await onSubmit(text);
      setValue('');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring"
        placeholder={placeholder ?? 'Say something…'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={busy}
      />
      <button
        type="submit"
        className="rounded-xl px-4 py-2 bg-amber-600 text-white disabled:opacity-50"
        disabled={busy}
        aria-busy={busy}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
