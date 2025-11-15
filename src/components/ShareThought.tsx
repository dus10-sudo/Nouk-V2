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
    const trimmedLink = state
