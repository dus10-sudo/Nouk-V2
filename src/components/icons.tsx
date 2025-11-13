// src/components/icons.tsx
import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;
const base = 'w-6 h-6';

export const BooksIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={base} {...p}>
    <path d="M6 4h4a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H6v-12Z" strokeWidth="1.5" />
    <path d="M6 4h-.5A1.5 1.5 0 0 0 4 5.5v11A1.5 1.5 0 0 0 5.5 18H6" strokeWidth="1.5" />
    <path d="M14 6h4m-4 4h4m-4 4h4" strokeWidth="1.5" />
  </svg>
);

export const PotIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={base} {...p}>
    <path d="M3 11h18" strokeWidth="1.5" />
    <path d="M6 11v4a6 6 0 0 0 12 0v-4" strokeWidth="1.5" />
    <path d="M8 7h8" strokeWidth="1.5" />
  </svg>
);

export const ClapperIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={base} {...p}>
    <rect x="3" y="9" width="18" height="10" rx="2" strokeWidth="1.5" />
    <path d="M3 9l3-5 5 5M11 4l4 5 3-5" strokeWidth="1.5" />
  </svg>
);

export const GamepadIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={base} {...p}>
    <path d="M7 14h10a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3Z" strokeWidth="1.5" />
    <path d="M9 11H7m1-1v2M16 10h.01M18 12h.01" strokeWidth="1.5" />
  </svg>
);

export const ToolboxIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={base} {...p}>
    <rect x="3" y="9" width="18" height="10" rx="2" strokeWidth="1.5" />
    <path d="M8 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="1.5" />
    <path d="M3 13h18" strokeWidth="1.5" />
  </svg>
);

export const DeskIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={base} {...p}>
    <rect x="3" y="10" width="18" height="8" rx="2" strokeWidth="1.5" />
    <path d="M7 10V7h10v3" strokeWidth="1.5" />
  </svg>
);
