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
      <div className="flex flex-wrap justify-center gap-[35px]">
        {data?.payload.list.map((product: Product) => (
          <Card
            onClick={() => router.push(`/products/${product.slug}`)}
            key={product.slug}
            className="w-[387px] shadow-none"
          >
            <CardBody>
              <Link href="#">
                <Image
                  isZoomed
                  className="h-[250px] w-[400px] object-cover"
                  src={
                    product.images[0].url ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={product.name}
                />
              </Link>
              <div className="mb-2 mt-2.5 flex items-center">
                <div className="flex items-center rtl:space-x-reverse">
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
                <span className="ml-2 text-[16px] font-medium text-foreground-600">
                  ({totalReviews}) Reviews
                </span>
              </div>
              <Link href="#">
                <h5 className="mb-2 h-[70px] text-xl font-semibold tracking-tight text-foreground-800 dark:text-white">
                  {product.name.length > 60
                    ? `${product.name.substring(0, 60)}...`
                    : product.name || 'Product Name'}
                </h5>
              </Link>
              <div>
                <p className="font-medium text-foreground-600">
                  Shop :{' '}
                  <Link href="">
                    <span className="font-medium text-blue-800">
                      {product.shop.length > 30
                        ? `${product.shop.substring(0, 20)}...`
                        : product.shop || 'Shop Name'}
                    </span>
                  </Link>
                </p>
                <p className="font-medium text-foreground-600">
                  Expired date :{' '}
                  <span className="font-medium text-red-500">
                    {product.expiredAt}
                  </span>
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center justify-start font-semibold">
                  <span className="pt-2 text-xl font-bold text-foreground-500 line-through dark:text-white">
                    ${product.price || 'Price'}
                  </span>
                  <span className="ml-3 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-3xl font-bold text-transparent">
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
                  className="h-[37px] w-[100px] rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center text-[14px] text-white"
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
