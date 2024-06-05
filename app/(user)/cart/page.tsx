import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CartComponent from '@/components/CartComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Cart Page',
	description: 'This is a Cart Page',
};

export default function CartPage() {
  return (
    <>
      <CartComponent />
    </>
  );
}
