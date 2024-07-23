'use client';

import ShopProfileComponent from '@/components/shop-profile/ShopProfileComponent';
import React from 'react';
import { useGetShopBySlugQuery } from '@/redux/service/shop';
import { useGetProductsByShopQuery } from '@/redux/service/product';
import Loading from '@/app/(user)/loading';

type Props = {
  params: {
    slug: string;
  };
};

const ShopProfile = ({ params }: Props) => {
  const slug: string = params.slug;

  // Fetch shop details
  const {
    data: shopData,
    isLoading: isShopLoading,
    error: shopError,
  } = useGetShopBySlugQuery(slug);

  // Fetch products for the shop
  const {
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsByShopQuery(slug);
  console.log('productsData', productsData);
  // Check if either shop details or products are loading
  if (isShopLoading || isProductsLoading) {
    return <Loading />;
  }

  // Check for errors
  if (!shopError && !shopData) {
    return <p>Shop Not Found</p>;
  }

  if (productsError) {
    return <p>Error loading products</p>;
  }

  return (
    <div>
      <ShopProfileComponent shopProfile={shopData.payload} />
      {/* Display products if available */}
      {productsData && productsData.length > 0 && (
        <div>
          <h2>Products</h2>
          <ul>
            {productsData.map((product: any) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShopProfile;
