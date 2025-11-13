'use client';

import { useState } from 'react';
import { addReply } from '@/server/actions';

type Props = { threadId: string };

export default function Composer({ threadId }: Props) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSend() {
    const body = text.trim();
    if (!body) return;
    setBusy(true);
    setErr(null);
    try {
      await addReply(threadId, body);
      setText('');
    } catch (e: any) {
      setErr(e?.message ?? 'Failed to post.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a cozy reply…"
        className="w-full resize-none rounded-xl border border-zinc-300 dark:border-zinc-700
                   px-3 py-2 outline-none dark:bg-zinc-800 dark:text-white"
        rows={3}
        disabled={busy}
      />
      {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
      <div className="mt-2 flex justify-end">
        <button
          onClick={onSend}
          disabled={busy || !text.trim()}
          className="px-4 py-2 rounded-xl bg-orange-600 text-white disabled:opacity-60"
        >
          {busy ? 'Sending…' : 'Send'}
        </button>
      </div>
    </div>
  );
}
