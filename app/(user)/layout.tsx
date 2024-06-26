import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Footer from '@/components/footer';
import { Providers } from '@/app/(user)/providers';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense } from 'react';
import Loading from '@/app/(user)/loading';
import Error from '@/app/(user)/error';
import { NavigationBar } from '@/components/navigationBar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <NavigationBar />
          <main className="container mx-auto min-h-[680px] max-w-7xl px-6">
            <ErrorBoundary errorComponent={Error}>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
