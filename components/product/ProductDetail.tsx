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
        slug={product.payload.slug}
        name={product.payload.name}
        category={product.payload.category}
        description={product.payload.description}
        images={product.payload.images}
        shop={product.payload.shop}
        discountType={product.payload.discountType}
        price={product.payload.price}
        discountPrice={product.payload.discountPrice}
        openAt={product.payload.openAt}
        createdAt={product.payload.createdAt}
        expiredAt={product.payload.expiredAt}
        address={product.payload.location}
        closeAt={product.payload.closeAt}
        seller={product.payload.seller}
        ratingCount={product.payload.ratingCount}
        ratingAvg={product.payload.ratingAvg}
        shopSlug={product.payload.shopSlug}
        discountValue={product.payload.discountValue}
        isPercentage={false}
        updatedAt={product.payload.updatedAt}
        createdBy={product.payload.createdBy}
        updatedBy={product.payload.updatedBy}
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
