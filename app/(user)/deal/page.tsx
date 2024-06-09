'use client';

import Buy1Get1Component from '@/components/card/Buy1Get1';
import Category from '@/components/card/Category';
import ClearanceCardComponent from '@/components/card/ClearanceCard';
import DiscountCardComponent from '@/components/card/DiscountCardComponent';
import NormalProductComponent from '@/components/card/NormalProduct';
import ServiceCardComponent from '@/components/card/Service';
import ShopCardComponent from '@/components/card/Shop';
import HomeCard from '@/components/homecard';
import HeroSlideComponent from '@/components/slider/HeroSlide';
import { Link, Image } from '@nextui-org/react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <main>
        {/* Top Sale Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Discount <span className="text-[#eb7d52]">Off</span>
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
        {/* Buy1 Get1 Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Buy More <span className="text-[#eb7d52]">Get More</span>
            </p>
          </div>
          <Link href="/buymoregetmore">
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
        <div className="flex flex-wrap justify-between">
          <div className="w-[366px]">
            <Link href='/buymoregetmore'>
            <Image
              src="https://i.pinimg.com/564x/f7/fe/32/f7fe32429482e12537ec90fc27bf6ff5.jpg"
              className="h-[690px] w-[366px] object-fill"
            ></Image></Link>
          </div>
          <div className="w-[800px]">
            <Buy1Get1Component />
          </div>
        </div>
        {/* Service Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              So Many Deals...
              <span className="text-[#eb7d52]">See Them All</span>
            </p>
          </div>
          {/* Right section */}
          <Link href="/service">
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
        <ServiceCardComponent />
        {/* Event Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Event
            </p>
          </div>
          {/* Right section */}
          <Link href="/event">
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
        <Link href='/event'>
        <Image src='https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728'></Image></Link>
         {/* Coupon Section */}
         <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Shop <span className="text-[#eb7d52]">Coupons</span>
            </p>
          </div>
          {/* Right section */}
          <Link href="/coupon">
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
        <DiscountCardComponent/>
        {/* Clearance Sale Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Clearance <span className="text-[#eb7d52]">Sales</span>
            </p>
          </div>
          <Link href="/flashsale">
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
        <ClearanceCardComponent />
        <div className="mt-12">
          <Image
            src="https://img.freepik.com/free-vector/flash-sale-special-offer-clearance-banner_260559-257.jpg?t=st=1717838807~exp=1717842407~hmac=e590d5944a23efe6832b1099efa74823733c852376d301923a8add2e48ffb16b&w=1060"
            className="h-[310px] w-[1300px] object-cover"
          ></Image>
        </div>
      </main>
    </>
  );
}
