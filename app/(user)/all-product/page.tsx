import React from 'react';
import { Metadata } from 'next';
import Products from '@/components/pages/AllProduct';

export const metadata: Metadata = {
  title: 'Products Page',
  description: 'This is a Products Page',
  openGraph: {
    images: [
      {
        url: '/icon.png',
        alt: 'DealKH Logo Ecommerce Website',
      },
    ],
  },
};

export default function page() {
  return (
    <main>
      <Products />
    </main>
  );
}
