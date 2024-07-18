import React from 'react';
import { Metadata } from 'next';
import Event from '@/components/pages/Event';
import { fileImgUrl } from '@/libs/ImageUrl';

export const metadata: Metadata = {
  title: 'Discover Events and Activities in Cambodia - DealKH',
  description:
    'Explore upcoming events and activities across Cambodia. Find tickets, deals, and discounts for entertainment, festivals, and more at DealKH.',
  keywords:
    'Cambodia events, event tickets, entertainment deals, festival discounts, activities in Cambodia, DealKH events',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealkh.istad.co/event',
    title: 'Discover Events and Activities in Cambodia - DealKH',
    description:
      'Explore upcoming events and activities across Cambodia. Find tickets, deals, and discounts for entertainment, festivals, and more at DealKH.',
    images: [
      {
        url: fileImgUrl('/icon.png'),
        alt: 'DealKH Events Icon',
      },
      {
        url: fileImgUrl('/banner.jpg'),
        alt: 'Events and Activities in Cambodia',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
};


export default function page() {
  return (
    <main>
      <Event />
    </main>
  );
}
