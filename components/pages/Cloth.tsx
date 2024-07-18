"use client";
import React, { useState } from 'react'
import { Link, Image } from '@nextui-org/react';
import DiscountCardComponent from '@/components/card/DiscountCardComponent';
import ClearanceCardComponent from '@/components/card/ClearanceCard';
import BuyMoreGetMoreComponent from '@/components/card/BuyMoreGetMore';
import NormalProductComponent from '@/components/card/NormalProduct';

export default function Cloth() {

  return (
    <main>
      {/* Banner */}
      <div className="">
        <Image
          src="https://img.freepik.com/free-vector/flat-black-friday-horizontal-sale-banner_23-2149109959.jpg?t=st=1717935027~exp=1717938627~hmac=4c369a82fa3fc373a501a9ec74e7f33cce217121447a5e47b8d90b4d8d857b23&w=1060"
          className="h-[320px] w-[1300px] object-cover"
          alt='clothes'
        ></Image>
      </div>

      {/* Top Sale */}
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
        <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Top <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Sales</span>
            </p>
        </div>
      </div>
      <DiscountCardComponent category={"clothes"} discountType={"discount off"} />

      {/* Clearance Sale */}
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
        <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Clearance <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Sales</span>
            </p>
        </div>
      </div>
      <ClearanceCardComponent category={"clothes"} discountType={"clearance sales"} />

      {/* Buy 1 Get 1 */}
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
        <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Buy More <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Get More</span>
            </p>
        </div>
      </div>
      <BuyMoreGetMoreComponent category={"clothes"} discountType={"buy more get more"} />

      {/* Coupon */}
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
        <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Shop <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Coupon</span>
            </p>
        </div>
      </div>
      <DiscountCardComponent category={"clothes"} discountType={"shop coupons"} />

      {/* Event */}
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
        <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Event
            </p>
        </div>
      </div>
      <NormalProductComponent category={"clothes"} discountType={"event"} />
    </main>
  )
}