import React from 'react'
import Accessory from '@/components/pages/Accessory';
import { Metadata } from 'next';
import Products from '@/components/pages/AllProduct';
import Buy1Get1Component from '@/components/pages/Buy1Get1';
import Cloth from '@/components/pages/Cloth';
import Coupon from '@/components/pages/Coupon';
import Deal from '@/components/pages/Deal';
import Discount from '@/components/pages/DiscountOff';
import Drink from '@/components/pages/Drink';
import Electronic from '@/components/pages/Electronic';

export const metadata: Metadata = {
  title: 'Electronic Page',
  description: 'This is a Electronic Page',
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
      <Electronic/>
    </main>
  )
}