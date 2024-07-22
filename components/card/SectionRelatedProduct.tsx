import { useGetProductsQuery } from '@/redux/service/product';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Product } from '@/libs/difinition';
import SkeletonCard from '@/components/card/SkeletonCard';
import ProductCard from '@/components/card/ProductCard';

export default function SectionRelatedProduct({ category, name, size }: any) {
  const router = useRouter();
  const {
    data: products,
    isLoading,
    error,
  }: any = useGetProductsQuery({
    page: 1,
    size: size || 8,
    filters: {
      categorySlug: category,
    },
  });
  if (products?.payload?.pagination?.totalElements === 0) {
    return <div>No Products Found</div>;
  }
  return (
    <>
      {isLoading
        ? Array.from({ length: size || 8 }, (_, index) => (
            <SkeletonCard key={index} />
          ))
        : products.payload.list.map((product: Product) => (
            <ProductCard
              key={product.slug}
              product={product}
              discountType={product.discountTypeSlug}
            />
          ))}
    </>
  );
}
