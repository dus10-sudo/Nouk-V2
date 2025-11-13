// src/components/Icons.tsx
// Clean SVG icon set for Nouk rooms

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
};

export function IconLibrary(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* standing book */}
      <rect
        x={4}
        y={4}
        width={4}
        height={14}
        rx={1.4}
        fill="currentColor"
        opacity={0.18}
      />
      <rect
        x={4.75}
        y={5}
        width={2.5}
        height={12}
        rx={1.1}
        stroke="currentColor"
        strokeWidth={1.4}
      />
      {/* stacked book */}
      <rect
        x={10}
        y={6}
        width={4.5}
        height={12}
        rx={1.4}
        fill="currentColor"
        opacity={0.06}
      />
      <rect
        x={10.75}
        y={7}
        width={3}
        height={10}
        rx={1.1}
        stroke="currentColor"
        strokeWidth={1.4}
      />
      {/* little bookmark line */}
      <path
        d="M12 9.25h1.5"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconKitchen(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* pot body */}
      <rect
        x={3.5}
        y={9}
        width={13}
        height={8}
        rx={1.8}
        fill="currentColor"
        opacity={0.08}
      />
      <rect
        x={4.5}
        y={9.75}
        width={11}
        height={6.5}
        rx={1.4}
        stroke="currentColor"
        strokeWidth={1.4}
      />
      {/* handle */}
      <path
        d="M17 11.5h2.2a1.1 1.1 0 0 1 1.1 1.1v1.8a.6.6 0 0 1-.6.6H18"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {/* lid */}
      <path
        d="M6 9.1C6.4 7.8 7.6 7 9.5 7s3.1.8 3.5 2.1"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {/* knob */}
      <path
        d="M9.5 5.4v1.2"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconTheater(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* clapper top */}
      <path
        d="M4 6h12.5c.6 0 1 .4 1 1v1.2H4V6Z"
        fill="currentColor"
        opacity={0.16}
      />
      <path
        d="M4 7.4 7.2 5m2.3 0 3.2 2.4m2.3-2.4 2.3 1.7"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {/* body */}
      <rect
        x={4}
        y={8.5}
        width={15.5}
        height={9.5}
        rx={1.6}
        stroke="currentColor"
        strokeWidth={1.4}
        fill="currentColor"
        fillOpacity={0.04}
      />
      {/* play button */}
      <path
        d="M11 11.6v4l3-2-3-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconGame(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* controller body */}
      <path
        d="M6.4 10.5 8 8.5h8l1.6 2a4 4 0 0 1 .9 2.5V14a2.5 2.5 0 0 1-3.7 2.1l-1.4-.8a2 2 0 0 0-2-.01l-1.4.8A2.5 2.5 0 0 1 5.6 14v-1a4 4 0 0 1 .8-2.5Z"
        fill="currentColor"
        opacity={0.08}
      />
      <path
        d="M7 10.5 8.3 9h7.4L17 10.5a3.2 3.2 0 0 1 .7 2V14a1.7 1.7 0 0 1-2.6 1.4l-1.4-.8a2.8 2.8 0 0 0-2.8 0l-1.4.8A1.7 1.7 0 0 1 6.7 14v-1.5c0-.7.3-1.4.7-2Z"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      {/* dpad */}
      <path
        d="M9 11.5v2.2M7.9 12.6h2.2"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {/* buttons */}
      <circle
        cx={14.8}
        cy={12.1}
        r={0.6}
        fill="currentColor"
      />
      <circle
        cx={16.2}
        cy={13.5}
        r={0.6}
        fill="currentColor"
      />
    </svg>
  );
}

export function IconGarage(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* toolbox body */}
      <rect
        x={4}
        y={9}
        width={16}
        height={9}
        rx={1.8}
        fill="currentColor"
        opacity={0.06}
      />
      <rect
        x={5}
        y={9.8}
        width={14}
        height={7.4}
        rx={1.4}
        stroke="currentColor"
        strokeWidth={1.4}
      />
      {/* handle */}
      <rect
        x={8.2}
        y={6}
        width={7.6}
        height={2.4}
        rx={1}
        stroke="currentColor"
        strokeWidth={1.4}
      />
      {/* divider line */}
      <path
        d="M6.5 13h11"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconStudy(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* cap */}
      <path
        d="M4 9.5 12 6l8 3.5-8 3.5L4 9.5Z"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity={0.05}
      />
      {/* tassel */}
      <path
        d="M12 13v3"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <circle
        cx={12}
        cy={16.8}
        r={0.9}
        fill="currentColor"
      />
      {/* underside */}
      <path
        d="M7.5 11.4V14c0 .9 1.8 1.8 4.5 1.8s4.5-.9 4.5-1.8v-2.6"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
