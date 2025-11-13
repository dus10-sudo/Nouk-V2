'use client';

import { useState } from 'react';
import { addMessage } from '@/lib/supabase';

type Props = {
  threadId: string;
};

export default function Composer({ threadId }: Props) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSend() {
    const body = text.trim();
    if (!body || sending) return;

    setSending(true);
    try {
      await addMessage(threadId, body);
      setText('');
    } finally {
      setSending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  return (
    <div className="sticky bottom-0 flex gap-2 rounded-xl border bg-background p-3">
      <textarea
        className="min-h-[44px] flex-1 resize-none rounded-lg border px-3 py-2 text-sm outline-none"
        placeholder="Write something kind…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={sending || !text.trim()}
        className="rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        style={{ background: 'var(--accent, #CE6A34)' }} /* burnt orange */
      >
        {sending ? 'Sending…' : 'Send'}
      </button>
    </div>
  );
}
