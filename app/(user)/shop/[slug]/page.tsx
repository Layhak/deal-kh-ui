'use client';
import ShopProfileComponent from '@/components/shop-profile/ShopProfileComponent';
import React from 'react';
import { useGetShopBySlugQuery } from '@/redux/service/shop';
import Loading from '@/app/(user)/loading';

type Props = {
  params: {
    slug: string;
  };
};

const ShopProfile = ({ params }: Props) => {
  const slug = params.slug;
  console.log('slug', slug);
  const { data, isLoading, error } = useGetShopBySlugQuery(slug);
  console.log('data', data);
  if (isLoading) {
    return <Loading />;
  }

  if (!error && !data) {
    return <p>Shop Not Founded</p>;
  }

  return (
    <div>
      <ShopProfileComponent shopProfile={data.payload} />
    </div>
  );
};

export default ShopProfile;
