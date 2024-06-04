import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Wishlist Page',
	description: 'This is a Wishlist Page',
};

export default function WishlistPage() {
  return (
    <>
      <div className=" grid justify-center place-content-center h-[100vh] text-2xl">
        <h1>Wishlist</h1>
      </div>
    </>
  );
}
