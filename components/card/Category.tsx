// Import Swiper styles
import 'swiper/css';
// import required modules
import Marquee from 'react-fast-marquee';
import { Image } from '@nextui-org/react';

export default function Category() {
  return (
    <Marquee pauseOnHover>
      <div className={'flex gap-x-5'}>
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="ms-5 h-[240px] w-[240px] rounded-full object-contain"
        />
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[240px] w-[240px] rounded-full object-contain"
        />
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[240px] w-[240px] rounded-full object-contain"
        />
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[240px] w-[240px] rounded-full object-contain"
        />
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[240px] w-[240px] rounded-full object-contain"
        />
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[240px] w-[240px] rounded-full object-contain"
        />
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[240px] w-[240px] rounded-full object-contain"
        />
        <Image
          src="https://i.pinimg.com/564x/35/1a/2f/351a2fa0270f82fa85b1019b610d9a46.jpg"
          alt="Category image"
          className="h-[240px] w-[240px] rounded-full object-contain"
        />
      </div>
    </Marquee>
  );
}
