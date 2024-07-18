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
      <div className="flex flex-wrap lg:justify-center lg:gap-[26px] md:gap-2 gap-2 justify-between mx-2 ">
        {data?.payload.list.map((product: Product) => (
          <Card
            onClick={() => router.push(`/products/${product.slug}`)}
            key={product.slug}
            className="lg:w-[387px] md:w-[370px] w-[190px] shadow-none"
          >
            <CardBody>
              <Link href="#">
                <Image
                  isZoomed
                  className="lg:h-[250px] md:h-[250px] h-[140px] w-[400px] object-cover"
                  src={
                    product.images[0].url ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={product.name}
                />
              </Link>
              <div className="mb-2 mt-2.5 flex flex-wrap items-center">
                <div className="flex text-[12px] items-center rtl:space-x-reverse">
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
                <span className="lg:ml-2 md:ml-2 ml-0 mt-2 lg:mt-0 md:mt-0 lg:text-[18px] md:text-[18px] text-[12px] font-medium text-foreground-600">
                  ({totalReviews}) Reviews
                </span>
              </div>
              <Link href="#">
                <h5 className="lg:mb-2 md:mb-2 mb-0 md:line-clamp-2 lg:line-clamp-2 line-clamp-1 lg:h-[70px] md:h-[50px] h-[28px] lg:text-[18px] md:text-[18px] text-[14px] font-semibold tracking-tight text-foreground-800 dark:text-white">
                  {product.name.length > 60
                    ? `${product.name.substring(0, 60)}...`
                    : product.name || 'Product Name'}
                </h5>
              </Link>
              <div>
                <p className="lg:text-[14px] md:text-[14px] text-[12px] font-medium text-foreground-600">
                  Shop :{' '}
                  <Link href="">
                    <span className="lg:text-[14px] md:text-[14px] font-medium text-blue-800">
                      {product.shop.length > 30
                        ? `${product.shop.substring(0, 20)}...`
                        : product.shop || 'Shop Name'}
                    </span>
                  </Link>
                </p>
                <p className="lg:text-[14px] md:text-[14px] text-[12px] font-medium text-foreground-600">
                  Expired date :{' '}
                  <span className="lg:text-[14px] md:text-[14px] font-medium text-red-500">
                    {product.expiredAt}
                  </span>
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center justify-start font-semibold">
                  <span className="lg:pt-2 pt-1 lg:text-xl md:text-xl text-[12px] font-bold text-foreground-500 line-through dark:text-white">
                    ${product.price || 'Price'}
                  </span>
                  <span className="lg:ml-3 md:ml-3 ml-1 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text font-bold text-transparent lg:text-2xl md:text-2xl text-[18px]">
                    ${product.price - product.discountPrice || 'Price'}
                  </span>
                </div>
                <Button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        location: '',
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
                  className="h-[37px] lg:w-[100px] md:w-[100px] w-[80px] text-[12px] lg:text-[14px] md:text-[14px] rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center text-white"
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
