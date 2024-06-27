import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/app/providers';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense } from 'react';
import Loading from '@/app/(user)/loading';
import error from '@/app/(user)/error';

import FooterComponent from '@/components/FooterComponent';
import SessionWrapper from '../SessionProvider';
import { Metadata } from 'next';

import { NavigationBar } from '@/components/navigationBar';
import StoreProvider from '@/app/StoreProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'This is a Home Page',
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
        <body>
          <StoreProvider>
            <Providers>
              <NavigationBar />
              <main className="container mx-auto min-h-screen max-w-7xl px-0 lg:px-6">
                <ErrorBoundary errorComponent={error}>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </ErrorBoundary>
              </main>
              <FooterComponent />
              <ToastContainer />
            </Providers>
          </StoreProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
