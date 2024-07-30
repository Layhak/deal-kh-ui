import '@/styles/globals.css';
import { Providers } from '@/app/providers';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense } from 'react';
import Loading from '@/app/(user)/loading';
import error from '@/app/(user)/error';
import 'react-toastify/dist/ReactToastify.css';
import FooterComponent from '@/components/FooterComponent';
import SessionWrapper from '../SessionProvider';
import { Metadata } from 'next';
import { NavigationBar } from '@/components/navigationBar';
import StoreProvider from '@/app/StoreProvider';
import { inter, kantumruyPro } from '@/utils/fonts';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  manifest: '/manifest.json',
  description: siteConfig.description,
  keywords: siteConfig.metadata.keywords,
  openGraph: siteConfig.metadata.openGraph,
  twitter: siteConfig.metadata.twitter,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'en'} suppressHydrationWarning>
      <head></head>
      <SessionWrapper>
        <body className={`${kantumruyPro.variable} ${inter.variable}`}>
          <StoreProvider>
            <Providers>
              <NavigationBar />
              <main className={`min-h-screen`}>
                <ErrorBoundary errorComponent={error}>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </ErrorBoundary>
              </main>
              <FooterComponent />
            </Providers>
          </StoreProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
