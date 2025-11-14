// src/components/Composer.tsx
"use client";

import { FormEvent, useState } from "react";

type ComposerProps = {
  onSubmit?: (text: string) => void | Promise<void>;
  placeholder?: string;
};

export default function Composer({
  onSubmit,
  placeholder = "Write a reply...",
}: ComposerProps) {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || !onSubmit) return;

    try {
      setIsSubmitting(true);
      await onSubmit(trimmed);
      setValue(""); // clear after successful submit
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-2xl border border-[var(--accent-soft)] bg-[var(--paper)] px-3 py-3 text-[15px] text-[var(--ink)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
        placeholder={placeholder}
      />
      <button
        type="submit"
        disabled={isSubmitting || !value.trim()}
        className="self-end rounded-full bg-[var(--accent)] px-5 py-2 text-[14px] font-semibold text-[var(--paper)] shadow-[0_10px_30px_rgba(0,0,0,0.25)] disabled:opacity-60 active:translate-y-[1px]"
      >
        {isSubmitting ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
