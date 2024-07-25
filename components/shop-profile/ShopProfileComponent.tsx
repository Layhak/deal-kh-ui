import React from 'react';
import { MdOutlineDirections } from 'react-icons/md';
import { HiOutlinePhone } from 'react-icons/hi';
import { LuClock10 } from 'react-icons/lu';
import { BiCategory } from 'react-icons/bi';
import { Image } from '@nextui-org/react';
import { ShopDetail } from '@/types/shopDtail';
import ReviewSHopProfile from '../review/ReviewShopProfile';
import { useGetProductBySlugQuery } from '@/redux/service/product';
import { useGetShopBySlugQuery } from '@/redux/service/shop';

type Props = {
  shopProfile: ShopDetail;
  shopSlug: string;
};
export default function ShopProfileComponent({ shopProfile, shopSlug }: Props) {
  if (!shopProfile) {
    return null;
  }

  const handleGetDirections = (location: string) => {
    if (!location || !location.includes(',')) {
      console.error('Invalid location format');
      return;
    }
    const [lat, lng] = location.split(',');
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      {/* profile cover section */}
      <div className="mx-2 flex w-[96%] flex-col items-center lg:mx-0 lg:w-full lg:flex-row">
        <div
          className="relative flex h-40 w-full justify-start rounded-lg bg-gray-800 lg:h-96"
          style={{
            backgroundImage: `url(${shopProfile.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute -bottom-5 left-4 flex translate-y-1/2 transform flex-col items-start justify-start lg:bottom-0 lg:flex-row">
            <Image
              src={shopProfile.profile}
              alt="Profile Picture"
              className="h-24 w-24 rounded-full border-4 border-white bg-white lg:h-40 lg:w-40"
            />
            <h1 className="self-center text-start text-lg font-semibold lg:ml-4 lg:mt-16 lg:text-2xl">
              {shopProfile.name}
            </h1>
          </div>
        </div>
      </div>

      {/* page details section */}
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-2 lg:gap-4">
        <div className="mx-4  mt-[100px] flex flex-col lg:mx-0 lg:mt-28 lg:flex-row">
          {/* description section */}
          <div className=" w-full lg:mt-0">
            <div className="mb-8">
              <p className="relative w-fit from-pink-500 to-yellow-500  text-[20px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r lg:text-[26px]">
                Page&apos;s{' '}
                <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                  Detail
                </span>
              </p>
            </div>
            <p className="mt-4 text-[16px]">{shopProfile.description}</p>

            {/* icons */}
            {/* location */}
            <div className="mt-4 flex flex-row gap-4">
              <div className="self-center text-[24px]">
                <MdOutlineDirections />
              </div>
              <p
                className="text-[16px] cursor-pointer hover:text-[#eb7b52]"
                onClick={() => handleGetDirections(shopProfile.location)}
              >
                {shopProfile.address}
              </p>
            </div>
            {/* phone number */}
            <div className="mt-4 flex flex-row gap-4">
              <div className="self-center text-[24px]">
                <HiOutlinePhone />
              </div>
              <p className="text-[16px]">{shopProfile.phoneNumber}</p>
            </div>
            {/* open and close */}
            <div className="mt-4 flex flex-row gap-4">
              <div className="self-center text-[24px]">
                <LuClock10 />
              </div>
              <p className="text-[16px]">
                {shopProfile.openAt.slice(0, 5)}
                {'  to  '}
                {shopProfile.closeAt.slice(0, 5)}
              </p>
            </div>
            {/* mail */}
            <div className="mt-4 flex flex-row gap-4">
              <div className="self-center text-[24px]">
                <BiCategory />
              </div>
              <p className="text-[16px]">{shopProfile.shopType}</p>
            </div>
          </div>
        </div>
        <div className="mx-4 mt-2 md:mt-[100px] lg:mx-0 lg:mt-28">
          <ReviewSHopProfile productSlug={shopSlug} />
        </div>
      </div>

      {/* category */}
    </div>
  );
}
