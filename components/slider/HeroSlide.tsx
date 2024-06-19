import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Image } from '@nextui-org/react';
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function HeroSlideComponent() {
  return (
    <div className="mt-2 flex flex-wrap justify-center gap-[25px] overflow-hidden">
      <div className="sm:w-[350px] md:w-[350px] lg:w-[820px]">
        <Swiper
          className="h-[195px] rounded-lg border border-white dark:border-black md:h-[195px] lg:h-[418px] "
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onSlideChange={() => {}}
          // onSwiper={}
          loop={true}
        >
          <SwiperSlide>
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="grid grid-cols-1 gap-[25px] lg:w-[385px]">
        <div className="relative sm:w-[350px] lg:w-[385px]">
          <Swiper
            className="h-[195px] rounded-lg border border-white dark:border-black"
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => {}}
            // onSwiper={(swiper: any) => console.log(swiper)}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
          >
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="relative sm:w-[350px] lg:w-[385px] ">
          <Swiper
            className="h-[195px] rounded-lg border border-white dark:border-black"
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => {}}
            // onSwiper={(swiper: any) => console.log(swiper)}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
          >
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
