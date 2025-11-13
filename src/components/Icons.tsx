// src/components/Icons.tsx

import React from "react";

// -------------------------
// Sprout logo (Nouk symbol)
// -------------------------
export function IconSprout(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20v-7" />
        <path d="M12 13c0-3.5-2.2-6-5.5-6.5C5 9 6.5 12 9.5 13.2c.8.3 1.7.5 2.5.5z" />
        <path d="M12 13c0-3.5 2.2-6 5.5-6.5C19 9 17.5 12 14.5 13.2c-.8.3-1.7.5-2.5.5z" />
      </g>
    </svg>
  );
}

// -------------------------
// Room icons
// -------------------------

export function IconLibrary(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="4" y="4" width="4" height="16" rx="1" />
      <rect x="10" y="4" width="4" height="16" rx="1" />
      <rect x="16" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

export function IconKitchen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20h14v-2a5 5 0 0 0-5-5H10a5 5 0 0 0-5 5v2z" />
    </svg>
  );
}

export function IconTheater(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 20h10" />
    </svg>
  );
}

export function IconGame(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="8" width="18" height="10" rx="3" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
    </svg>
  );
}

export function IconGarage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 20V9l8-5 8 5v11" />
      <rect x="7" y="13" width="10" height="7" rx="1" />
    </svg>
  );
}

export function IconStudy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 19V5l8-3 8 3v14" />
      <path d="M12 12v8" />
    </svg>
  );
}
