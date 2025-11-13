'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Room = { slug: string; name: string; description?: string };

const ROOM_PRESETS: Room[] = [
  { slug: 'library', name: 'Library', description: 'Books, projects, ideas' },
  { slug: 'kitchen', name: 'Kitchen', description: 'Recipes & food talk' },
  { slug: 'theater', name: 'Theater', description: 'Movies & TV' },
  { slug: 'game-room', name: 'Game Room', description: 'Games & hobbies' },
  { slug: 'garage', name: 'Garage', description: 'DIY, tools, builds' },
  { slug: 'study', name: 'Study', description: 'Focus & planning' },
];

export default function ShareThought() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState<string>('library');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selected = useMemo(
    () => ROOM_PRESETS.find(r => r.slug === room)?.name ?? 'Library',
    [room]
  );

  // close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function createThread() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomSlug: room, title: title.trim(), link_url: link.trim() || null }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { id, roomSlug } = await res.json();
      setOpen(false);
      setTitle('');
      setLink('');
      // go to the thread if returned, else the room
      router.push(id ? `/t/${id}` : `/room/${roomSlug}`);
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Trigger button matches your parchment palette */}
      <button
        onClick={() => setOpen(true)}
        className="w-full max-w-[640px] mx-auto block rounded-[18px] px-6 py-4 text-white text-lg font-medium shadow-sm
                   bg-[var(--accent)] active:translate-y-[1px]"
      >
        Share a Thought
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* dim/blurred backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !submitting && setOpen(false)}
          />

          {/* sheet */}
          <div className="relative z-10 w-[92%] max-w-[560px] rounded-2xl p-5 sm:p-6"
               style={{
                 background:
                   'linear-gradient(180deg, rgba(28,29,30,0.96) 0%, rgba(24,25,26,0.96) 100%)',
                 boxShadow:
                   '0 10px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
               }}>
            <div className="text-center mb-4">
              <div className="text-white text-[20px] font-semibold">Start a New Nouk</div>
              <div className="text-gray-300/80 text-sm mt-1">Find your cozy corner.</div>
            </div>

            {/* 1. Choose room */}
            <label className="block text-sm text-gray-300 mb-2">
              1. Where do you want to hang out?
            </label>
            <div className="grid grid-cols-1 gap-2 mb-4">
              {ROOM_PRESETS.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => setRoom(r.slug)}
                  className={`w-full text-left rounded-xl px-4 py-3 border transition
                    ${room === r.slug
                      ? 'bg-emerald-700/35 border-emerald-400/40 text-emerald-100'
                      : 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/8'}`}
                >
                  {r.name}
                </button>
              ))}
            </div>

            {/* 2. Title / optional link */}
            <label className="block text-sm text-gray-300 mb-2">
              2. What’s the thread about? (Optional link/topic)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Start a ${selected.toLowerCase()} topic…`}
              className="w-full mb-2 rounded-xl px-4 py-3 bg-white/6 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste a link (YouTube, Spotify, article)…"
              className="w-full mb-3 rounded-xl px-4 py-3 bg-white/6 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            />

            {error && (
              <div className="text-sm text-rose-300 mb-3">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={submitting}
                className="px-4 py-3 rounded-xl text-gray-200 bg-white/5 border border-white/10 hover:bg-white/8 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={createThread}
                disabled={submitting || !title.trim()}
                className="px-5 py-3 rounded-xl text-white bg-[var(--accent)] hover:brightness-105 active:translate-y-[1px] disabled:opacity-60"
              >
                {submitting ? 'Starting…' : 'Start Nouk'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
