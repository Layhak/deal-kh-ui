'use client';
import React, { useEffect, useState } from 'react';
import Loading from '@/app/(user)/loading';
import NotFoundPage from '@/app/(user)/not-found';
import DiscountCardComponent from '@/components/card/DiscountCardComponent';
import ClearanceCardComponent from '@/components/card/ClearanceCard';
import BuyMoreGetMoreComponent from '@/components/card/BuyMoreGetMore';
import NormalProductComponent from '@/components/card/NormalProduct';
import { Image } from '@nextui-org/react';
import { useGetCategoryBySlugQuery } from '@/redux/service/category';

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

const CategoryPage = ({ params }: CategoryPageProps) => {

  const { slug } = params;
  const { data: category, error, isLoading } = useGetCategoryBySlugQuery(slug);
  
  if (isLoading) return <Loading />;
  if (error) {
    return <NotFoundPage />;
  }
  
  return (
    <main>
      <div className="">
        <Image
          src={
            category.payload?.bannerUrl ||
            'https://img.freepik.com/free-vector/hand-drawn-fast-food-sale-banner_23-2150970567.jpg?t=st=1717934947~exp=1717938547~hmac=58c8ea86733d88849707b728b3db59c8fea2a3eb7f0c83aafb02112d07442ad8&w=1060'
          }
          className="h-[320px] w-[1300px] object-cover"
          alt={category.payload.name}
        />
      </div>
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Top{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Sales
            </span>
          </p>
        </div>
      </div>
      <DiscountCardComponent category={slug} discountType="discount off" />

      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Clearance{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Sales
            </span>
          </p>
        </div>
      </div>
      <ClearanceCardComponent category={slug} discountType="clearance sales" />
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Buy More{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Get More
            </span>
          </p>
        </div>
      </div>
      <BuyMoreGetMoreComponent
        category={slug}
        discountType="buy more get more"
      />
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Shop{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Coupon
            </span>
          </p>
        </div>
      </div>
      <DiscountCardComponent category={slug} discountType="shop coupons" />
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Event
          </p>
        </div>
      </div>
      <NormalProductComponent category={slug} discountType="event" />
    </main>
  );
};

export default CategoryPage;

