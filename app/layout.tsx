import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/app/providers';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense } from 'react';
import Loading from '@/app/(user)/loading';
import error from '@/app/error';

import FooterComponent from '@/components/footerComponent';
import { Metadata } from 'next';

import { NavigationBar } from '@/components/navigationBar';
import StoreProvider from '@/app/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'This is a Error Page 404',
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
      <body>
        <StoreProvider>
          <Providers>
            <NavigationBar />
            <main className="container mx-auto min-h-[680px] max-w-7xl px-6">
              <ErrorBoundary errorComponent={error}>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </ErrorBoundary>
            </main>
            <FooterComponent />
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
