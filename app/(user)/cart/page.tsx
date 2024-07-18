import React from 'react';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { fileImgUrl } from '@/libs/ImageUrl';
import CartComponent from '@/components/card/cartComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shopping Cart - DealKH',
  description:
    'Review your selected items and proceed to checkout. Enjoy great deals and discounts on your favorite products at DealKH.',
  keywords:
    'shopping cart, DealKH cart, review items, checkout, shopping deals, Cambodia discounts, buy now, online shopping',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealkh.istad.co/cart',
    title: 'Your Shopping Cart - DealKH',
    description:
      'Review your selected items and proceed to checkout. Enjoy great deals and discounts on your favorite products at DealKH.',
    images: [
      {
        url: fileImgUrl('/icon.png'),
        alt: 'DealKH Cart Icon',
      },
      {
        url: fileImgUrl('/banner.jpg'),
        alt: 'Review Your Shopping Cart Items',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
};

export default function CartPage() {
  return (
    <main>
      <CartComponent />
    </main>
  );
}
