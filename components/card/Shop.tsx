import { CartProductType } from '@/libs/difinition';
import { useGetProductsQuery } from '@/redux/service/product';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ShopCardComponent() {
  const router = useRouter();
  const { data, isLoading, error } = useGetProductsQuery({page:1,size:3,field:"",fieldName:""});
  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);

  return (
    <div>
    <div className="flex flex-wrap justify-center gap-[35px]">
    {data?.payload.list.map((product: CartProductType) => (
        <Card
          key={product.slug}
          isPressable
          onPress={() => console.log('item pressed')}
          className="w-[387px] shadow-none  p-2"
        >
          <CardBody>
          <a href="#">
            <h5 className="text-gray-800 text-xl font-semibold tracking-tight dark:text-white mb-2 h-[52px]">
            {product.shop.length > 50
                  ? `${product.shop.substring(0, 20)}...`
                  : product.shop || "Shop Name"} 
            </h5>
          </a>
          <Link href="#">
          <Image
                  className="h-[193px] w-[350px] object-cover"
                  src={product.images[0].url || 'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'}
                  alt={product.name}
                />
          </Link>
          <div className="mb-2 mt-2.5 flex items-center">
          </div>
          <div className='mb-12 h-[30px] text-gray-600'>
           <p>
           {product.description.length > 115
                  ? `${product.description.substring(0, 115)}...`
                  : product.description || "Product Description"}
           </p>
          </div>
          <div className='flex flex-col gap-1 my-1'>
              <p className=" text-gray-600">
               Category : {' '}
                <span className='font-medium text-gray-900'>
                {product.category || "Product Category"}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                  Open :{' '}
                  <span className="text-sm font-medium text-gray-900">
                    09:00 AM - 08:00 PM
                  </span>
                </p>
            </div>
          <div className="flex pt-4 items-center justify-between">
          <div className="flex items-center justify-start">
              <span className="pt-2 text-sm  text-gray-900 dark:text-white">
                Available Now.
                <p>Get Notified.</p>
              </span>
            </div>
            <a
              href="#"
              className="rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center pt-2 text-[14px] text-white h-[37px] w-[130px] "
            >
              Check Us Out
            </a>
          </div>
          </CardBody>
        </Card>
      ))}
    </div>
  </div>

  );
}
