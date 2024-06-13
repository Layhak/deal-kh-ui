import { CartProductType } from '@/libs/difinition';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { LuShoppingCart } from 'react-icons/lu';

export default function ServiceCardComponent() {
  const [products, setProducts] = useState<CartProductType[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the fake API
    fetch(`${process.env.NEXT_PUBLIC_DEALKH_API_URL}/api/v1/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.slice(0, 4));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[38px] ">
        {products.map((product) => (
          <Card
            key={product.id}
            isPressable
            onPress={() => console.log('item pressed')}
            className="w-[595px] border border-gray-200 shadow-none"
          >
            <div className="flex p-2">
                <Link href="#">
                  <Image
                    className="w-[350px] h-[195px]  object-cover mx-1"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
              <div className="item-start text-left px-4">
                <a href="#">
                  <h5 className="text-lg font-semibold tracking-tight text-gray-800 dark:text-white">
                    {product.name.length > 60
                      ? `${product.name.substring(0, 60)}...`
                      : product.name}{' '}
                    For Your Need, Starlight Sport
                  </h5>
                </a>
                <div className='my-3 flex flex-col gap-1'>
                  <p className="text-sm text-gray-600">
                    Shop :{' '}
                    <Link href="">
                      <span className="text-sm font-medium text-blue-800">
                        {product.shop_name.length > 30
                          ? `${product.shop_name.substring(0, 20)}...`
                          : product.shop_name}
                      </span>
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600">
                    Expired date :{' '}
                    <span className="text-sm font-medium text-red-500">
                      {product.expired_at}
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
                      $ 3.5
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
