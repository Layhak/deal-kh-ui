'use client';
import React from 'react';
import CardDetailComponent from '@/components/card/CardDetailComponent';
import ReviewProductDetailComponent from '@/components/review/ReviewProductDetailComponent';
import DiscountCardComponent from '@/components/card/DiscountCardComponent';
import { useGetProductBySlugQuery } from '@/redux/service/product';
import Loading from '@/app/(user)/loading';
import NotFoundPage from '@/app/(user)/not-found';
import SectionCategory from '@/components/card/SectionCategory';
import SectionRelatedProduct from '@/components/card/SectionRelatedProduct';
import Link from 'next/link';

export default function ProductDetail({ slug }: { slug: string }) {
  const { data: product, error, isLoading } = useGetProductBySlugQuery(slug);
  console.log('product', product);
  if (isLoading) return <Loading />;
  if (error) {
    return <NotFoundPage />;
  }
  return (
    <>
      <CardDetailComponent
        discountTypeSlug={product.payload.discountTypeSlug}
        slug={product.payload.slug}
        name={product.payload.name}
        category={product.payload.categorySlug}
        description={product.payload.description}
        images={product.payload.images}
        shop={product.payload.shop}
        discountType={product.payload.discountType}
        price={product.payload.price}
        discountPrice={product.payload.discountPrice}
        openAt={product.payload.openAt}
        createdAt={product.payload.createdAt}
        expiredAt={product.payload.expiredAt}
        address={product.payload.address}
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
        location={product.payload.location}
        quantity={product.payload.quantity || 0}
      />
      <ReviewProductDetailComponent productSlug={product.payload.slug} />
      <div className={'flex items-center  justify-between'}>
        <p className="relative w-fit from-pink-500 to-yellow-500  text-[20px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r lg:text-[26px]">
          Related{' '}
          <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            Products
          </span>
        </p>
        <Link href={`/category/${product.payload.categorySlug}`}>
          <div className="flex items-center  pt-1">
            <p className="mr-2 pb-1 text-[17px] font-normal text-foreground-700">
              See More
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              color="black"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                stroke="#545c6a"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M42 24H6m24-12l12 12l-12 12"
              />
            </svg>
          </div>
        </Link>
      </div>
      <div className={'grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'}>
        <SectionRelatedProduct
          size={4}
          category={product.payload.categorySlug}
        />
      </div>
    </>
  );
}
