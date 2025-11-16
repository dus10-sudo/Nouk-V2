// src/components/ShareThought.tsx
'use client';

import { useState } from 'react';

export default function ShareThoughtButton() {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    // Placeholder action for now – you can wire this up to whatever later.
    // For now we just briefly animate the button.
    setTimeout(() => setPressed(false), 200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full rounded-[999px] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_16px_38px_rgba(120,74,38,0.55)] transition-all duration-150
        ${pressed ? 'translate-y-[1px] shadow-[0_8px_18px_rgba(120,74,38,0.45)]' : ''}
      `}
      style={{
        // Softer, more muted orange (less neon)
        background: '#E37F3F',
      }}
    >
      Share a Thought
    </button>
  );
}
