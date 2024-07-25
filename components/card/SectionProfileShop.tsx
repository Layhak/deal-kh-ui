import { useRouter } from 'next/navigation';
import React from 'react';
import { Product } from '@/libs/difinition';
import SkeletonCard from '@/components/card/SkeletonCard';
import ProductCard from '@/components/card/ProductCard';
import {
  useGetProductsByShopQuery,
  useGetProductsQuery,
} from '@/redux/service/product';

export default function SectionProfileShop({
  category,
  discountType,
  size,
  shopSlug,
  shopName,
}: any) {
  const router = useRouter();
  const {
    data: products,
    isLoading,
    error,
  }: any = useGetProductsQuery({
    page: 1,
    size: size || 8,
    filters: {
      discountType: discountType,
    },
    shopName: shopName,
  });

  console.log('product:', shopSlug);
  console.log('Name: ', shopName);
  const lowercaseShopName = shopName.toLowerCase();
  console.log('Name after conversion: ', lowercaseShopName);

  console.log('Here are the products: ', products);
  console.log('Erro: ', error);
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
