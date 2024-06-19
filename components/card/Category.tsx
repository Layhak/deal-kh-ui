
// Import Swiper styles
import 'swiper/css';
// import required modules
import Marquee from "react-fast-marquee";

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Image } from '@nextui-org/react';

export default function Category() {
  return (
    <Marquee pauseOnHover>
      <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[200px] w-[200px] rounded-full object-contain"
        />
      </div>
      <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[200px] w-[200px] rounded-full object-contain"
        />
      </div>
      <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[200px] w-[200px] rounded-full object-contain"
        />
      </div>
      <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[200px] w-[200px] rounded-full object-contain"
        />
      </div>
      <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[200px] w-[200px] rounded-full object-contain"
        />
      </div>
      <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[200px] w-[200px] rounded-full object-contain"
        />
      </div>
      <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[200px] w-[200px] rounded-full object-contain"
        />
      </div>
      <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full border-gray-200 bg-white">
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[200px] w-[200px] rounded-full object-contain"
        />
      </div>
    </Marquee>
  );
}
