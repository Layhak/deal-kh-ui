import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { fileImgUrl } from '@/libs/ImageUrl';
import AboutPageComponent from '@/components/about-page/AboutPageComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'About us',
};


export default function AboutPage() {
  return (
    <>
      <AboutPageComponent />
    </>
  );
}
