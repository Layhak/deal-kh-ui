import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function HeroSlideComponent() {
    return (
        <div className="flex flex-wrap justify-between sm:h-64 xl:h-80 2xl:h-96 mb-3">
            <div className="w-full sm:w-[400px] md:w-[600px] lg:w-[820px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[427px] rounded-lg">
                <Swiper
                    className='rounded-2xl h-full border border-white dark:border-none'
                    spaceBetween={10}
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
                            className="w-full h-full object-contain border border-white dark:border-none rounded-xl"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://cdn.shopify.com/s/files/1/0471/0665/4368/files/Romand_Banner_1_600x600.jpg?v=1655648018"
                            alt=""
                            className="w-full h-full object-contain border border-white dark:border-none rounded-xl"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                            alt=""
                            className="w-full h-full object-contain border border-white dark:border-none rounded-xl"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                            alt=""
                            className="w-full h-full object-contain border border-white dark:border-none rounded-xl"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                            alt=""
                            className="w-full h-full object-contain border border-white dark:border-none rounded-xl"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="grid grid-cols-1 gap-5 w-full sm:w-[200px] md:w-[300px] lg:w-[380px]">
                <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[200px] relative">
                    <Swiper
                        className='border border-white dark:border-none rounded-xl'
                        spaceBetween={10}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper: any) => console.log(swiper)}
                    >
                        <SwiperSlide>
                            <img
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[200px] relative">
                    <Swiper
                        className='border border-white dark:border-none rounded-xl'
                        spaceBetween={10}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper: any) => console.log(swiper)}
                    >
                        <SwiperSlide>
                            <img
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};
