import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { fileImgUrl } from '@/libs/ImageUrl';
import AboutPageComponent from '@/components/about-page/AboutPageComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'About Us - Learn More About DealKH',
  description:
    'Discover the story behind DealKH, our mission, and our commitment to bringing the best deals, coupons, and promotions to shoppers in Cambodia.',
  keywords:
    'About DealKH, DealKH story, DealKH mission, Cambodia deals, best deals in Cambodia, shop discounts, shopping promotions, DealKH',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealkh.istad.co/about',
    title: 'About Us - Learn More About DealKH',
    description:
      'Discover the story behind DealKH, our mission, and our commitment to bringing the best deals, coupons, and promotions to shoppers in Cambodia.',
    images: [
      {
        url: fileImgUrl('/icon.png'),
        alt: 'DealKH Logo',
      },
      {
        url: fileImgUrl('/banner.jpg'),
        alt: 'Meet the DealKH Team',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
};


export default function AboutPage() {
  return (
    <>
      <AboutPageComponent />
    </>
  );
}
