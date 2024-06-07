import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import SessionWrapper from '../SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={`${inter.className}`}>

          <main>
            {children}
          </main>

        </body>
      </SessionWrapper>
    </html>
  );
}
