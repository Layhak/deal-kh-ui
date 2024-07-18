import React from 'react';
import { Metadata } from 'next';
import Service from '@/components/pages/Service';
import { fileImgUrl } from '@/libs/ImageUrl';

export const metadata: Metadata = {
  title: 'Our Services - DealKH',
  description:
    'Explore our range of services offered at DealKH. From customer support to delivery options, discover how we can assist you.',
  keywords:
    'services, DealKH services, customer support, delivery options, assistance, Cambodia services',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealkh.istad.co/service',
    title: 'Our Services - DealKH',
    description:
      'Explore our range of services offered at DealKH. From customer support to delivery options, discover how we can assist you.',
    images: [
      {
        url: fileImgUrl('/icon.png'),
        alt: 'DealKH Services Icon',
      },
      {
        url: fileImgUrl('/banner.jpg'),
        alt: 'Our Services at DealKH',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
};


export default function page() {
  return (
    <main>
      <Service />
    </main>
  );
}
