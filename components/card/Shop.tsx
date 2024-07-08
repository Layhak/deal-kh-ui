import { ShopResponse } from '@/libs/difinition';
import { useGetAllShopsQuery } from '@/redux/service/shop';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ShopCardComponent() {
  const router = useRouter();
  const { data, isLoading, error } = useGetAllShopsQuery({
    page: 1,
    size: 3,
  });

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[35px]">
        {data?.payload.list.map((shop: ShopResponse) => (
          <Card
            key={shop.slug}
            isPressable
            onPress={() => console.log('item pressed')}
            className="w-[387px] p-2  shadow-none"
          >
            <CardBody> 
              <a href="#">
                <h5 className="text-foreground-800 mb-2 h-[52px] text-xl font-semibold tracking-tight dark:text-white">
                  {shop.name.length > 50
                    ? `${shop.name.substring(0, 20)}...`
                    : shop.name || 'Shop Name'}
                </h5>
              </a>
              <Link href="#">
                <Image
                  className="h-[193px] w-[350px] object-cover"
                  src={
                    shop.images?.[0]?.url ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={shop.name}
                />
              </Link>
              <div className="mb-2 mt-2.5 flex items-center"></div>
              <div className="text-foreground-600 mb-12 h-[30px]">
                <p>
                  {shop.description.length > 115
                    ? `${shop.description.substring(0, 115)}...`
                    : shop.description || 'shop Description'}
                </p>
              </div>
              <div className="my-1 flex flex-col gap-1">
                <p className=" text-foreground-600">
                  Category :{' '}
                  <span className="text-foreground-900 font-medium">
                    {shop.shopType || 'shop Category'}
                  </span>
                </p>
                <p className="text-foreground-600 text-sm">
                  Open :{' '}
                  <span className="text-foreground-900 text-sm font-medium">
                    {shop.openAt} AM - {shop.closeAt} PM
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center justify-start">
                  <span className="text-blue-700 pt-2 text-sm font-medium ">
                    Available Now.
                    <p>Get Notified.</p>
                  </span>
                </div>
                <a
                  href="#"
                  className="h-[37px] w-[130px] rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 pt-2 text-center text-[14px] text-white "
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
