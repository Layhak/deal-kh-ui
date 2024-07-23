import { useGetProductByShopOwnerQuery } from '@/redux/service/product';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Product } from '@/libs/difinition';
import SkeletonCard from '@/components/card/SkeletonCard';
import ProductCard from '@/components/card/ProductCard';

export default function SectionProfileShop({ category, discountType, size, shopSlug }: any) {
  const router = useRouter();
  const {
    data: products,
    isLoading,
    error,
  }: any = useGetProductByShopOwnerQuery(shopSlug);
  console.log("Products of the shop with slug: ", shopSlug)
  console.log("Here are the products: ", products)
  console.log("Erro: ", error)
  if (products?.payload?.pagination?.totalElements === 0) {
    return <div>No Products Found</div>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      {isLoading
        ? Array.from({ length: size || 8 }, (_, index) => (
            <SkeletonCard key={index} />
          ))
        : products?.payload.list.map((product: Product) => (
            <ProductCard
              key={product.slug}
              product={product}
              discountType={product.discountTypeSlug}
            />
          ))}
    </>
  );
}
