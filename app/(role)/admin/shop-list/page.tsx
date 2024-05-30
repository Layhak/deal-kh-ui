import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Shop List Page',
	description: 'Shop List Page',
};

export default function ShopList() {
  return (
    <>
      <div className="grid justify-center place-content-center h-[100vh] text-2xl">
        <h1>Shop List</h1>
      </div>
    </>
  );
}
