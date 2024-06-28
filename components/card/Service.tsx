import { CartProductType } from '@/libs/difinition';
import { useGetProductsQuery } from '@/redux/service/product';
import { Card, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { LuShoppingCart } from 'react-icons/lu';

export default function ServiceCardComponent() {
  const router = useRouter();
  const { data, isLoading, error } = useGetProductsQuery({
    page: 1,
    size: 4,
    field: '',
    fieldName: '',
  });
  // console.log('data', data);
  // console.log('error', error);
  // console.log('isLoading', isLoading);

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
                  src={
                    product.images[0].url ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={product.name}
                />
              </Link>
              <div className="item-start w-[300px] pl-4 text-left">
                <a href="#">
                  <h5 className="text-foreground-800 h-[50px] text-lg font-semibold tracking-tight dark:text-white">
                    {product.name.length > 50
                      ? `${product.name.substring(0, 50)}...`
                      : product.name || 'Product Name'}
                  </h5>
                </a>
                <div className="my-3 flex flex-col gap-1">
                  <p className="text-foreground-600 text-sm">
                    Shop :{' '}
                    <Link href="">
                      <span className="text-info-800 text-sm font-medium">
                        {product.shop || 'Shop Name'.length > 30
                          ? `${product.shop || 'Shop Name'.substring(0, 20)}...`
                          : product.shop || 'Shop Name'}
                      </span>
                    </Link>
                  </p>
                  <p className="text-foreground-600 text-sm">
                    Expired date :{' '}
                    <span className="text-sm font-medium text-red-500">
                      {product.expiredAt}
                    </span>
                  </p>
                  <p className="text-foreground-600 text-sm">
                    Open :{' '}
                    <span className="text-foreground-900 text-sm font-medium">
                      09:00 AM - 08:00 PM
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="mt-3">
                    <span className="text-foreground-500 text-base dark:text-white">
                      From
                    </span>
                    <span className="ml-3 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-[28px] font-semibold text-transparent">
                      $ {product.price}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-end gap-[15px]">
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
