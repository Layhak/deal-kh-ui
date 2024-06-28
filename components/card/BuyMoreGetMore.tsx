import { CartProductType } from '@/libs/difinition';
import { useGetProductsQuery } from '@/redux/service/product';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';

export default function BuyMoreGetMoreComponent() {
  const router = useRouter();
  const { data, isLoading, error } = useGetProductsQuery({
    page: 1,
    size: 8,
    field: '',
    fieldName: '',
  });
  // console.log('data', data);
  // console.log('error', error);
  // console.log('isLoading', isLoading);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-7">
        {data?.payload.list.map((product: CartProductType) => (
          <Card
            onClick={() => router.push(`/${product.slug}`)}
            key={product.slug}
            isPressable
            onPress={() => console.log('item pressed')}
            className="relative mb-2 h-[330px] w-[285px] flex-none rounded-xl border-1 border-foreground-200  bg-foreground-100 shadow-none dark:border-foreground-700  dark:bg-foreground-800"
          >
            <CardBody className="relative h-[230px] overflow-visible rounded-b-lg px-4">
              <Link href="#">
                <Image
                  className="h-[160px] w-[284px] object-cover"
                  src={
                    product.images[0].url ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={product.name}
                />
              </Link>
              <span className="absolute right-4 top-3 z-20 h-[54px] w-[54px] rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-center text-[14px] font-medium text-white">
                BUY 1 GET 1
              </span>
              <div className="flex flex-wrap justify-between">
                {product.name.length > 20 ? (
                  <Link href="#" className={'block w-[200px]'}>
                    <Marquee speed={20}>
                      <h5 className="mt-3 text-[18px]  font-semibold text-foreground-800 ">
                        {product.name}
                      </h5>
                    </Marquee>
                  </Link>
                ) : (
                  <Link href="#">
                    <h5 className="mt-3 text-[18px]  font-semibold text-foreground-800 ">
                      {product.name}
                    </h5>
                  </Link>
                )}
                <Link href="" className="right-4 mt-3">
                  <FaRegHeart className="h-[25px] w-[25px] text-[#eb7d52]" />
                </Link>
              </div>
              <div className=" h-[30px] pt-3">
                <p className="text-[14px] font-medium text-foreground-600 ">
                  Shop :{' '}
                  <Link href="">
                    <span className="text-[14px] font-medium text-blue-800">
                      {product.shop.length > 20
                        ? `${product.shop.substring(0, 20)}...`
                        : product.shop}
                    </span>
                  </Link>
                </p>
                <p className="text-[14px] font-medium text-foreground-600 ">
                  Expired date :{' '}
                  <span className="font-medium text-red-500">
                    {product.expiredAt}
                  </span>
                </p>
              </div>
              <span className="bg-gradient-to-r from-pink-500 from-20% to-yellow-500 to-100% bg-clip-text pt-8 text-2xl font-bold text-transparent">
                ${product.price}
              </span>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
