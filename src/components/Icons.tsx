// src/components/Icons.tsx
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function IconLibrary(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={`w-5 h-5 ${props.className ?? ""}`}
    >
      <rect x="4" y="5" width="4" height="14" rx="1.2" />
      <rect x="10" y="3" width="4" height="16" rx="1.2" />
      <rect x="16" y="7" width="4" height="12" rx="1.2" />
    </svg>
  );
}

export function IconKitchen(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={`w-5 h-5 ${props.className ?? ""}`}
    >
      <path d="M7 3v18M5 7h4M13 4h4a1 1 0 0 1 1 1v6.5a3.5 3.5 0 0 1-7 0V5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function IconTheater(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={`w-5 h-5 ${props.className ?? ""}`}
    >
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 17 6 20M16 17l2 3" />
      <circle cx="9" cy="11" r="1" />
      <circle cx="15" cy="11" r="1" />
    </svg>
  );
}

export function IconGame(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={`w-5 h-5 ${props.className ?? ""}`}
    >
      <rect x="4" y="8" width="16" height="8" rx="3" />
      <path d="M9 10v4M7 12h4" />
      <circle cx="16" cy="11" r="1" />
      <circle cx="18" cy="13" r="1" />
    </svg>
  );
}

export function IconGarage(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={`w-5 h-5 ${props.className ?? ""}`}
    >
      <path d="M4 9 12 4l8 5v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
      <rect x="8" y="12" width="8" height="5" rx="0.7" />
      <path d="M8 14h8" />
    </svg>
  );
}

export function IconStudy(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={`w-5 h-5 ${props.className ?? ""}`}
    >
      <path d="M4 7.5 12 4l8 3.5-8 3.5z" />
      <path d="M6 10v6.5L12 20l6-3.5V10" />
    </svg>
  );
}

export function IconChevron(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={`w-5 h-5 ${props.className ?? ""}`}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
