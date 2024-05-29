// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function SwiperComponent(){
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><img src="https://i.pinimg.com/736x/8d/3d/57/8d3d5742ccfc11ee7ec1da955dc075c1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://i.pinimg.com/736x/8d/3d/57/8d3d5742ccfc11ee7ec1da955dc075c1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://i.pinimg.com/736x/8d/3d/57/8d3d5742ccfc11ee7ec1da955dc075c1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://i.pinimg.com/736x/8d/3d/57/8d3d5742ccfc11ee7ec1da955dc075c1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://i.pinimg.com/736x/8d/3d/57/8d3d5742ccfc11ee7ec1da955dc075c1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://i.pinimg.com/736x/8d/3d/57/8d3d5742ccfc11ee7ec1da955dc075c1.jpg" alt="" /></SwiperSlide>
    </Swiper>
  );
};