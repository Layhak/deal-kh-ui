"use client";

import { useGetShopsQuery } from '@/redux/service/shop';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ShopNearbyComponent from '@/components/search/ShopNearbyComponent';
import Loading from '../loading';
import { ShopDetail } from '@/types/shopDtail';
import { useGetMyProductsQuery } from '@/redux/service/product';

const SearchProductName = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('searchValue') || '';

  const { data, isLoading, error } = useGetProductsQuery({
    page: 1,
    size: 10
  });

  const filteredProducts = data?.payload.list.filter((product: ShopDetail) => {
    const productName = product.name.toLowerCase();
    return productName.includes(searchValue.toLowerCase());
  });

  if (isLoading) {
    return <div><Loading/></div>;
  }

  if (error) {
    return <div>Error:</div>;
  }

  return (
    <div>
      {filteredProducts?.map((shop: ShopDetail) => (
        // eslint-disable-next-line react/jsx-key
        <ShopNearbyComponent shop={shop} />
      ))}
    </div>
  );
};

export default SearchProductName;