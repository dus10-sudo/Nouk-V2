// src/components/ShareThought.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, getOrCreateUserToken } from '@/lib/supabase-browser';

type Room = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
};

const ROOM_SLUG_ORDER = [
  'library',
  'lounge',
  'studio',
  'theater',
  'game-room',
  'cafe',
];

type FormState = {
  roomSlug: string | null;
  title: string;
  link: string;
  submitting: boolean;
  error: string | null;
};

export default function ShareThoughtButton() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<FormState>({
    roomSlug: null,
    title: '',
    link: '',
    submitting: false,
    error: null,
  });

  // Load rooms once on mount
  useEffect(() => {
    let cancelled = false;

    async function loadRooms() {
      const { data, error } = await supabase
        .from('rooms')
        .select('id, slug, name, description');

      if (error) {
        console.error('[ShareThought] Error loading rooms', error);
        return;
      }

      if (!data || cancelled) return;

      const ordered = [...data].sort((a, b) => {
        const ia = ROOM_SLUG_ORDER.indexOf(a.slug);
        const ib = ROOM_SLUG_ORDER.indexOf(b.slug);
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
      });

      setRooms(ordered);
      setState((prev) => ({
        ...prev,
        roomSlug: ordered[0]?.slug ?? null,
      }));
    }

    loadRooms();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedRoom =
    rooms.find((r) => r.slug === state.roomSlug) ?? null;

  async function handleSubmit() {
    if (!selectedRoom) {
      setState((prev) => ({
        ...prev,
        error: 'Pick a room first.',
      }));
      return;
    }

    const trimmedTitle = state.title.trim();
    const trimmedLink = state.link.trim();

    if (!trimmedTitle && !trimmedLink) {
      setState((prev) => ({
        ...prev,
        error: 'Say at least a few words, or paste a link.',
      }));
      return;
    }

    setState((prev) => ({ ...prev, submitting: true, error: null }));

    try {
      const user_token = getOrCreateUserToken();

      const { data, error } = await supabase
        .from('threads')
        .insert({
          room_id: selectedRoom.id,
          title: trimmedTitle || 'Untitled Nouk',
          link_url: trimmedLink || null, // ✅ match your schema
          user_token,                    // ✅ NOT NULL column
        })
        .select('id')
        .single();

      if (error) {
        console.error('[ShareThought] Error creating thread', error);
        setState((prev) => ({
          ...prev,
          submitting: false,
          error: 'Something went wrong. Please try again.',
        }));
        return;
      }

      if (!data?.id) {
        setState((prev) => ({
          ...prev,
          submitting: false,
          error: 'Could not start the Nouk. Please try again.',
        }));
        return;
      }

      // Close modal and go to the new thread
      setOpen(false);
      setState({
        roomSlug: selectedRoom.slug,
        title: '',
        link: '',
        submitting: false,
        error: null,
      });

      router.push(`/t/${data.id}`);
    } catch (err) {
      console.error('[ShareThought] Unexpected error', err);
      setState((prev) => ({
        ...prev,
        submitting: false,
        error: 'Something went wrong. Please try again.',
      }));
    }
  }

  return (
    <>
      {/* Docked main button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-4 text-[15px] font-semibold tracking-wide text-[var(--paper)] shadow-[0_18px_55px_rgba(15,23,42,0.55)] active:scale-[0.98] transition-transform"
      >
        Share a Thought
      </button>

      {/* Overlay modal */}
      {open && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-[rgba(0,0,0,0.45)] sm:items-center">
          <div className="w-full max-w-md rounded-t-[28px] bg-[var(--card)] px-5 pb-5 pt-4 shadow-[0_-18px_55px_rgba(15,23,42,0.6)] sm:rounded-[28px]">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold tracking-[0.18em] text-[var(--muted)]">
                  START A NOUK
                </div>
                <div className="text-[15px] text-[var(--ink)]">
                  Find a quiet corner for this.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-1 text-[13px] text-[var(--muted)] hover:bg-black/5"
              >
                Close
              </button>
            </div>

            {/* Room selector */}
            <div className="mb-3">
              <div className="mb-1 text-[13px] font-medium text-[var(--muted-strong)]">
                1) Where do you want to post?
              </div>
              <div className="grid grid-cols-2 gap-2">
                {rooms.map((room) => {
                  const isSelected = room.slug === state.roomSlug;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          roomSlug: room.slug,
                          error:
                            prev.error === 'Pick a room first.'
                              ? null
                              : prev.error,
                        }))
                      }
                      className={`flex items-center justify-center rounded-[18px] border px-3 py-2 text-[14px] ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-strong)]'
                          : 'border-[color-mix(in_srgb,var(--muted)_35%,transparent)] bg-[var(--surface)] text-[var(--ink)]'
                      }`}
                    >
                      {room.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title + link inputs */}
            <div className="mb-3">
              <div className="mb-1 text-[13px] font-medium text-[var(--muted-strong)]">
                2) What&apos;s the thread about?
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Say something small to start…"
                  value={state.title}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full rounded-[18px] border border-[color-mix(in_srgb,var(--muted)_35%,transparent)] bg-[var(--surface)] px-3 py-2 text-[14px] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <input
                  type="url"
                  placeholder="Optional link (YouTube, Spotify, article…)"
                  value={state.link}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, link: e.target.value }))
                  }
                  className="w-full rounded-[18px] border border-[color-mix(in_srgb,var(--muted)_35%,transparent)] bg-[var(--surface)] px-3 py-2 text-[14px] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
              </div>
            </div>

            {/* Error */}
            {state.error && (
              <div className="mb-2 text-[13px] text-red-600">
                {state.error}
              </div>
            )}

            {/* Actions */}
            <div className="mt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-[18px] border border-[color-mix(in_srgb,var(--muted)_35%,transparent)] bg-transparent px-3 py-2 text-[14px] text-[var(--muted-strong)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={state.submitting}
                className="flex-1 rounded-[18px] bg-[var(--accent)] px-3 py-2 text-[14px] font-semibold text-[var(--paper)] shadow-[0_12px_30px_rgba(15,23,42,0.55)] disabled:opacity-60"
              >
                {state.submitting ? 'Starting…' : 'Start Nouk'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
                  }
export default function ShareThoughtButton({ compact = false }) {
  return (
    <button
      className={`w-full rounded-[24px] bg-[var(--cta)] text-[var(--cta-ink)] font-medium transition-all shadow-soft-lg
        ${compact ? "py-3 text-[15px]" : "py-4 text-[16px]"}
      `}
      onClick={openModal}
    >
      Share a Thought
    </button>
  );
}
