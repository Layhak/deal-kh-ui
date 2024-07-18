"use client";

import React from 'react'
import { Link, Image } from '@nextui-org/react';
import DiscountCardComponent from '@/components/card/DiscountCardComponent';
import ClearanceCardComponent from '@/components/card/ClearanceCard';
import BuyMoreGetMoreComponent from '@/components/card/BuyMoreGetMore';
import NormalProductComponent from '@/components/card/NormalProduct';


export default function Products() {
  return (
    <main>
        {/* Banner */}
        <div className="">
          <Image
            src="https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/banner/202406/61106ed5-598b-409a-a13a-3579adbacecb.jpg"
            className="h-[320px] w-[1300px] object-cover" alt='Products Banner'
          ></Image>
        </div>
        {/* Food */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
          <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Food
            </p>
          </div>
          {/* Right section */}
          <Link href="/food">
            <div className="flex items-center pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-foreground-700">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <DiscountCardComponent category={"food"} discountType={"discount off"} />
        {/* Drink */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
          <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Drink
            </p>
          </div>
          {/* Right section */}
          <Link href="/drink">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-foreground-700">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <ClearanceCardComponent category={"drink"} discountType={"clearance sales"} />
        {/* Clothes */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
          <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Clothes
            </p>
          </div>
          {/* Right section */}
          <Link href="/clothes">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-foreground-700">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <BuyMoreGetMoreComponent category={"clothes"} discountType={"buy more get more"}/>
        <div className="coupon-container flex justify-between py-10">
          <div className="coupon">
            <Image
              src="https://as2.ftcdn.net/v2/jpg/03/29/10/97/1000_F_329109774_iTsyjzLU5O9cagJ9UhahhNF2ZdkW4OHc.jpg"
              className="h-[250px] w-[550px] object-cover" alt='product banner'
            />
          </div>
          <div className="coupon">
            <Image
              src="https://as1.ftcdn.net/v2/jpg/03/29/10/98/1000_F_329109835_b1coeNquepUkFoSpqVgLLqKFiBKosY7K.jpg"
              className="h-[250px] w-[550px] object-cover" alt='Coupon'
            />
          </div>
        </div>
        {/* Accessories */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
          <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Accessories
            </p>
          </div>
          {/* Right section */}
          <Link href="/accessory">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-foreground-700">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <DiscountCardComponent category={"accessory"} discountType={"discount off"}/>
        {/* Skin Care */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
          <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Skin <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Care</span>
            </p>
          </div>
          {/* Right section */}
          <Link href="/skincare">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-foreground-700">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <NormalProductComponent category={"skin-care"} discountType={"no discount"}/>
        {/* Electronic */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
          <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Electronic
            </p>
          </div>
          {/* Right section */}
          <Link href="/electronic">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-foreground-700">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <NormalProductComponent category={"electronic"} discountType={"no discount"}/>
        {/* Banner */}
        <div className="">
          <Image
            src="https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/banner/202406/d41354ce-0766-42a4-8405-20e96c24afa3.jpg"
            className="h-[320px] w-[1300px] object-cover mt-8" alt='producr banner'
          ></Image>
        </div>
    </main>
  )
}
