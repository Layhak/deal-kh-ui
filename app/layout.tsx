import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/app/(user)/providers';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense } from 'react';
import Loading from '@/app/(user)/loading';
import error from '@/app/(user)/error';

import { Metadata } from 'next';
import SessionWrapper from './(auth)/SessionProvider';
import StoreProvider from '@/app/(user)/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'This is a 404 Not Found Page.',
  openGraph: {
    images: [
      {
        url: '/icon.png',
        alt: 'DealKH Logo Ecommerce Website',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <SessionWrapper>
        <StoreProvider>
          <body>
            <Providers>
              <main>
                <ErrorBoundary errorComponent={error}>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </ErrorBoundary>
              </main>
            </Providers>
          </body>
        </StoreProvider>
      </SessionWrapper>
    </html>
  );
}
