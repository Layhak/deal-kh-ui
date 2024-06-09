import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Category() {
  return (
    <Swiper
      className="rounded-xl"
      spaceBetween={50}
      slidesPerView={4}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper: any) => console.log(swiper)}
      loop={true}
    >
      <SwiperSlide>
        <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full  bg-white">
          <img
            src="https://i.pinimg.com/564x/67/ee/ae/67eeae06b8896f0fbe2d540fd6566be3.jpg"
            alt=""
            className="h-[200px] w-[200px] rounded-full object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
          <img
            src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
            alt=""
            className="h-[200px] w-[200px] rounded-full object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
          <img
            src="https://i.pinimg.com/736x/ae/07/52/ae07524c22734e17f3b156b9c2388408.jpg"
            alt=""
            className="h-[200px] w-[200px] rounded-full object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
          <img
            src="https://i.pinimg.com/564x/d7/74/61/d77461ff8ce514e5e4003d68abc3c3df.jpg"
            alt=""
            className="h-[200px] w-[200px] rounded-full object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
          <img
            src="https://i.pinimg.com/564x/00/5f/d2/005fd22d97b03d50f2f278a51c9a7275.jpg"
            alt=""
            className="h-[200px] w-[200px] rounded-full object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
          <img
            src="https://i.pinimg.com/564x/57/35/78/5735785ea262d659b20a39c13a2ee26f.jpg"
            alt=""
            className="h-[200px] w-[200px] rounded-full object-contain border-gray-300"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
