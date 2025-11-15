'use client';

import { useState, useTransition, FormEvent } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

type ShareThoughtProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type RoomChoice = {
  id: string;
  name: string;
  description: string;
};

/**
 * Current active rooms in the app.
 * These IDs are from your `rooms` table.
 */
const ROOM_CHOICES: RoomChoice[] = [
  {
    id: 'd8b59522-3db4-4468-8191-75a8b490966a',
    name: 'Sunroom',
    description: 'For light check ins, small wins, and passing thoughts.',
  },
  {
    id: '10286a79-94df-45a2-9654-d3c48d4e2ee4',
    name: 'Living Room',
    description: 'For relaxed conversation, shared moments, and company.',
  },
  {
    id: '30d4c7f3-5372-4386-8915-2e7a46fcb7f0',
    name: 'Garden',
    description: 'For intentions, tiny steps, and gentle personal growth.',
  },
  {
    id: '6cde5c29-e87d-47e7-9554-b41ed3bb303d',
    name: 'Lantern Room',
    description: 'For heavy feelings, venting, and emotional processing.',
  },
  {
    id: '7cca5abb-cc40-48ce-9fb9-b0b41d7b67a1',
    name: 'Observatory',
    description: 'For late night thoughts, big questions, and wonder.',
  },
  {
    id: '3852a38b-ba1a-4d71-8aa1-a89015194023',
    name: 'Library',
    description: 'For journaling, prompts, and more thoughtful writing.',
  },
];

export default function ShareThought({ open, onOpenChange }: ShareThoughtProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
    ROOM_CHOICES[0]?.id ?? null
  );
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    // reset on close
    setError(null);
    setTitle('');
    setLink('');
    setSelectedRoomId(ROOM_CHOICES[0]?.id ?? null);
    onOpenChange(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedRoomId) {
      setError('Please choose a room.');
      return;
    }
    if (!title.trim()) {
      setError("Say something small to start your Nouk.");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch('/api/threads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomId: selectedRoomId,
            title: title.trim(),
            link: link.trim() || null,
          }),
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        // Success: close + reset
        handleClose();
      } catch (err) {
        console.error('Error starting Nouk:', err);
        setError('Something went wrong starting your Nouk. Please try again.');
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto border-none">
        <SheetHeader className="text-left">
          <SheetTitle className="text-base font-semibold tracking-wide text-neutral-800">
            Start a Nouk
          </SheetTitle>
          <SheetDescription className="text-sm text-neutral-600">
            Find a quiet corner for this, then let it breathe for a little while.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Room picker */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              1) Where do you want to post?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {ROOM_CHOICES.map((room) => {
                const selected = room.id === selectedRoomId;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setSelectedRoomId(room.id)}
                    className={[
                      'rounded-full border text-sm px-3 py-2 text-left transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 focus-visible:ring-offset-[#f3e4cf]',
                      selected
                        ? 'border-amber-500 bg-amber-50 text-neutral-900'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100',
                    ].join(' ')}
                    aria-pressed={selected}
                  >
                    {room.name}
                  </button>
                );
              })}
            </div>
            {selectedRoomId && (
              <p className="mt-1 text-xs text-neutral-600">
                {
                  ROOM_CHOICES.find((r) => r.id === selectedRoomId)
                    ?.description
                }
              </p>
            )}
          </div>

          {/* Text fields */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              2) What&apos;s the thread about?
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3e4cf]"
                placeholder="Say something small to start…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={240}
              />
            </label>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Optional link
              </label>
              <input
                type="url"
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3e4cf]"
                placeholder="YouTube, Spotify, article…"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          {/* Error + submit */}
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-xl bg-amber-600 text-sm font-semibold text-white hover:bg-amber-700"
              disabled={isPending}
            >
              {isPending ? 'Starting…' : 'Start Nouk'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
