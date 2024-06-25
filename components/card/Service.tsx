import { CartProductType } from '@/libs/difinition';
import { useGetProductsQuery } from '@/redux/service/product';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { LuShoppingCart } from 'react-icons/lu';

export default function ServiceCardComponent() {
  const router = useRouter();
  const { data, isLoading, error } = useGetProductsQuery({page:1,size:4,field:"",fieldName:""});
  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);
  

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[38px] ">
      {data?.payload.list.map((product: CartProductType) => (
          <Card
            key={product.slug}
            isPressable
            onPress={() => console.log('item pressed')}
            className="w-[595px]  shadow-none"
          >
            <div className="flex p-2">
                <Link href="#">
                <Image
                  className="h-[193px] w-[250px] object-cover"
                  src={product.images[0].url || 'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'}
                  alt={product.name}
                />
                </Link>
              <div className="item-start text-left pl-4 w-[300px]">
                <a href="#">
                  <h5 className="text-lg font-semibold tracking-tight text-gray-800 dark:text-white h-[50px]">
                    {product.name.length > 50
                      ? `${product.name.substring(0, 50)}...`
                      : product.name || "Product Name"}
                  </h5>
                </a>
                <div className='my-3 flex flex-col gap-1'>
                  <p className="text-sm text-gray-600">
                    Shop :{' '}
                    <Link href="">
                      <span className="text-sm font-medium text-blue-800">
                        {product.shop || "Shop Name".length > 30
                          ? `${product.shop || "Shop Name".substring(0, 20)}...`
                          : product.shop || "Shop Name"}
                      </span>
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600">
                    Expired date :{' '}
                    <span className="text-sm font-medium text-red-500">
                      {product.expiredAt}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Open :{' '}
                    <span className="text-sm font-medium text-gray-900">
                      09:00 AM - 08:00 PM
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="mt-3">
                    <span className="text-base text-gray-500 dark:text-white">
                      From
                    </span>
                    <span className="ml-3 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-[28px] font-semibold text-transparent">
                      $ {product.price}
                    </span>
                  </div>
                  <div className="flex justify-end gap-[15px] mt-3">
                    <a href="#">
                      <FaRegHeart className="h-[25px] w-[25px] text-[#eb7d52]" />
                    </a>
                    <a href="">
                      <LuShoppingCart className="h-[25px] w-[25px] text-[#eb7d52]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
