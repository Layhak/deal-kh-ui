
import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Button } from '@nextui-org/react';
import MentorCard from '@/components/card-about/MentorCard';
import MemberCard from '@/components/card-about/MemberCard';
import AboutPageComponent from '@/components/AboutPage/AboutPageComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'About Page',
  description: 'About Page',
};

export default function AboutPage() {
  return (
    <>
      <AboutPageComponent />
    </>
      
  );
}
