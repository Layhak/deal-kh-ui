

import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Charts from '@/components/data/chart';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Policy Page',
	description: 'Policy Page',
};

export default function Policy() {
  return (
    <>
      <div className=" grid justify-center place-content-center h-[100vh] text-2xl">
        <h1>Policy</h1>
      </div>
    </>
  );
}
