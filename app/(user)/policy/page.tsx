import React from 'react';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import PolicyPageComponent from '@/components/policy-page/PolicyPageComponent';
import { fileImgUrl } from '@/libs/ImageUrl';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Policy Page',
};


export default function PolicyPage() {
  return (
    <>
      <PolicyPageComponent />
    </>
  );
}
