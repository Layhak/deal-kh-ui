'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import '@/styles/swiper.css';
import { Image, Skeleton } from '@nextui-org/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useGetBannersQuery } from '@/redux/service/banner';
import { Banner } from '@/types/banner';
import { useRouter } from 'next/navigation';

export default function HeroSlideComponent() {
  const router = useRouter();

  const {
    data: headerOne,
    isLoading: isHeaderOneLoading,
    error: headerOneError,
  } = useGetBannersQuery({
    bannerType: 'Hero-1',
  });
  const {
    data: headerTwo,
    isLoading: isHeaderTwoLoading,
    error: headerTwoError,
  } = useGetBannersQuery({
    bannerType: 'Hero-2',
  });

  const {
    data: headerThree,
    isLoading: isHeaderThreeLoading,
    error: headerThreeError,
  } = useGetBannersQuery({
    bannerType: 'Hero-3',
  });

  if (isHeaderOneLoading || isHeaderTwoLoading || isHeaderThreeLoading) {
    return (
      <div className={'mt-2 grid w-full grid-cols-1 gap-2 lg:grid-cols-3'}>
        <Skeleton className=" col-span-2 rounded-2xl" />
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between lg:flex-col">
          <Skeleton className="h-[200px] w-full rounded-2xl lg:w-[400px]" />
          <Skeleton className="h-[200px] w-full rounded-2xl lg:w-[400px]" />
        </div>
      </div>
    );
  }

  if (headerOneError || headerTwoError || headerThreeError) {
    return <div>Error loading banners.</div>;
  }

  const headerOneBanners = headerOne?.payload || [];
  const headerTwoBanners = headerTwo?.payload || [];
  const headerThreeBanners = headerThree?.payload || [];

  const handleBannerClick = (shopLink: string) => {
    router.push(shopLink);
  };

  return (
    <div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-3">
      <div className="col-span-2 ">
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
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
        >
          {headerOneBanners.length > 0 ? (
            headerOneBanners.map((banner: Banner) => (
              <SwiperSlide
                key={banner.uuid}
                onClick={() => handleBannerClick(banner.shopLink)}
              >
                <Image
                  isZoomed
                  src={banner.image}
                  alt={banner.name}
                  className="object-cover"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Image
                width={500}
                isZoomed
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt="default"
                className="object-cover"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <Swiper
          className=" w-full rounded-2xl"
          slidesPerView={1}
          grabCursor={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
        >
          {headerTwoBanners.length > 0 ? (
            headerTwoBanners.map((banner: Banner) => (
              <SwiperSlide
                key={banner.uuid}
                onClick={() => handleBannerClick(banner.shopLink)}
              >
                <Image
                  width={500}
                  isZoomed
                  src={banner.image}
                  alt={banner.name}
                  className="object-cover"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Image
                isZoomed
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt="default"
                className="object-cover"
              />
            </SwiperSlide>
          )}
        </Swiper>

        <Swiper
          grabCursor={true}
          className=" w-full rounded-2xl"
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
        >
          {headerThreeBanners.length > 0 ? (
            headerThreeBanners.map((banner: Banner) => (
              <SwiperSlide
                key={banner.uuid}
                onClick={() => handleBannerClick(banner.shopLink)}
              >
                <Image
                  isZoomed
                  src={banner.image}
                  alt={banner.name}
                  className="object-cover"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Image
                isZoomed
                src="https://romand.us/cdn/shop/files/PC-2.png?v=1719967761&width=1728"
                alt=""
                className="object-cover"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
}
