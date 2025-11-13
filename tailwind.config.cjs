import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        card: 'var(--card)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        ring: 'var(--ring)',
        accentInk: 'var(--accent-ink)',
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 0 rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)',
        soft: '0 0 0 1px var(--ring), 0 6px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
export default config;
