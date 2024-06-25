'use client';

import { CartProductType } from '@/libs/difinition';
import { useGetProductsQuery } from '@/redux/service/product';
import { Button, Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ClearanceCardComponent() {
  const router = useRouter();
  const { data, isLoading, error } = useGetProductsQuery({
    page: 1,
    size: 3,
    field: '',
    fieldName: '',
  });
  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[35px]">
        {data?.payload.list.map((product: CartProductType) => (
          <Card
            onClick={() => router.push(`/${product.slug}`)}
            key={product.slug}
            isPressable
            className="w-[387px] shadow-none"
          >
            <CardBody>
              <Link href="#">
                <Image
                  className="h-[250px] w-[400px] object-cover"
                  src={
                    product.images[0].url ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={product.name}
                />
              </Link>
              <div className="mb-2 mt-2.5 flex items-center">
                <div className="flex items-center gap-2 rtl:space-x-reverse">
                  {[...Array(Math.floor(product.ratingAvg))].map((_, index) => (
                    <svg
                      className="text-foreground-200 dark:text-foreground-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      key={index}
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                  {[...Array(5 - Math.floor(product.ratingAvg))].map(
                    (_, index) => (
                      <svg
                        className="text-foreground-200 dark:text-foreground-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        key={index}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    )
                  )}
                </div>
                <span className="text-foreground-600 ml-2 text-[16px] font-medium">
                  ({product.ratingAvg}) Reviews
                </span>
              </div>
              <Link href="#">
                <h5 className="text-foreground-800 mb-2 h-[70px] text-xl font-semibold tracking-tight dark:text-white">
                  {product.name.length > 60
                    ? `${product.name.substring(0, 60)}...`
                    : product.name || 'Product Name'}
                </h5>
              </Link>
              <div>
                <p className="text-foreground-600">
                  Shop :{' '}
                  <Link href="">
                    <span className="text-info-800 text-[14px] font-medium">
                      {product.shop.length > 30
                        ? `${product.shop.substring(0, 20)}...`
                        : product.shop || 'Shop Name'}
                    </span>
                  </Link>
                </p>
                <p className="text-foreground-600">
                  Expired date :{' '}
                  <span className="font-medium text-red-500">
                    {product.expiredAt}
                  </span>
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center justify-start font-semibold">
                  <span className="text-foreground-500 pt-2 text-lg font-bold line-through dark:text-white">
                    ${product.price || 'Price'}
                  </span>
                  <span className="ml-3 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-3xl font-bold text-transparent">
                    ${product.discountPrice || 'Price'}
                  </span>
                </div>
                <Button
                  onClick={() => router.push(`/products`)}
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
