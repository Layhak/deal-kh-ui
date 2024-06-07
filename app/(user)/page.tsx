"use client";

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
        <main>
          <HeroSlideComponent />
          {/* <CardDiscountComponent /> */}
        </main>
    </>
  );
}
