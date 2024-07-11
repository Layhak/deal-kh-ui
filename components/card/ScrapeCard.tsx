// src/components/ProductScrapeCardComponent.tsx
import { Image, Link } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useGetProductScrapeQuery } from '@/redux/service/productScrape';
import { ScrapedProduct } from '@/types/productScrape';

export default function ProductScrapeCardComponent() {
  const { data, error, isLoading } = useGetProductScrapeQuery({ page: 1, size: 8 });
  useEffect(() => {
    console.log('isLoading:', isLoading);
    console.log('error:', error);
    console.log('data:', data);
  }, [isLoading, error, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('Error details:', error);
    return <div>Error fetching data: {JSON.stringify(error)}</div>;
  }



  return (
    <div>
      {/* for the detail of the card section */}
      <div className="my-8 flex items-center justify-between">
        {/* Left section */}
        <div className="flex-1">
          <p className="relative text-lg font-bold w-fit after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">
            Products
          </p>
        </div>

        {/* Right section */}
        <div className="flex items-center">
          <p className="mr-2 text-base">See More</p>
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            color="black"
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke="#888888"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M42 24H6m24-12l12 12-12 12"
            />
          </svg>
        </div>
      </div>

      {/* for the card section */}
      <div className="flex flex-wrap justify-between gap-6">
        {data?.payload.list.map((product: ScrapedProduct) => (
          <div
            key={product.name}
            className="relative w-72 flex-none rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="absolute -right-[1px] -top-[0.5px] z-10 h-14 w-14 rounded-bl-[10%] rounded-tr-[10%] bg-gradient-to-tr from-pink-500 to-yellow-500 px-4 py-1">
              <span className="text-start text-sm font-bold text-white">
                {product.discountPercentage}% off
              </span>
            </div>
            <Link href={product.url} target="_blank">
              <div className="relative z-0 h-52 w-full">
                <Image
                  width="100%"
                  height="100%"
                  className="rounded-[7px] object-cover"
                  src={product.image}
                  alt='product'
                />
              </div>
            </Link>
            <div className="px-5 pb-5">
              {/* Star section or rating section */}
              <div className="mt-2.5 flex items-center">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(Math.floor(product.rating))].map((_, index) => (
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
                  {[...Array(5 - Math.floor(product.rating))].map((_, index) => (
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
                <span className="ms-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              
              {/* description section */}
              <Link href={product.url} target="_blank">
                <h5 className="pt-2 text-xl line-clamp-2 font-bold tracking-tight text-black dark:text-white">
                  {product.name}
                </h5>
              </Link>

              <div className="pt-1">
                {product.description && (
                  <p className="font-semibold text-gray-600 ">
                    Description:
                    <span className="font-semibold text-red-600">
                      {product.description}
                    </span>
                  </p>
                )}
                </div>

              <div className="flex items-center justify-start gap-4 pt-2 font-semibold">
                {/* original price */}
                <span className="pt-2 text-base font-bold text-gray-700 line-through dark:text-white">
                  ${product.price}
                </span>
                {/* discount price */}
                <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent">
                  ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
