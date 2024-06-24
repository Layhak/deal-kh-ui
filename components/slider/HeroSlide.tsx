import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Image } from '@nextui-org/react';
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function HeroSlideComponent() {
  return (
    <div className="mt-2 flex flex-wrap justify-between gap-[25px] overflow-hidden">
      <div className="lg:w-[820px] w-full">
        <Swiper
          className="rounded-lg border border-white dark:border-black   "
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
              className="h-full w-full rounded-none object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="h-full w-full rounded-none object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="h-full w-full rounded-none object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="h-full w-full rounded-none object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="h-full w-full rounded-none object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="hidden lg:block lg:grid-cols-1 lg:w-[385px]">
        <div className="w-[385px]">
          <Swiper
            className="rounded-lg border border-white dark:border-black"
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
                className="h-full w-full rounded-none object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full rounded-none object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full rounded-none object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full rounded-none object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full rounded-none object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="w-[385px] mt-6">
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
                className="h-full w-full rounded-none object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full rounded-none object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full rounded-none object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full rounded-none object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                alt=""
                className="h-full w-full rounded-none object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
