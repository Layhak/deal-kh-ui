'use client';
import { Card, CardBody, CardHeader, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ScrapedProduct } from '@/types/productScrape';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { MdOutlineShoppingCart, MdShoppingCart } from 'react-icons/md';
import { useGetProductScrapeQuery } from '@/redux/service/productScrape';

export default function ServiceCardComponent() {
  const router = useRouter();

  const { data } = useGetProductScrapeQuery({
    page: 1,
    size: 4,
  });

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-7 ">
        {data?.payload.list.map((product: ScrapedProduct) => (
          <Card key={product.name} className="py-4 shadow-none h-[340px] w-[285px] ">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start  h-[130px]">
              <h4 className="font-bold text-large text-foreground-800">{product.name.length > 60
                      ? `${product.name.substring(0, 60)}...`
                      : product.name || 'Product Name'}</h4>
        <div className='flex items-center justify-between mt-2'>

        <p className="bg-gradient-to-r from-pink-500 from-20% to-yellow-500 to-100% bg-clip-text text-2xl font-bold text-transparent">${product.price}</p>

        <Link  href={product.url} target='_blank'>
        <p className='text-blue-800 text-base mt-2 font-medium'>Check Out</p>
        </Link>
  
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
      <Link href={product.url} target="_blank">
        <Image
          alt="Card Service"
          isZoomed
          className="object-cover rounded-xl h-[160px] w-[284px] mt-2"
          src={
            product.image ||
            'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
          }
          width={270}
        />
         </Link>
      </CardBody>

            {/* <div className="flex p-2">
              <Link href={product.url} target="_blank">
                <Image
                  className="h-[193px] w-[250px] object-cover"
                  src={
                    product.image ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={product.name}
                />
              </Link>
              <div className="item-start w-[300px] pl-4 text-left">
                <a href="#">
                  <h5 className="h-[50px] text-lg font-semibold tracking-tight text-foreground-800 dark:text-white">
                    {product.name.length > 50
                      ? `${product.name.substring(0, 50)}...`
                      : product.name || 'Product Name'}
                  </h5>
                </a>
                <div className="my-3 ">
                  <p className="text-sm text-foreground-600">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="mt-3">
                    <span className="text-base text-foreground-500 dark:text-white">
                      From
                    </span>
                    <span className="ml-3 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-[28px] font-semibold text-transparent">
                      ${product.price}
                    </span>
                  </div>
                  <Link href={product.url} target="_blank">
               <button className="h-[37px] w-[130px] rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center text-[14px] text-white mt-3 justify-end">
                  Check Us Out
               </button>
                </Link>
                </div>
              </div>
            </div> */}
          </Card>
        ))}
      </div>
    </div>
  );
}
