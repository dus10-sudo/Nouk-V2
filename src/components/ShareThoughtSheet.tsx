"use client";

import { useEffect, useState } from "react";

type MoodId = "calm" | "heavy" | "random" | "wonder";

const MOODS: { id: MoodId; label: string }[] = [
  { id: "calm", label: "Calm" },
  { id: "heavy", label: "Heavy" },
  { id: "random", label: "Random" },
  { id: "wonder", label: "Wonder" },
];

type ShareThoughtSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onPost?: (data: { text: string; mood: MoodId | null }) => void;
};

export function ShareThoughtSheet({
  isOpen,
  onClose,
  onPost,
}: ShareThoughtSheetProps) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState<MoodId | null>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Reset state whenever we fully close
  useEffect(() => {
    if (!isOpen) {
      setText("");
      setMood(null);
      setIsAnimatingOut(false);
    }
  }, [isOpen]);

  // Handle clicking the dimmed overlay
  const handleOverlayClick = () => {
    if (isAnimatingOut) return;
    onClose();
  };

  const handleSheetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlePost = () => {
    if (!text.trim()) return;

    setIsAnimatingOut(true);

    setTimeout(() => {
      onPost?.({
        text: text.trim(),
        mood,
      });
      onClose();
    }, 220); // matches transition duration
  };

  // Base classes for overlay + sheet
  const overlayBase =
    "fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity duration-300";
  const overlayState = isOpen
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  const sheetBase =
    "fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-3xl bg-[#F8EEE0]/95 shadow-xl border border-black/5 px-5 pt-4 pb-6 " +
    "transform transition-transform duration-300 origin-bottom";
  const sheetState = !isOpen
    ? "translate-y-full"
    : isAnimatingOut
    ? "translate-y-4 scale-[0.97] opacity-0"
    : "translate-y-0 opacity-100";

  return (
    <div
      className={`${overlayBase} ${overlayState}`}
      aria-hidden={!isOpen}
      onClick={handleOverlayClick}
    >
      <div className={`${sheetBase} ${sheetState}`} onClick={handleSheetClick}>
        {/* Drag handle / subtle bar */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/10" />

        {/* Header */}
        <div className="mb-3">
          <div className="text-[11px] tracking-[0.25em] text-amber-800/70 uppercase">
            Nouk
          </div>
          <h2 className="mt-1 text-xl font-semibold text-stone-900">
            Share a thought
          </h2>
          <p className="mt-1 text-[13px] text-stone-600">
            Just a small moment. It will fade on its own.
          </p>
        </div>

        {/* Mood selector */}
        <div className="mb-3 flex flex-wrap gap-2">
          {MOODS.map((m) => {
            const selected = mood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMood(selected ? null : m.id)}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition
                  ${
                    selected
                      ? "border-amber-500 bg-amber-500 text-white shadow-md"
                      : "border-amber-200/70 bg-amber-50/80 text-amber-900/90 hover:bg-amber-100"
                  }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Text area */}
        <div className="mb-4">
          <div className="rounded-2xl border border-amber-100/80 bg-[#FDF7EC]/95 shadow-inner">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-2xl bg-transparent px-4 py-3 text-[15px] text-stone-900 placeholder:text-stone-400 focus:outline-none"
              placeholder="What’s on your mind tonight?"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-1 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-stone-300/80 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100/70 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handlePost}
            disabled={!text.trim() || isAnimatingOut}
            className={`
              relative inline-flex items-center justify-center overflow-hidden rounded-full
              px-6 py-2.5 text-sm font-semibold
              shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_14px_30px_rgba(0,0,0,0.25)]
              transition disabled:opacity-60 disabled:cursor-not-allowed
              bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950
              ${text.trim() ? "animate-pulse" : ""}
            `}
          >
            {/* inner glow */}
            <span className="pointer-events-none absolute inset-0 opacity-90 mix-blend-screen bg-[radial-gradient(circle_at_30%_0,rgba(255,255,255,0.9),transparent_55%)]" />
            <span className="relative flex items-center gap-1">
              <span className="text-xs">🕯️</span>
              <span>Post</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
