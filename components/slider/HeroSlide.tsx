import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
export default function HeroSlideComponent () {
  return (
    <div className="flex flex-wrap justify-between ">
    <div className="w-[820px] rounded-lg">
    <Swiper
    className='border border-white rounded-lg h-[412px]'
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
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper: any) => console.log(swiper)}
    loop={true}
    >
    <SwiperSlide>
        <img
        src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
        alt=""
        className="object-cover h-full w-full border border-white rounded-xl"
        />
    </SwiperSlide>
    <SwiperSlide>
        <img
        src="https://scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/440939105_862182009272781_2431111273410599446_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFk-tZ0c4x8mnUj1EQOJ7ohPWaxzevyxxU9ZrHN6_LHFR0fhUpq6ErY453PYQP9XDkM_FhxR0ejHXxi-m1hO8C8&_nc_ohc=3I-y9e16IhIQ7kNvgHdN0c0&_nc_zt=23&_nc_ht=scontent.fpnh18-3.fna&oh=00_AYAOJj59S8eyCEZoW6T0NV6dOv1aJxqEDuFJQ0b71ZbPVw&oe=666B2E37"
        alt=""
        className="object-cover h-full w-full border border-white rounded-xl"
        />
    </SwiperSlide>
    <SwiperSlide>
        <img
        src="https://scontent.fpnh18-4.fna.fbcdn.net/v/t39.30808-6/318567475_1971011833088768_6107078882985100942_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEPZLHkp0J7agiuk4LLIQxAgpZm_hZ3H_SClmb-Fncf9Cja1p2NWHpLjlxkDC70dzl1zJF505DtAqKQSQb2KYpE&_nc_ohc=VTQVudx3FUMQ7kNvgFYaujJ&_nc_zt=23&_nc_ht=scontent.fpnh18-4.fna&oh=00_AYC3jNNqLQ1ItsdXWYpaFi2-e7x9Xu6jKwOOEXc0uPJ2Rw&oe=666B2002"
        alt=""
        className="object-cover h-full w-full border border-white rounded-xl"
        />
    </SwiperSlide>
    <SwiperSlide>
        <img
        src="https://scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/368158311_673907174773459_4149138764068886498_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEk3mjFkOa8Y51HEfck98ljgDoZuYCV7BiAOhm5gJXsGJrl24ubbQmgYJI7olwPeW7Qw0nwgcuf2dQsOACNZtGF&_nc_ohc=zQmLVQuPvBUQ7kNvgFw2CMb&_nc_zt=23&_nc_ht=scontent.fpnh18-1.fna&oh=00_AYB7NYRDOrmgOfwq4pBUpzZww1nEgXCu_GWxewmnWctmPA&oe=666B2316"
        alt=""
        className="object-cover h-full w-full border border-white rounded-xl"
        />
    </SwiperSlide>
    <SwiperSlide>
        <img
        src="https://scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/328301465_1325439161573652_2980717698564521857_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF3OA6jwsf8FfL557FA9nSVFiCRY_tle6AWIJFj-2V7oJN3QljKHprHLnYHFa6_SYh14NUsodjb4pgVJJY2IHTS&_nc_ohc=sjJlu8WNzy8Q7kNvgFyWyhQ&_nc_zt=23&_nc_ht=scontent.fpnh18-3.fna&oh=00_AYDjT7T3DBwbwa3Qk_ET9P-bIR2CiFZmRdT3Kf76aUEX3w&oe=666B4D1C"
        alt=""
        className="object-cover h-full w-full border border-white rounded-xl"
        />
    </SwiperSlide>
   
    
    </Swiper>
    </div>
    <div className="grid grid-cols-1 gap-5 w-[380px]">
      <div className="w-[380px] relative">
        <Swiper
        className='border border-white rounded-lg h-[195px]'
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper: any) => console.log(swiper)}
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
            <img
              src="https://scontent.fpnh18-4.fna.fbcdn.net/v/t39.30808-6/318567475_1971011833088768_6107078882985100942_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEPZLHkp0J7agiuk4LLIQxAgpZm_hZ3H_SClmb-Fncf9Cja1p2NWHpLjlxkDC70dzl1zJF505DtAqKQSQb2KYpE&_nc_ohc=VTQVudx3FUMQ7kNvgFYaujJ&_nc_zt=23&_nc_ht=scontent.fpnh18-4.fna&oh=00_AYC3jNNqLQ1ItsdXWYpaFi2-e7x9Xu6jKwOOEXc0uPJ2Rw&oe=666B2002"
              alt=""
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/368158311_673907174773459_4149138764068886498_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEk3mjFkOa8Y51HEfck98ljgDoZuYCV7BiAOhm5gJXsGJrl24ubbQmgYJI7olwPeW7Qw0nwgcuf2dQsOACNZtGF&_nc_ohc=zQmLVQuPvBUQ7kNvgFw2CMb&_nc_zt=23&_nc_ht=scontent.fpnh18-1.fna&oh=00_AYB7NYRDOrmgOfwq4pBUpzZww1nEgXCu_GWxewmnWctmPA&oe=666B2316"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/328301465_1325439161573652_2980717698564521857_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF3OA6jwsf8FfL557FA9nSVFiCRY_tle6AWIJFj-2V7oJN3QljKHprHLnYHFa6_SYh14NUsodjb4pgVJJY2IHTS&_nc_ohc=sjJlu8WNzy8Q7kNvgFyWyhQ&_nc_zt=23&_nc_ht=scontent.fpnh18-3.fna&oh=00_AYDjT7T3DBwbwa3Qk_ET9P-bIR2CiFZmRdT3Kf76aUEX3w&oe=666B4D1C"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/440939105_862182009272781_2431111273410599446_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFk-tZ0c4x8mnUj1EQOJ7ohPWaxzevyxxU9ZrHN6_LHFR0fhUpq6ErY453PYQP9XDkM_FhxR0ejHXxi-m1hO8C8&_nc_ohc=3I-y9e16IhIQ7kNvgHdN0c0&_nc_zt=23&_nc_ht=scontent.fpnh18-3.fna&oh=00_AYAOJj59S8eyCEZoW6T0NV6dOv1aJxqEDuFJQ0b71ZbPVw&oe=666B2E37"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-[380px] relative">
        <Swiper
        className='border border-white rounded-lg h-[195px]'
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper: any) => console.log(swiper)}
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
            <img
              src="https://scontent.fpnh18-4.fna.fbcdn.net/v/t39.30808-6/318567475_1971011833088768_6107078882985100942_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEPZLHkp0J7agiuk4LLIQxAgpZm_hZ3H_SClmb-Fncf9Cja1p2NWHpLjlxkDC70dzl1zJF505DtAqKQSQb2KYpE&_nc_ohc=VTQVudx3FUMQ7kNvgFYaujJ&_nc_zt=23&_nc_ht=scontent.fpnh18-4.fna&oh=00_AYC3jNNqLQ1ItsdXWYpaFi2-e7x9Xu6jKwOOEXc0uPJ2Rw&oe=666B2002"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/328301465_1325439161573652_2980717698564521857_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF3OA6jwsf8FfL557FA9nSVFiCRY_tle6AWIJFj-2V7oJN3QljKHprHLnYHFa6_SYh14NUsodjb4pgVJJY2IHTS&_nc_ohc=sjJlu8WNzy8Q7kNvgFyWyhQ&_nc_zt=23&_nc_ht=scontent.fpnh18-3.fna&oh=00_AYDjT7T3DBwbwa3Qk_ET9P-bIR2CiFZmRdT3Kf76aUEX3w&oe=666B4D1C"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/368158311_673907174773459_4149138764068886498_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEk3mjFkOa8Y51HEfck98ljgDoZuYCV7BiAOhm5gJXsGJrl24ubbQmgYJI7olwPeW7Qw0nwgcuf2dQsOACNZtGF&_nc_ohc=zQmLVQuPvBUQ7kNvgFw2CMb&_nc_zt=23&_nc_ht=scontent.fpnh18-1.fna&oh=00_AYB7NYRDOrmgOfwq4pBUpzZww1nEgXCu_GWxewmnWctmPA&oe=666B2316"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/440939105_862182009272781_2431111273410599446_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFk-tZ0c4x8mnUj1EQOJ7ohPWaxzevyxxU9ZrHN6_LHFR0fhUpq6ErY453PYQP9XDkM_FhxR0ejHXxi-m1hO8C8&_nc_ohc=3I-y9e16IhIQ7kNvgHdN0c0&_nc_zt=23&_nc_ht=scontent.fpnh18-3.fna&oh=00_AYAOJj59S8eyCEZoW6T0NV6dOv1aJxqEDuFJQ0b71ZbPVw&oe=666B2E37"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
  );
};