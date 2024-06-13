import { CartProductType } from '@/libs/difinition';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function DiscountCardComponent() {
  const [products, setProducts] = useState<CartProductType[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the fake API
    fetch(`${process.env.NEXT_PUBLIC_DEALKH_API_URL}/api/v1/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.slice(0, 8));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
<<<<<<< HEAD
    <main>
      {/* section header */}
      <div className="my-8 h-[50px] flex items-center justify-between">
        {/* Left section */}
        <div className="flex-1">
          <p className="relative w-fit text-[26px] text-gray-800 font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Top <span className='text-[#eb7d52]'>Sales</span>
          </p>
        </div>
        {/* Right section */}
        <Link href='#'>
          <div className="flex items-center text-gray-800 pt-1">
            <p className="mr-2 text-[17px] font-normal pb-1">See More</p>
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
                stroke="#545c6a"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M42 24H6m24-12l12 12l-12 12"
              />
            </svg>
          </div>
        </Link>
      </div>

      {/* for the card section*/}

      <div className="flex flex-wrap justify-between gap-[25px]">
=======
    <div>
      <div className="flex flex-wrap justify-center gap-7">
>>>>>>> b8e15d8a071696ff30224210425f29d791906c50
        {products.map((product) => (
          <Card
            onClick={() => router.push(`/${product.id}`)}
            key={product.id}
            isPressable
            onPress={() => console.log('item pressed')}
<<<<<<< HEAD
            className="relative h-[386px] w-[284px] mb-2 border border-gray flex-none rounded-xl shadow-none bg-white dark:border-gray-700 dark:bg-gray-800"
=======
            className="relative mb-2 h-[386px] w-[285px] flex-none rounded-xl border border-gray-200 bg-white shadow-none dark:border-gray-700 dark:bg-gray-800"
>>>>>>> b8e15d8a071696ff30224210425f29d791906c50
          >
            <CardBody className="relative h-[260px] overflow-visible rounded-b-lg px-4">
              <Link href="#">
                <Image
                  className="h-[193px] w-[284px] object-cover"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
<<<<<<< HEAD
              <span className='absolute right-0 top-0 z-20 h-[54px] w-[54px] rounded-bl-xl rounded-tr-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-center text-[14px] font-semibold text-white'>
=======
              <span className="absolute right-0 top-0 z-20 h-[54px] w-[54px] rounded-bl-xl rounded-tr-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-center text-[14px] font-semibold text-white">
>>>>>>> b8e15d8a071696ff30224210425f29d791906c50
                25% OFF
              </span>
              <div className="mt-4 flex h-[20px]">
                <div className="flex items-center rtl:space-x-reverse">
                  {[...Array(4)].map((_, index) => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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
                  <svg
                    className="h-4 w-4 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
<<<<<<< HEAD
                <span className="text-[15px] ml-1 text-gray-600 font-medium">
=======
                <span className="ml-1 text-[15px] font-medium text-gray-600">
>>>>>>> b8e15d8a071696ff30224210425f29d791906c50
                  (32) Reviews
                </span>
              </div>
              <Link href="#">
                <h5 className="mt-1 h-[45px] text-[18px] font-semibold tracking-tight text-gray-800 dark:text-white">
                  {product.name.length > 60
                    ? `${product.name.substring(0, 60)}...`
<<<<<<< HEAD
                    : product.name} For Your Need, Starlight Sport
=======
                    : product.name}{' '}
                  For Your Need, Starlight Sport
>>>>>>> b8e15d8a071696ff30224210425f29d791906c50
                </h5>
              </Link>
              <div className=" h-[30px] pt-2">
                <p className="text-[14px] font-medium text-gray-600 ">
                  Shop :{' '}
                 <Link href=''>
                 <span className="text-[14px] font-medium text-blue-800">
                  {product.shop_name.length > 30
                    ? `${product.shop_name.substring(0, 20)}...`
                    : product.shop_name}
                  </span>
                  </Link>
                </p>
                <p className="text-[14px] font-medium text-gray-600 ">
                  Expired date :{' '}
                  <span className="font-medium text-red-500">
                    {product.expired_at}
                  </span>
                </p>
              </div>
              <div className="flex h-[30px] items-center justify-start pt-10 font-semibold">
                <span className="pt-1 text-base font-bold text-gray-700 line-through dark:text-white">
                  ${product.original_price}
                </span>
                <span className="ml-4 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent">
                  ${product.discount_price}
                </span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
