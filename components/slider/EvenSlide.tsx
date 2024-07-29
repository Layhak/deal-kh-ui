'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import '@/styles/swiper.css';
import { Image, Skeleton } from '@nextui-org/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetBannersQuery } from '@/redux/service/banner';
import { Banner } from '@/types/banner';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function HeroSlideComponent() {
  const router = useRouter();

  const {
    data: eventBanner,
    isLoading: isEventLoading,
    error: eventError,
  } = useGetBannersQuery({
    bannerType: 'event',
  });

  if (isEventLoading) {
    return (
      <div className="mt-2 w-full">
        <Skeleton className="h-[500px] w-[1300px] rounded-2xl" />
      </div>
    );
  }

  if (eventError) {
    return <div>Error loading banner.</div>;
  }

  const eventBanners = eventBanner?.payload || [];

  const handleBannerClick = (shopLink: string) => {
    router.push(shopLink);
  };

  return (
    <div className="w-full">
      <Swiper
        className="w-full rounded-2xl"
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination]}
        loop={true}
      >
        {eventBanners.length > 0 ? (
          eventBanners.map((banner: Banner) => (
            <SwiperSlide
              key={banner.uuid}
              onClick={() => handleBannerClick(banner.shopLink)}
              className="cursor-pointer"
            >
              <Image
                src={banner.image}
                className="h-[500px] w-[1300px] rounded-2xl object-cover"
                alt={banner.name}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1719967761&width=1728"
              className="h-[500px] w-[1300px] rounded-2xl object-cover"
              alt="Event"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
