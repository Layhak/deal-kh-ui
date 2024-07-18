'use client';
import React from 'react';
import ShopCardComponent from '@/components/card/Shop';

export default function ShopListComponent() {
  return (
    <div>
      <div className="my-8 flex h-[50px] items-center justify-between">
        {/* Left section */}
        <div className="flex-1">
          <p className="relative w-fit from-pink-500 to-yellow-500 text-[20px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r lg:text-[26px]">
            Shop
          </p>
        </div>
      </div>
      <ShopCardComponent initialPage={1} size={20} />
    </div>
  );
}
