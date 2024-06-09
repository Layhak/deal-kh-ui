import React from 'react'
import Accessory from '@/components/pages/Accessory';
import { Metadata } from 'next';
import Products from '@/components/pages/AllProduct';
import Buy1Get1Component from '@/components/pages/Buy1Get1';
import Cloth from '@/components/pages/Cloth';
import Coupon from '@/components/pages/Coupon';

export const metadata: Metadata = {
  title: 'Coupon Page',
  description: 'This is a Coupon Page',
  openGraph: {
    images: [
      {
        url: '/icon.png',
        alt: "DealKH Logo Ecommerce Website",
      },
    ],
  },
};


export default function page() {
  return (
    <main>
      <Coupon/>
    </main>
  )
}
