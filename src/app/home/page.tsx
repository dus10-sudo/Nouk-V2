'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase, Room } from '@/lib/supabase';
import Link from 'next/link';

type ThreadRow = {
  id: string;
  title: string | null;
  body: string | null;
  link_url: string | null;
  created_at: string;
  room_id: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get('room') || undefined;

  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | undefined>(initialSlug);
  const [threads, setThreads] = useState<ThreadRow[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isLoadingThreads, setIsLoadingThreads] = useState(false);

  // Load categories
  useEffect(() => {
    async function loadRooms() {
      setIsLoadingRooms(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('id, slug, title')
        .order('title', { ascending: true });

      if (error) {
        console.error('Error loading rooms', error);
        setRooms([]);
        setIsLoadingRooms(false);
        return;
      }

      const typed = (data || []) as Room[];
      setRooms(typed);

      if (!activeSlug && typed.length > 0) {
        setActiveSlug(typed[0].slug);
      }

      setIsLoadingRooms(false);
    }

    loadRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeRoom =
    rooms.find((r) => r.slug === activeSlug) || (rooms.length > 0 ? rooms[0] : undefined);

  // Load threads for active category
  useEffect(() => {
    if (!activeRoom) {
      setThreads([]);
      return;
    }

    async function loadThreads() {
      setIsLoadingThreads(true);
      const { data, error } = await supabase
        .from('threads')
        .select('id, title, body, link_url, created_at, room_id')
        .eq('room_id', activeRoom.id)
        .eq('is_archived', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading threads', error);
        setThreads([]);
      } else {
        setThreads((data || []) as ThreadRow[]);
      }

      setIsLoadingThreads(false);
    }

    loadThreads();
  }, [activeRoom]);

  function handleChangeRoom(slug: string) {
    setActiveSlug(slug);
    router.push(`/home?room=${slug}`);
  }

  function handleShare() {
    if (!activeRoom) return;
    router.push(`/share?room=${activeRoom.slug}`);
  }

  if (isLoadingRooms && rooms.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5eedf] flex items-center justify-center px-6 text-center">
        <p className="text-sm text-neutral-600">
          Loading Nouk&hellip;
        </p>
      </main>
    );
  }

  if (!isLoadingRooms && rooms.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5eedf] flex items-center justify-center px-6 text-center">
        <p className="text-sm text-neutral-700">
          Nouk is almost ready, but there are no categories yet. Add a few rows to the
          <span className="font-mono"> rooms</span> table (e.g. gaming, music, movies) in Supabase.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5eedf]">
      <div className="max-w-xl mx-auto px-4 pb-16 pt-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-neutral-900">Inside Nouk</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Small posts. Short conversations. Everything fades after a while.
          </p>
        </header>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {rooms.map((room) => {
            const isActive = activeRoom && room.id === activeRoom.id;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => handleChangeRoom(room.slug)}
                className={
                  'px-4 py-2 rounded-full text-sm border transition ' +
                  (isActive
                    ? 'bg-neutral-900 text-[#f5eedf] border-neutral-900 shadow-md'
                    : 'bg-[#f5eedf] text-neutral-800 border-neutral-400')
                }
              >
                {room.title}
              </button>
            );
          })}
        </div>

        {/* Share button */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={handleShare}
            className="px-6 py-2 rounded-full bg-neutral-900 text-[#f5eedf] text-sm font-medium shadow-md active:scale-[0.98]"
          >
            Share a Thought
          </button>
        </div>

        {/* Threads list */}
        {isLoadingThreads ? (
          <p className="mt-10 text-center text-sm text-neutral-600">Loading posts&hellip;</p>
        ) : threads.length === 0 ? (
          <p className="mt-10 text-center text-sm text-neutral-600">
            It&apos;s quiet in <span className="font-medium">{activeRoom?.title}</span>. Be the first to
            post something.
          </p>
        ) : (
          <div className="space-y-4">
            {threads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => router.push(`/thread/${thread.id}`)}
                className="w-full text-left bg-white rounded-3xl shadow-sm border border-neutral-200 px-4 py-3 active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {thread.title && (
                      <p className="text-sm font-semibold text-neutral-900 break-words">
                        {thread.title}
                      </p>
                    )}
                    {thread.body && (
                      <p className="mt-1 text-sm text-neutral-800 break-words line-clamp-2">
                        {thread.body}
                      </p>
                    )}
                    {thread.link_url && (
                      <p className="mt-2 text-xs text-neutral-500 break-all">
                        <span className="font-medium">Link:</span>{' '}
                        <span>{thread.link_url}</span>
                      </p>
                    )}
                  </div>
                  <p className="ml-2 mt-1 shrink-0 text-[11px] text-neutral-500 text-right">
                    {formatDate(thread.created_at)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
