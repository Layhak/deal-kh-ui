'use client';
import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import DiscountCardComponent from '@/components/card/CardComponent';
import HeroSlideComponent from '@/components/slider/HeroSlide';

export default function Page() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
    <main>
      <HeroSlideComponent/>
      <DiscountCardComponent/>
    </main>
      
    </>
  );
}
