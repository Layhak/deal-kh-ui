'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ShopNearbyComponent from '@/components/search/ShopNearbyComponent';
import Loading from '../loading';
import { useGetAllShopsQuery } from '@/redux/service/shop';
import { ShopResponse } from '@/libs/difinition';

const ShopsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('searchValue') || '';

  const { data, isLoading, error } = useGetAllShopsQuery({
    page: 1,
    size: 10,
  });

  const filteredProducts = data?.payload.list.filter(
    (product: ShopResponse) => {
      const productName = product.name.toLowerCase();
      return productName.includes(searchValue.toLowerCase());
    }
  );

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
      {filteredProducts?.map((shop: ShopResponse) => (
        <ShopNearbyComponent key={shop.slug} shop={shop} />
      ))}
    </div>
  );
};

export default ShopsPage;
