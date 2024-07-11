'use client';
import { Card, Image, Link } from '@nextui-org/react';
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
    size: 4
  });

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[38px] ">
        {data?.payload.list.map((product: ScrapedProduct) => (
          <Card key={product.name} className="w-[595px]  shadow-none">
            <div className="flex p-2">
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
