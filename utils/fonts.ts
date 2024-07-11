import { Inter, Kantumruy_Pro } from 'next/font/google';

export const kantumruyPro = Kantumruy_Pro({
  subsets: ['khmer'],
  display: 'swap',
  variable: '--font-kantumruy-pro',
  weight: ['400', '500', '600', '700'],
});
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});
