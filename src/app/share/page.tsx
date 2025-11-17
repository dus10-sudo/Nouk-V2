// src/app/share/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase, Room } from '@/lib/supabase';

export default function SharePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoomSlug = searchParams.get('room') || undefined;

  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomSlug, setRoomSlug] = useState<string | undefined>(initialRoomSlug);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadRooms() {
      const { data } = await supabase
        .from('rooms')
        .select('id, slug, title')
        .order('title', { ascending: true });
      if (data && data.length > 0) {
        setRooms(data);
        if (!roomSlug) {
          setRoomSlug(data[0].slug);
        }
      }
    }
    loadRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!roomSlug || !title.trim() && !body.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomSlug,
          title: title.trim(),
          body: body.trim() || null,
          link_url: link.trim() || null,
        }),
      });

      if (!res.ok) {
        console.error('Failed to create thread', await res.text());
        setIsSubmitting(false);
        return;
      }

      router.push(`/home?room=${roomSlug}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5eedf]">
      <div className="max-w-xl mx-auto px-4 pb-16 pt-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Start a Post
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Pick a category and leave something small for people to see.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white shadow-sm border border-neutral-200 px-4 py-5 space-y-4"
        >
          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Where should this live?
            </label>
            <select
              value={roomSlug || ''}
              onChange={(e) => setRoomSlug(e.target.value)}
              className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800"
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.slug}>
                  {room.title}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Title (optional but helpful)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give it a tiny headline…"
              className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              What&apos;s on your mind?
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Say something small to start…"
              className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 resize-none"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Optional link
            </label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="YouTube, Spotify, article, etc…"
              className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-2xl border border-neutral-300 px-4 py-2 text-sm text-neutral-700 bg-neutral-50 hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !roomSlug}
              className="rounded-2xl bg-neutral-900 text-[#f5eedf] px-4 py-2 text-sm font-medium shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting…' : 'Post it'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
