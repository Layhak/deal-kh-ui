import React from 'react';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import PolicyPageComponent from '@/components/policy-page/PolicyPageComponent';
import { fileImgUrl } from '@/libs/ImageUrl';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Policies and Terms of Use - DealKH',
  description:
    'Read our policies and terms of use at DealKH. Understand our guidelines for shopping, returns, privacy, and more.',
  keywords:
    'DealKH policies, terms of use, privacy policy, shopping guidelines, returns policy, Cambodia terms, DealKH',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealkh.istad.co/policy',
    title: 'Policies and Terms of Use - DealKH',
    description:
      'Read our policies and terms of use at DealKH. Understand our guidelines for shopping, returns, privacy, and more.',
    images: [
      {
        url: fileImgUrl('/policies-icon.png'),
        alt: 'DealKH Policies Icon',
      },
      {
        url: fileImgUrl('/policies-banner.jpg'),
        alt: 'Policies and Terms of Use',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
};


export default function PolicyPage() {
  return (
    <>
      <PolicyPageComponent />
    </>
  );
}
