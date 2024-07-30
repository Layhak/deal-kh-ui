// PopularShop.tsx

import { useGetApprovedShopsQuery } from '@/redux/service/shop';
import { Skeleton } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import SkeletonCard from '@/components/card/SkeletonCard';
import ShopList from './ShopList';
import { ShopResponse } from '@/libs/difinition';

export default function PopularShop() {
  const router = useRouter();
  const { data, isLoading, error } = useGetApprovedShopsQuery({
    page: 1,
    size: 3,
    field: 'ratingAvg',
    order: 'desc',
  });

  if (isLoading)
    return (
      <>
        <Skeleton className="my-10 h-[30px] w-full max-w-[200px] rounded-2xl" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </>
    );
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
    <div
      className={
        'mx-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mx-0 lg:grid-cols-3'
      }
    >
      {data?.payload.list.map((shop: ShopResponse) => (
        <ShopList
          key={shop.slug}
          name={shop.name}
          shopType={shop.shopType}
          isLoading={isLoading}
          phoneNumber={shop.phoneNumber}
          rating={shop.ratingAvg}
          location={shop.location}
          address={shop.address}
          shopSlug={shop.slug}
          closeAt={shop.closeAt}
          openAt={shop.openAt}
          imageSrc={shop.profile || 'https://via.placeholder.com/150'}
          className="my-4"
        />
      ))}
    </div>
  );
}
