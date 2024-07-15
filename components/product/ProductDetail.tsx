'use client';
import React from 'react';
import CardDetailComponent from '@/components/card/CardDetailComponent';
import ReviewProductDetailComponent from '@/components/review/ReviewProductDetailComponent';
import DiscountCardComponent from '@/components/card/DiscountCardComponent';
import { useGetProductBySlugQuery } from '@/redux/service/product';
import Loading from '@/app/(user)/loading';
import NotFoundPage from '@/app/(user)/not-found';

export default function ProductDetail({ slug }: { slug: string }) {
  const { data: product, error, isLoading } = useGetProductBySlugQuery(slug);

  if (isLoading) return <Loading />;
  if (error) {
    return <NotFoundPage />;
  }
  return (
    <>
      <CardDetailComponent
        id={product.payload.slug}
        name={product.payload.name}
        category={product.payload.category}
        description={product.payload.description}
        images={product.payload.images}
        shopName={product.payload.shop}
        discountType={product.payload.discountType}
        originalPrice={product.payload.price}
        discountPrice={product.payload.discountPrice}
        open={product.payload.createdAt}
        promotionDate={product.payload.createdAt}
        expiryDate={product.payload.expiredAt}
      />
      <ReviewProductDetailComponent productSlug={product.payload.slug} />
      {product.payload.discountType === 'Top Sales' ? (
        <DiscountCardComponent />
      ) : (
        <h1>No Related Product</h1>
      )}
    </>
  );
}
