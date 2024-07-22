'use client';

import { Product } from '@/libs/difinition';
import { addToCart } from '@/redux/feature/cart/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import { useGetProductsQuery } from '@/redux/service/product';
import { Button, Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { StarIcon } from '../review/StarIcon';

export default function ClearanceCardComponent({
  category,
  discountType,
}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [totalReviews, setTotalReviews] = useState(0);

  const { data, isLoading, error } = useGetProductsQuery({
    page: 1,
    size: 3,
    filters: {
      categorySlug: category,
      discountType: discountType,
    },
  });
  return (
    <div>
      <div className="mx-2 flex flex-wrap justify-between gap-2 md:gap-2 lg:justify-center lg:gap-[26px] ">
        {data?.payload.list.map((product: Product) => (
          <Card
            onClick={() => router.push(`/products/${product.slug}`)}
            key={product.slug}
            className="w-[190px] shadow-none md:w-[370px] lg:w-[387px]"
          >
            <CardBody>
              <Link href="#">
                <Image
                  isZoomed
                  className="h-[140px] w-[400px] object-cover md:h-[250px] lg:h-[250px]"
                  src={
                    product.images[0].url ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={product.name}
                />
              </Link>
              <div className="mb-2 mt-2.5 flex flex-wrap items-center">
                <div className="flex items-center text-[12px] rtl:space-x-reverse">
                  {Array.from({ length: 5 }, (_, index) => {
                    if (product.ratingAvg >= index + 1) {
                      return (
                        <StarIcon
                          key={index}
                          filled
                          className="h-5 w-5 text-yellow-300"
                        />
                      );
                    } else if (product.ratingAvg >= index + 0.5) {
                      return (
                        <StarIcon
                          key={index}
                          half
                          className="h-5 w-5 text-yellow-300"
                        />
                      );
                    } else {
                      return (
                        <StarIcon
                          key={index}
                          className="h-5 w-5 text-yellow-300"
                        />
                      );
                    }
                  })}
                </div>
                <span className="ml-0 mt-2 text-[12px] font-medium text-foreground-600 md:ml-2 md:mt-0 md:text-[18px] lg:ml-2 lg:mt-0 lg:text-[18px]">
                  ({totalReviews}) Reviews
                </span>
              </div>
              <Link href="#">
                <h5 className="mb-0 line-clamp-1 h-[28px] text-[14px] font-semibold tracking-tight text-foreground-800 dark:text-white md:mb-2 md:line-clamp-2 md:h-[50px] md:text-[18px] lg:mb-2 lg:line-clamp-2 lg:h-[70px] lg:text-[18px]">
                  {product.name.length > 60
                    ? `${product.name.substring(0, 60)}...`
                    : product.name || 'Product Name'}
                </h5>
              </Link>
              <div>
                <p className="text-[12px] font-medium text-foreground-600 md:text-[14px] lg:text-[14px]">
                  Shop :{' '}
                  <Link href="">
                    <span className="font-medium text-blue-800 md:text-[14px] lg:text-[14px]">
                      {product.shop.length > 30
                        ? `${product.shop.substring(0, 20)}...`
                        : product.shop || 'Shop Name'}
                    </span>
                  </Link>
                </p>
                <p className="text-[12px] font-medium text-foreground-600 md:text-[14px] lg:text-[14px]">
                  Expired date :{' '}
                  <span className="font-medium text-red-500 md:text-[14px] lg:text-[14px]">
                    {product.expiredAt}
                  </span>
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center justify-start font-semibold">
                  <span className="pt-1 text-[12px] font-bold text-foreground-500 line-through dark:text-white md:text-xl lg:pt-2 lg:text-xl">
                    ${product.price || 'Price'}
                  </span>
                  <span className="ml-1 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-[18px] font-bold text-transparent md:ml-3 md:text-2xl lg:ml-3 lg:text-2xl">
                    ${product.price - product.discountPrice || 'Price'}
                  </span>
                </div>
                <Button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        location: '',
                        closeAt: '',
                        discountTypeSlug: '',
                        openAt: '',
                        quantity: undefined,
                        slug: product.slug,
                        seller: product.seller,
                        name: product.name,
                        price: product.price,
                        discountPrice: product.discountPrice,
                        ratingAvg: product.ratingAvg,
                        description: product.description,
                        images: product.images,
                        shop: product.shop,
                        discountValue: product.discountValue,
                        discountType: product.discountType,
                        expiredAt: product.expiredAt,
                        category: product.category,
                        createdAt: product.createdAt,
                        updatedAt: product.updatedAt,
                        createdBy: product.createdBy,
                        updatedBy: product.updatedBy,
                        address: product.address,
                        ratingCount: product.ratingCount,
                        isPercentage: product.isPercentage,
                      })
                    )
                  }
                  className="h-[37px] w-[80px] rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center text-[12px] text-white md:w-[100px] md:text-[14px] lg:w-[100px] lg:text-[14px]"
                >
                  Add To Cart
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
