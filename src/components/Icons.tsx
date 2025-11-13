"use client";

import React from "react";

// Base icon style (uniform stroke width)
const base = "w-6 h-6 stroke-[2]";

export function IconLibrary(props: any) {
  return (
    <svg
      {...props}
      className={`${base} ${props.className || ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect x="3" y="4" width="4" height="16" rx="1" />
      <rect x="10" y="4" width="4" height="16" rx="1" />
      <rect x="17" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

export function IconKitchen(props: any) {
  return (
    <svg
      {...props}
      className={`${base} ${props.className || ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M4 3h16v6H4z" />
      <path d="M7 9v12" />
      <path d="M17 9v12" />
      <rect x="9" y="13" width="6" height="4" rx="1" />
    </svg>
  );
}

export function IconTheater(props: any) {
  return (
    <svg
      {...props}
      className={`${base} ${props.className || ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 15h0.01" />
      <path d="M17 15h0.01" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function IconGame(props: any) {
  return (
    <svg
      {...props}
      className={`${base} ${props.className || ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect x="2" y="7" width="20" height="10" rx="3" />
      <path d="M8 12h0.01" />
      <path d="M12 12h0.01" />
      <path d="M16 12h0.01" />
    </svg>
  );
}

export function IconGarage(props: any) {
  return (
    <svg
      {...props}
      className={`${base} ${props.className || ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M3 10l9-6 9 6" />
      <rect x="6" y="10" width="12" height="10" rx="1" />
      <path d="M10 14h4" />
    </svg>
  );
}

export function IconStudy(props: any) {
  return (
    <svg
      {...props}
      className={`${base} ${props.className || ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M4 10l8-4 8 4" />
      <path d="M4 10v6l8 4 8-4v-6" />
    </svg>
  );
}

export function IconChevron(props: any) {
  return (
    <svg
      {...props}
      className={`${base} ${props.className || ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
