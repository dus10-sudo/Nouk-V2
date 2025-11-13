// src/components/NewThreadButton.tsx
"use client";

import { useState } from "react";

type Props = {
  onCreate: (title: string) => Promise<void> | void;
  label?: string;
};

export default function NewThreadButton({ onCreate, label = "New thread" }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <>
      <button
        className="rounded-full px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 transition-colors"
        onClick={() => setOpen(true)}
      >
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-700/60 p-4">
            <h4 className="text-lg font-semibold mb-3">Start a new thread</h4>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Optional title…"
              className="w-full rounded-xl border border-neutral-300/70 dark:border-neutral-700/70 bg-white/80 dark:bg-neutral-900/80 px-3 py-2"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 border border-neutral-300/70 dark:border-neutral-700/70"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await onCreate(title.trim());
                  setTitle("");
                  setOpen(false);
                }}
                className="rounded-xl px-3 py-2 bg-amber-600 text-white hover:bg-amber-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
