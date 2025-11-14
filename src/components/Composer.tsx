// src/components/Composer.tsx
'use client';

import { useState, useTransition, FormEvent } from 'react';
import { addReply } from '@/lib/actions';

type ComposerProps = {
  threadId: string;
};

export default function Composer({ threadId }: ComposerProps) {
  const [text, setText] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isPending) return;

    // optimistic clear
    const previous = text;
    setError(null);
    setText('');

    startTransition(async () => {
      try {
        await addReply(threadId, trimmed);
        // if it succeeds, we’re
