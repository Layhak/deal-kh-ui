import React from 'react';
import { Metadata } from 'next';

import Deal from '@/components/pages/Deal';
import { fileImgUrl } from '@/libs/ImageUrl';

export const metadata: Metadata = {
  title: 'Discover the Best Deals in Cambodia - DealKH',
  description:
    'Find unbeatable deals and discounts on a wide range of products at DealKH. Shop smart and save big with the best offers in Cambodia.',
  keywords:
    'Cambodia deals, best deals, shopping discounts, exclusive offers, unbeatable deals, DealKH',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealkh.istad.co/deal',
    title: 'Discover the Best Deals in Cambodia - DealKH',
    description:
      'Find unbeatable deals and discounts on a wide range of products at DealKH. Shop smart and save big with the best offers in Cambodia.',
    images: [
      {
        url: fileImgUrl('/icon.png'),
        alt: 'DealKH Deals Icon',
      },
      {
        url: fileImgUrl('/banner.jpg'),
        alt: 'Unbeatable Deals in Cambodia',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
};


export default function page() {
  return (
    <main>
      <Deal />
    </main>
  );
}
