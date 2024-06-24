import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'text-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '-200% 50%' },
        },
      },
      animation: {
        'text-gradient': 'text-gradient 3s linear infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          extend: 'light',
          colors: {
            background: 'rgb(243, 244, 246)',
            foreground: '#000000',
          },
        },
        dark: {
          extend: 'dark',
          colors: {
            background: '#18181d',
            foreground: '#ffffff',
          },
        },
      },
    }),
  ],
};
export default config;
