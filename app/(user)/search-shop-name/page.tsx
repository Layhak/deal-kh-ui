'use client';

import { useGetShopsQuery } from '@/redux/service/shop';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '../loading';
import SearchNearbyShopComponent from '@/components/SearchNearbyShopComponent';
import { ShopDetail } from '@/types/shopDetail';

const ShopsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('searchValue') || '';

  const { data, isLoading, error } = useGetShopsQuery({
    page: 1,
    size: 10,
  });

  const filteredProducts = data?.payload.list.filter((product: ShopDetail) => {
    const productName = product.name.toLowerCase();
    return productName.includes(searchValue.toLowerCase());
  });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error:</div>;
  }

  return (
    <div>
      {filteredProducts?.map((shop: ShopDetail) => (
        <SearchNearbyShopComponent key={shop.slug} shop={shop} />
      ))}
    </div>
  );
};

export default ShopsPage;
