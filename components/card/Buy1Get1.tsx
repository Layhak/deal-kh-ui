'use client';

import { Card, CardBody, Image, Link } from '@nextui-org/react';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useGetProductsQuery } from '@/redux/service/product';
import { CartProductType } from '@/libs/difinition';

export default function Buy1Get1Component() {
  const router = useRouter();
  const { data, isLoading, error } = useGetProductsQuery({
    page: 1,
    size: 6,
    field: '',
    fieldName: '',
  });
  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[25px]">
        {data?.payload.list.map((product: CartProductType) => (
          <Card
            onClick={() => router.push(`/products`)}
            key={product.slug}
            isPressable
            className="dark:border-foreground-700 bg-foreground-50 relative mb-2 h-[330px] w-[250px]  flex-none rounded-xl  shadow-none"
          >
            <CardBody className="relative h-[230px] overflow-visible rounded-b-lg px-4">
              <Link href="#">
                <Image
                  className="h-[160px] w-[224px] object-cover"
                  src={
                    product.images[0].url ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={product.name}
                />
              </Link>
              <span className="absolute right-4 top-3 z-20 h-[54px] w-[54px] rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 pt-2 text-center text-[14px] font-medium text-white">
                BUY 1 GET 1
              </span>
              <div className="flex flex-wrap justify-between">
                <Link href="#">
                  <h5 className="text-foreground-800 mt-3 h-[45px] w-[160px] text-[18px] font-semibold tracking-tight dark:text-white">
                    {product.name.length > 30
                      ? `${product.name.substring(0, 25)}...`
                      : product.name || 'Product Name'}
                  </h5>
                </Link>
                <a href="" className="right-4 mt-3">
                  <FaRegHeart className="h-[25px] w-[25px] text-[#eb7d52]" />
                </a>
              </div>
              <div className=" h-[30px] pt-3">
                <p className="text-foreground-600 text-[14px] font-medium ">
                  Shop :{' '}
                  <Link href="">
                    <span className="text-info-800 text-[14px] font-medium">
                      {product.shop.length > 20
                        ? `${product.shop.substring(0, 20)}...`
                        : product.shop || 'Shop Name'}
                    </span>
                  </Link>
                </p>
                <p className="text-foreground-600 text-[14px] font-medium ">
                  Expired date :{' '}
                  <span className="font-medium text-red-500">
                    {product.expiredAt || 'Expired Date'}
                  </span>
                </p>
              </div>
              <span className="bg-gradient-to-l from-pink-500 from-70% to-yellow-500 to-100% bg-clip-text pt-8 text-2xl font-bold text-transparent">
                ${product.price || 'Price'}
              </span>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {/*<div className="flex justify-center mt-4">*/}
      {/*  <Pagination*/}
      {/*    currentPage={page}*/}
      {/*    pageSize={pageSize}*/}
      {/*    totalItems={data?.count || 0}*/}
      {/*    onPageChange={handlePageChange}*/}
      {/*    onPageSizeChange={handlePageSizeChange}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
}
