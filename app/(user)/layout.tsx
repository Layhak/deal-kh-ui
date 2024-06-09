
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/app/(user)/providers';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense } from 'react';
import Loading from '@/app/(user)/loading';
import Error from '@/app/(user)/error';
import { NavigationBar } from '@/components/navigationBar';
import FooterComponent from '@/components/footerComponent';
import SessionWrapper from './SessionProvider';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'This is a Home Page',
  openGraph: {
    images: [
      {
        url: '/icon.png',
        alt: "DealKH Logo Ecommerce Website",
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
          <Providers>
            <NavigationBar />
            <main className="container mx-auto min-h-[680px] max-w-7xl px-6">
              <ErrorBoundary errorComponent={Error}>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </ErrorBoundary>
            </main>
            <FooterComponent />
          </Providers>
        </body>
      </SessionWrapper>
    </html>
  );
}
