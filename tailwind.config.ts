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
      // backgroundImage: {
      //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //     "gradient-conic":
      //         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          extend: 'light',
          colors: {
            background: '#ffffff',
            foreground: '#000000',
            primary: {
              50: '#83184d',
              100: '#9d1759',
              200: '#be186a',
              300: '#db2780',
              400: '#ec4899',
              500: '#f472b2',
              600: '#f9a8d0',
              700: '#fbcfe5',
              800: '#FDD5F9',
              900: '#FEECFE',
              DEFAULT: '#EC4899',
              foreground: '#ffffff',
            },
            focus: '#db2780',
          },
        },
        'pink-dark': {
          extend: 'dark',
          colors: {
            background: '#18181b',
            foreground: '#ffffff',
            primary: {
              50: '#83184d',
              100: '#9d1759',
              200: '#be186a',
              300: '#db2780',
              400: '#ec4899',
              500: '#f472b2',
              600: '#f9a8d0',
              700: '#fbcfe5',
              800: '#FDD5F9',
              900: '#FEECFE',
              DEFAULT: '#EC4899',
              foreground: '#ffffff',
            },
            focus: '#db2780',
          },
        },
      },
    }),
  ],
};
export default config;
