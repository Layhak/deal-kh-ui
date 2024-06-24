'use client';

import { CartProductType } from '@/libs/difinition';
import { addToCart } from '@/redux/feature/cart/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import { useGetProductsQuery } from '@/redux/service/product';
import { Button, Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ClearanceCardComponent() {
  const router = useRouter();
  const { data, isLoading, error } = useGetProductsQuery({page:1,size:3,field:"",fieldName:""});
  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);
  
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[35px]">
        {data?.list.map((product: CartProductType) => (
          <Card
            onClick={() => router.push(`/${product.slug}`)}
            key={product.slug}
            isPressable
            className="w-[387px] shadow-none border border-gray-200"
          >
            <CardBody>
              <Link href="#">
                <Image
                  className="object-cover h-[250px] w-[400px]"
                  src={product.images[0].url || 'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'}
                  alt={product.name}
                />
              </Link>
              <div className="mb-2 mt-2.5 flex items-center">
                <div className="flex items-center rtl:space-x-reverse">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="none"
                      key={index}
                    >
                      <path
                        d="M9.04897 2.92708C9.34897 2.00608 10.652 2.00608 10.951 2.92708L12.021 6.21908C12.0863 6.41957 12.2134 6.59426 12.384 6.71818C12.5547 6.84211 12.7601 6.90892 12.971 6.90908H16.433C17.402 6.90908 17.804 8.14908 17.021 8.71908L14.221 10.7531C14.05 10.8771 13.9227 11.0521 13.8573 11.2529C13.7919 11.4538 13.7918 11.6702 13.857 11.8711L14.927 15.1631C15.227 16.0841 14.172 16.8511 13.387 16.2811L10.587 14.2471C10.4162 14.1231 10.2105 14.0563 9.99947 14.0563C9.78842 14.0563 9.58277 14.1231 9.41197 14.2471L6.61197 16.2811C5.82797 16.8511 4.77397 16.0841 5.07297 15.1631L6.14297 11.8711C6.20815 11.6702 6.20803 11.4538 6.14264 11.2529C6.07725 11.0521 5.94994 10.8771 5.77897 10.7531L2.97997 8.72008C2.19697 8.15008 2.59997 6.91008 3.56797 6.91008H7.02897C7.24002 6.91013 7.44568 6.84342 7.6165 6.71948C7.78732 6.59554 7.91455 6.42073 7.97997 6.22008L9.04997 2.92808L9.04897 2.92708Z"
                        fill="#FACA15"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-[16px] ml-2 text-gray-600 font-medium">
                  {product.ratingAvg}
                </span>
              </div>
              <Link href="#">
                <h5 className="text-gray-800 text-xl font-semibold tracking-tight dark:text-white mb-2">
                  {product.name.length > 60
                    ? `${product.name.substring(0, 60)}...`
                    : product.name || "Product Name"}
                </h5>
              </Link>
              <div>
                <p className="text-gray-600">
                  Shop :{' '}
                  <Link href="">
                    <span className="text-[14px] font-medium text-blue-800">
                      {product.shop.length > 30
                        ? `${product.shop.substring(0, 20)}...`
                        : product.shop || "Shop Name"}
                    </span>
                  </Link>
                </p>
                <p className="text-gray-600">
                  Expired date :{' '}
                  <span className="font-medium text-red-500">
                    {product.createdAt}
                  </span>
                </p>
              </div>
              <div className="flex mt-3 items-center justify-between">
                <div className="flex items-center justify-start font-semibold">
                  <span className="pt-2 text-lg font-bold text-gray-500 line-through dark:text-white">
                    ${product.price || "Price"}
                  </span>
                  <span className="bg-gradient-to-r ml-3 from-pink-500 to-yellow-500 bg-clip-text text-3xl font-bold text-transparent">
                    ${product.discountPrice || "Price"}
                  </span>
                </div>
                <Button
                 onClick={() => router.push(`/products`)}
                  className="rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center text-[14px] text-white h-[37px] w-[100px]"
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
