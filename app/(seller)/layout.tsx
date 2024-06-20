"use client";
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/app/(user)/providers';
import { useState } from 'react';

import SessionWrapper from '@/app/(user)/SessionProvider';
import NavbarSellerComponent from '@/app/(seller)/component/navbar/navbarComponent';
import useColorMode from '@/hooks/useColorMode';
import SidebarSellerComponent from '@/app/(seller)/component/sidebar/sidebarComponent';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [colorMode, setColorMode] = useColorMode(); 

  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <SessionWrapper>
        <body className="bg-gray-100 ">
          <Providers>
            <div className="flex h-screen overflow-hidden">
              <SidebarSellerComponent/>
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <NavbarSellerComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="dark:bg-black">
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </Providers>
        </body>
      </SessionWrapper>
    </html>
  );
}
