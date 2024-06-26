"use client"

import { CartProductType } from '@/libs/difinition';
import { useGetProductsQuery } from '@/redux/service/product';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { LuShoppingCart } from 'react-icons/lu';

export default function NormalProductComponent() {
  const router = useRouter();
  const { data, isLoading, error } = useGetProductsQuery({page:1,size:8,field:"",fieldName:""});
  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6">
      {data?.payload.list.map((product: CartProductType) => (
          <Card
          onClick={() => router.push(`/${product.slug}`)}
            key={product.slug}
            isPressable
            onPress={() => console.log('item pressed')}
            className="relative h-[395px] w-[284px] mb-2 flex-none rounded-xl  shadow-none  bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <CardBody className="relative h-[260px] overflow-visible rounded-b-lg px-4">
            <Link href="#">
            <Image
                  className="h-[193px] w-[284px] object-cover"
                  src={product.images[0].url || 'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'}
                  alt={product.name}
                />
            </Link>
            <div className="mt-4 flex h-[20px]">
                <div className="flex items-center rtl:space-x-reverse">
                {[...Array(Math.floor(product.ratingAvg))].map((_, index) => (
                    <svg
                      key={index}
                      className="h-4 w-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                  {[...Array(5 - Math.floor(product.ratingAvg))].map((_, index) => (
                    <svg
                      key={index}
                      className="h-4 w-4 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[15px] ml-1 text-gray-600 font-medium">
                 ({product.ratingAvg}) Reviews
                </span>
              </div>
              <Link href="#">
                <h5 className="font-semibold mt-1 text-[18px] tracking-tight text-gray-800 dark:text-white h-[45px]">
                {product.name.length > 60
                    ? `${product.name.substring(0, 45)}...`
                    : product.name || "Product Name"}
                </h5>
              </Link>
              <div className=" pt-2 h-[30px]">
                <p className="font-medium text-[14px] text-gray-600 ">
                  Shop :{' '}
                  <Link href=''>
                 <span className="text-[14px] font-medium text-blue-800">
                  {product.shop.length > 30
                    ? `${product.shop.substring(0, 20)}...`
                    : product.shop || "Shop Name"}
                  </span>
                  </Link>
                </p>
                <p className="font-medium text-[14px] text-gray-600 ">
                  Expired date : {' '}
                  <span className="font-medium text-red-500">
                    {product.expiredAt}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between py-8">
                  <div className="flex items-center justify-start">
                    <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent">
                      ${product.price || "Price"}
                    </span>
                  </div>
                  <div className="flex justify-end gap-[15px]">
                    <a href="#">
                      <FaRegHeart className="h-[25px] w-[25px] text-[#eb7d52]" />
                    </a>
                    <a href="">
                      <LuShoppingCart className="h-[25px] w-[25px] text-[#eb7d52]" />
                    </a>
                  </div>
                </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
