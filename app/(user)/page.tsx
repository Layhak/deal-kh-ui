"use client";

import CardComponent from '@/components/card/CardComponent';
import CardDiscountComponent from '@/components/card/discountCard';
import HeroSlideComponent from '@/components/slider/HeroSlide';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
        <main className="gap-16">
          <HeroSlideComponent />
          <CardComponent />
          <HeroSlideComponent />
          <CardComponent />
          <CardDiscountComponent />
        </main>
    </>
  );
}
