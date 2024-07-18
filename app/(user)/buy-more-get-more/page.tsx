import React from 'react'
import { Metadata } from 'next';
import Buy1Get1Component from '@/components/pages/Buy1Get1';
import { fileImgUrl } from '@/libs/ImageUrl';

export const metadata: Metadata = {
  title: 'Buy More, Get More - Exclusive Offers at DealKH',
  description:
    'Unlock exclusive offers and discounts with DealKH Buy More, Get More promotions. Save more as you shop more with amazing deals in Cambodia.',
  keywords:
    'buy more get more, exclusive offers, Cambodia discounts, shop more save more, shopping deals, DealKH promotions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealkh.istad.co/buy-more-get-more',
    title: 'Buy More, Get More - Exclusive Offers at DealKH',
    description:
      'Unlock exclusive offers and discounts with DealKH Buy More, Get More promotions. Save more as you shop more with amazing deals in Cambodia.',
    images: [
      {
        url: fileImgUrl('/icon.png'),
        alt: 'DealKH Buy More Get More Icon',
      },
      {
        url: fileImgUrl('/banner.jpg'),
        alt: 'Exclusive Buy More, Get More Deals in Cambodia',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
};



export default function page() {
  return (
    <div>
      <Buy1Get1Component/>
    </div>
  )
}
