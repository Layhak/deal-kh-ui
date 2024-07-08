import { CartProductType } from '@/libs/difinition';
import { useGetProductsQuery } from '@/redux/service/product';
import { Avatar, Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaShopLock } from 'react-icons/fa6';
import { bgGreen } from 'next/dist/lib/picocolors';

export default function ShopCardComponent() {
  const router = useRouter();
  const { data, error } = useGetProductsQuery({
    page: 1,
    size: 6,
  });
  // console.log('data', data);
  // console.log('error', error);
  // console.log('isLoading', isLoading);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[35px]">
        {data?.payload.list.map((product: CartProductType) => (
          <Card
            key={product.slug}
            isPressable
            onPress={() => console.log('item pressed')}
            className="w-[387px] p-2  shadow-none"
          >
            <CardBody>
              <a href="#">
                <div className="flex">
                  <FaShopLock size={24} color="rgb(200, 150, 50)" />
                  <h5 className="h-[52px] px-2 text-xl font-semibold tracking-tight text-foreground-800 dark:text-white">
                    {product.shop.length > 50
                      ? `${product.shop.substring(0, 20)}...`
                      : product.shop || 'Shop Name'}
                  </h5>
                </div>
              </a>
              <Link href="#">
                <Image
                  className="h-[193px] w-[350px] object-cover"
                  src={
                    product.images[0].url ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={product.name}
                />
              </Link>
              <div className="mb-2 mt-2.5 flex items-center"></div>
              <div className="mb-12 h-[30px] text-foreground-600">
                <p>
                  {product.description.length > 115
                    ? `${product.description.substring(0, 115)}...`
                    : product.description || 'Product Description'}
                </p>
              </div>
              <div className="my-1 flex flex-col gap-1">
                <p className=" text-foreground-600">
                  Category :{' '}
                  <span className="font-medium text-foreground-900">
                    {product.category || 'Product Category'}
                  </span>
                </p>
                <p className="text-sm text-foreground-600">
                  Open :{' '}
                  <span className="text-sm font-medium text-foreground-900">
                    09:00 AM - 08:00 PM
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center justify-start">
                  <span className="pt-2 text-sm  text-foreground-900 dark:text-white">
                    <p className="text-base font-semibold text-blue-700">
                      Available Now.
                    </p>
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
