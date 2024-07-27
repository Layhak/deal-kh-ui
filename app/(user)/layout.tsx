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
import { ToastContainer } from 'react-toastify';
import { fileImgUrl } from '@/libs/ImageUrl';
import { inter, kantumruyPro } from '@/utils/fonts';
import FilterComponent from '@/components/FilterCategory';

export const metadata: Metadata = {
  title: 'Istad DealKH | Platform for Cambodian Deals',
  manifest: '/manifest.json',
  description:
    'Find the best deals, coupons, and promotions from shops in Cambodia. Save big on your shopping with exclusive offers and discounts at DealKH.',
  keywords: ['Dealkh', 'Deal kh', 'Deal-kh', 'dealkh istad', 'dealkh-istad'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.dealkh.istad.co/',
    title: 'Istad DealKH | Platform for Cambodian Deals',
    description:
      'Discover the latest deals, coupons, and promotions from shops in Cambodia at DealKH. Save on your shopping with our curated list of discounts and offers.',
    images: [
      {
        url: process.env.NEXT_PUBLIC_LOGO_URL + 'logo.png',
        alt: 'DealKH Logo Ecommerce Website',
      },
      {
        url: fileImgUrl('3ef8a1e1-0b19-463d-ac76-655868c26418.png'),
        alt: 'Exclusive Shopping Deals in Cambodia',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
  twitter: {
    site: 'Ecommerce',
    title: 'Istad DealKH | Platform for Cambodian Deals',
    description:
      'Find the best deals, coupons, and promotions from shops in Cambodia. Save big on your shopping with exclusive offers and discounts at DealKH.',
    images: [
      {
        url: fileImgUrl('3ef8a1e1-0b19-463d-ac76-655868c26418.png'),
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
    <html lang={'en'} suppressHydrationWarning>
      <head></head>
      <SessionWrapper>
        <body className={`${kantumruyPro.variable} ${inter.variable}`}>
          <StoreProvider>
            <Providers>
              <NavigationBar />
              <FilterComponent />
              <ToastContainer />
              <main className={`mx-auto min-h-screen max-w-7xl px-0 lg:px-6`}>
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


// ],
