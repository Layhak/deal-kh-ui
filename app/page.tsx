'use client';
import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import CardComponent from '@/components/CardComponent';

export default function Page() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      {/* Component food */}
      <CardComponent category='Food' />
      {/* Component drink */}
      <CardComponent category='Drink'/>
      {/* Component clothes */}
      <CardComponent category='Clothes'/>
      {/* Component Accessories */}
      <CardComponent category='Accessories'/>
      {/* Component skin care */}
      <CardComponent category='Skin Care'/>
      {/* Component shoes */}
      <CardComponent category='Shoes'/>
      {/* Component electronics */}
      <CardComponent category='Electronics'/>
    </>
  );
}
