'use client';
import { ProductDetail } from '@/types/productDetail';
import { Button, Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CardDetailComponent({}) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);

  const staticData = {
    id: 1,
    name: 'Spiced Mint Candle',
    category: 'make up product',
    description:
      'All hand-made with natural soy wax, Candleaf is made for your pleasure moments All hand-made with natural soy wax, Candleaf is made for your pleasure moments with natural soy wax, Candleaf is made for your pleasure moment ...',
    shopName: 'Koko Kaka',
    discountType: 'Percentage',
    originalPrice: 50.98,
    discountPrice: 40.99,
    open: '6:00AM - 20:00PM',
    imageUrl:  'https://www.slownorth.com/cdn/shop/products/tuscan-sun-candle-8oz-slow-north-1_800x.png?v=1701754012',
    expiryDate: '2024-12-31',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 content-center gap-8 sm:grid-cols-2">
        {/* Product Image */}
        <div className="rounded-lg text-center">
          <Image
            src={staticData.imageUrl}
            alt={staticData.name}
            className="w-full h-[450px] rounded-lg"
          />
        </div>
        {/* Product Details */}
        <div className="md:flex md:flex-col md:gap-4">
          {/* Star section */}
          <div className="flex items-center">
            {[...Array(4)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-yellow-500"
              >
                <path
                  d="M9.04897 2.92708C9.34897 2.00608 10.652 2.00608 10.951 2.92708L12.021 6.21908C12.0863 6.41957 12.2134 6.59426 12.384 6.71818C12.5547 6.84211 12.7601 6.90892 12.971 6.90908H16.433C17.402 6.90908 17.804 8.14908 17.021 8.71908L14.221 10.7531C14.05 10.8771 13.9227 11.0521 13.8573 11.2529C13.7919 11.4538 13.7918 11.6702 13.857 11.8711L14.927 15.1631C15.227 16.0841 14.172 16.8511 13.387 16.2811L10.587 14.2471C10.4162 14.1231 10.2105 14.0563 9.99947 14.0563C9.78842 14.0563 9.58277 14.1231 9.41197 14.2471L6.61197 16.2811C5.82797 16.8511 4.77397 16.0841 5.07297 15.1631L6.14297 11.8711C6.20815 11.6702 6.20803 11.4538 6.14264 11.2529C6.07725 11.0521 5.94994 10.8771 5.77897 10.7531L2.97997 8.72008C2.19697 8.15008 2.59997 6.91008 3.56797 6.91008H7.02897C7.24002 6.91013 7.44568 6.84342 7.6165 6.71948C7.78732 6.59554 7.91455 6.42073 7.97997 6.22008L9.04997 2.92808L9.04897 2.92708Z"
                  fill="#FACA15"
                />
              </svg>
            ))}
            <svg
              className="h-4 w-4 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span className="text-sm pl-2 text-gray-600 dark:text-white">
              32 Reviews
            </span>
          </div>
          {/* Product information */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-white md:text-3xl">
              {staticData.name}
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {staticData.description}
            </p>
            {/* Price */}
            <div className="mt-4 flex flex-col md:flex-row items-end">
              <p className="text-lg font-bold text-gray-700 line-through dark:text-white md:mr-3">
                ${staticData.originalPrice}
              </p>
              <p className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-3xl font-bold text-transparent">
                ${staticData.discountPrice}
              </p>
            </div>
            {/* Shop and other details */}
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Shop:{' '}
                <span className="font-semibold">{staticData.shopName}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Open: {staticData.open}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Discount Type:{' '}
                <span className="font-semibold">{staticData.discountType}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Promotion Date:{' '}
                <span className="font-semibold text-red-600">
                  {staticData.expiryDate}
                </span>
              </p>
            </div>
          </div>
          {/* Buttons */}
          <div className="mt-4 flex flex-col md:flex-row md:gap-4">
            <Button className=" rounded-lg outline-0 ring-2 ring-orange-500 bg-clip-text text-lg font-semibold h-12 md:w-96 text-transparent bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
              Add to Cart
            </Button>
            <Button className=" rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-lg font-semibold text-white h-12 w-96">
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
