'use client';
import React, { useState } from 'react';
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa';
import { MemberList } from './memberList';
import { Image } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '@/styles/swiper.css';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

type Members = {
  img: string;
  name: string;
  role: string;
};

export default function MemberCard() {
  const [members, setMembers] = useState<Members[]>(MemberList);

  return (
    <div className="marquee-container">
      <Swiper
        slidesPerView="auto"
        spaceBetween={30}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, FreeMode]}
        speed={5000} // Adjust this value to control the speed
        loop={true}
        grabCursor={true}
      >
        {members.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{ width: '250px' }}
            className="relative w-[250px] max-w-sm items-center overflow-hidden rounded-3xl px-5 pt-10 dark:border-warning-200"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-[0%] animate-[spin_3s_linear_infinite] rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#EAB308_50%,#EC4899_100%)] blur-sm"></span>
              <div className="relative rounded-full bg-foreground-50 p-1">
                <Image
                  radius={'full'}
                  src={item.img}
                  alt={item.name}
                  className="h-[200px] w-[200px]"
                />
              </div>
            </div>
            <div className="py-4 text-center">
              <div className="mb-2 text-xl font-bold">{item.name}</div>
              <div className="mb-2 text-lg ">{item.role}</div>
            </div>
            <div className="flex w-full justify-around px-6 py-4">
              <div className="flex flex-col justify-center">
                <div className="mx-auto max-w-7xl">
                  <div className="st-current group relative flex items-center gap-1.5 overflow-hidden rounded-full p-[1px] font-semibold text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    <span className="absolute inset-[-10%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#EAB308_50%,#EC4899_100%)]"></span>
                    <div className="mx-[0.5px] my-[0.5px] inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-foreground-50 text-sm font-medium text-foreground backdrop-blur-3xl transition-background group-hover:bg-foreground-50/70">
                      <FaFacebookF />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mx-auto max-w-7xl">
                  <div className="st-current group relative flex items-center gap-1.5 overflow-hidden rounded-full p-[1px] font-semibold text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    <span className="absolute inset-[-10%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#EAB308_50%,#EC4899_100%)]"></span>
                    <div className="mx-[0.5px] my-[0.5px] inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-foreground-50 text-sm font-medium text-foreground backdrop-blur-3xl transition-background group-hover:bg-foreground-50/70">
                      <FaInstagram />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mx-auto max-w-7xl">
                  <div className="st-current group relative flex items-center gap-1.5 overflow-hidden rounded-full p-[1px] font-semibold text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    <span className="absolute inset-[-10%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#EAB308_50%,#EC4899_100%)]"></span>
                    <div className="mx-[0.5px] my-[0.5px] inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-foreground-50 text-sm font-medium text-foreground backdrop-blur-3xl transition-background group-hover:bg-foreground-50/70">
                      <FaGoogle />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
