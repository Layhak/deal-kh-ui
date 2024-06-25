'use client';
import { CartProductType } from '@/libs/difinition';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Buy1Get1Component() {
  const [products, setProducts] = useState<CartProductType[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the fake API
    fetch(`${process.env.NEXT_PUBLIC_DEALKH_API_URL}/api/v1/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.slice(34, 40));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[25px]">
        {products.map((product) => (
          <Card
            onClick={() => router.push(`/${product.id}`)}
            key={product.id}
            isPressable
            onPress={() => console.log('item pressed')}
            className="relative mb-2 h-[330px] w-[250px] flex-none rounded-xl border border-0 bg-white shadow-none dark:border-gray-700 dark:bg-gray-800"
          >
            <CardBody className="relative h-[230px] overflow-visible rounded-b-lg px-4">
              <Link href="#">
                <Image
                  className="h-[160px] w-[224px] object-cover"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <span className="absolute right-4 top-3 z-20 h-[54px] w-[54px] rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-center text-[14px] font-medium text-white">
                BUY 1 GET 1
              </span>
              <div className="flex flex-wrap justify-between">
                <Link href="#">
                  <h5 className="mt-3 h-[45px] w-[160px] text-[18px] font-semibold tracking-tight text-gray-800 dark:text-white">
                    {product.name.length > 60
                      ? `${product.name.substring(0, 60)}...`
                      : product.name}
                  </h5>
                </Link>
                <a href="" className="right-4 mt-3">
                  <FaRegHeart className="h-[25px] w-[25px] text-[#eb7d52]" />
                </a>
              </div>
              <div className=" h-[30px] pt-3">
                <p className="text-[14px] font-medium text-gray-600 ">
                  Shop :{' '}
                  <Link href="">
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
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text pt-8 text-2xl font-bold text-transparent">
                ${product.discount_price}
              </span>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
