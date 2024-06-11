"use client"
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/app/(user)/providers';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense, useState } from 'react';
import Loading from '@/app/(user)/loading';
import Error from '@/app/(user)/error';

import FooterComponent from '@/components/footerComponent';
import SessionWrapper from '@/app/(user)/SessionProvider';
import { Metadata } from 'next';
import { NavigationBar } from '@/components/navigationBar';
import SidebarSellerComponent from './component/sidebar/sidebarComponent';
import NavbarSellerComponent from './component/navbar/navbarComponent';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <SessionWrapper>
        <body className="bg-gray-100">
          <Providers>
          <div className="flex h-screen overflow-hidden">
       
       <SidebarSellerComponent/>
              
       <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
       
         <NavbarSellerComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
     
         <main>
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