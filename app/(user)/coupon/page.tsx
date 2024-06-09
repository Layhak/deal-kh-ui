"use client";

import React from 'react'
import { Link, Image } from '@nextui-org/react';
import DiscountCardComponent from '@/components/card/DiscountCardComponent';


export default function page() {
  return (
    <main>
        {/* Coupon */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Shop <span className="text-[#eb7d52]">Coupon</span>
            </p>
          </div>
        </div>
        <div className="coupon-container flex justify-between pb-10">
          <div className="coupon">
            <img
              src="https://img.freepik.com/premium-vector/retro-vintage-cartoon-gift-voucher-coupon-with-characters-pizza-drink-cute-mascot-with-psychedelic-smile-emotion-vector-illustration-groovy-style_647318-814.jpg?w=740"
              className="h-[250px] w-[550px] object-cover"
            />
          </div>
          <div className="coupon">
            <img
              src="https://img.freepik.com/free-vector/gradient-birthday-gift-voucher-design_23-2149577447.jpg?t=st=1717933174~exp=1717936774~hmac=a0d5481b3edae06e13d5989c0c3a64476c19e9fb57f183d8fa2d552723040ec5&w=740"
              className="h-[250px] w-[550px] object-cover"
            />
          </div>
        </div>
        <div className="coupon-container flex justify-between pb-10">
          <div className="coupon">
            <img
              src="https://as2.ftcdn.net/v2/jpg/03/29/10/97/1000_F_329109774_iTsyjzLU5O9cagJ9UhahhNF2ZdkW4OHc.jpg"
              className="h-[250px] w-[550px] object-cover"
            />
          </div>
          <div className="coupon">
            <img
              src="https://as1.ftcdn.net/v2/jpg/03/29/10/98/1000_F_329109835_b1coeNquepUkFoSpqVgLLqKFiBKosY7K.jpg"
              className="h-[250px] w-[550px] object-cover"
            />
          </div>
        </div>
        <div className="coupon-container flex justify-between pb-10">
          <div className="coupon">
            <img
              src="https://img.freepik.com/free-vector/summer-discount-banners-restaurant_23-2147563873.jpg?t=st=1717933196~exp=1717936796~hmac=a8c1cbf8629f5bb2bf4151696a08bc934bb3100011bfaee441f8a1d55d08ea2a&w=740"
              className="h-[250px] w-[550px] object-cover"
            />
          </div>
          <div className="coupon">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-gift-voucher_23-2147995098.jpg?t=st=1717933235~exp=1717936835~hmac=5d6f4582a346cae68921152516ae5f28810d585b2579ef32d7e373e6876f6458&w=740"
              className="h-[250px] w-[550px] object-cover"
            />
          </div>
        </div>
        
        {/* Food */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Food 
            </p>
          </div>
          {/* Right section */}
          <Link href="/discountoff">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
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
        <DiscountCardComponent />
    </main>
  )
}
