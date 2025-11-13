import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function wrap(path: React.ReactNode) {
  return ({ size = 28, ...rest }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {path}
    </svg>
  );
}

// Library (books)
export const IconLibrary = wrap(
  <>
    <rect x="4" y="3" width="3" height="18" />
    <rect x="9" y="3" width="3" height="18" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14h-4V4z" />
  </>
);

// Kitchen (pot)
export const IconKitchen = wrap(
  <>
    <rect x="3" y="9" width="18" height="9" rx="2" />
    <path d="M7 9V7a2 2 0 0 1 2-2h6" />
    <path d="M12 5h7" />
  </>
);

// Theater (screen)
export const IconTheater = wrap(
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M7 20h10" />
  </>
);

// Game Room (gamepad)
export const IconGame = wrap(
  <>
    <rect x="3" y="9" width="18" height="6" rx="3" />
    <path d="M8 12h0M10 12h0M14.5 12h.01M16.5 12h.01" />
  </>
);

// Garage (toolbox)
export const IconGarage = wrap(
  <>
    <rect x="4" y="8" width="16" height="10" rx="2" />
    <path d="M9 8V6h6v2" />
    <path d="M8 13h8" />
  </>
);

// Study (desk)
export const IconStudy = wrap(
  <>
    <rect x="3" y="10" width="18" height="8" rx="2" />
    <path d="M7 10V7h10v3" />
  </>
);

export type { IconProps };
