import { useGetApprovedShopsQuery } from '@/redux/service/shop';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { BsShop } from 'react-icons/bs';
import React, { useState } from 'react';
import Pagination from '@/components/pagination/Pagination';
import { ShopResponse } from '@/libs/difinition';
import { AiOutlineShop } from 'react-icons/ai';

type ShopCardComponentProps = {
  initialPage: number;
  size: number;
};

export default function PopularShop() {
  const router = useRouter();
  const { data, isLoading, error } = useGetApprovedShopsQuery({
    page: 1,
    size: 3,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

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
    <div className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:mx-0 mx-2'}>
      {data?.payload.list.map((shop: ShopResponse) => (
        <Card
          key={shop.slug}
          className=" h-[470px] w-full object-cover shadow-none"
        >
          <CardBody>
            <Link href={`/shop/${shop.slug}`}>
              <Image
                isZoomed
                className="h-[250px] w-[380px] rounded-lg object-cover object-center"
                src={
                  shop.profile ||
                  'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                }
                alt={shop.name}
              />
            </Link>
            <div className="mt-2 flex">
              <div className=''>
                <AiOutlineShop className="h-[37px] w-[37px]  text-[#eb7d52]" />
              </div>
              <h5 className="ml-2 mt-2 line-clamp-2 h-[66px] text-2xl font-semibold tracking-tight text-foreground-800 dark:text-white">
                {shop.name.length > 18
                  ? `${shop.name.substring(0, 18)}...`
                  : shop.name || 'Shop Name'}
              </h5>
            </div>
            <div className="flex flex-col gap-1">
              <p className=" text-foreground-600">
                Category :{' '}
                <span className="font-medium text-foreground-900">
                  {shop.shopType || 'shop Category'}
                </span>
              </p>
              <p className="text-foreground-600">
                Open&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{' '}
                <span className="font-medium text-foreground-900">
                  {shop.openAt.slice(0, 5)} AM - {shop.closeAt.slice(0, 5)} PM
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center justify-start">
                <span
                  className="cursor-pointer pt-2 text-sm font-medium text-blue-700"
                  onClick={() => handleGetDirections(shop.location)}
                >
                  Shop Location
                </span>
              </div>
              <Link href={`/shop/${shop.slug}`}>
                <button className="h-[37px] w-[130px] rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center text-[14px] text-white ">
                  Check Us Out
                </button>
              </Link>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
