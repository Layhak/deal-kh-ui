'use client';
import CardDetailComponent from '@/components/card/CardDetailComponent';
import NormalProductComponent from '@/components/card/NormalProduct';
import ReviewProductDetailComponent from '@/components/card/review/ReviewProductDetailComponent';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div>
      <div className="lg:my-8 my-4 px-4 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Product <span className="text-[#eb7d52]">Detail</span>
          </p>
        </div>
      </div>
      {/* card detail of the product */}
      <CardDetailComponent />
      {/* review section */}
      <ReviewProductDetailComponent />
      {/* related product */}
      <NormalProductComponent />
    </div>
  );
}
