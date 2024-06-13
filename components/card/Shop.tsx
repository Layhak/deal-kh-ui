import { CartProductType } from '@/libs/difinition';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function ShopCardComponent() {
  const [products, setProducts] = useState<CartProductType[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the fake API
    fetch(`${process.env.NEXT_PUBLIC_DEALKH_API_URL}/api/v1/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.slice(0,3));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[35px]">
        {products.map((product) => (
          <Card
            key={product.id}
            isPressable
            onPress={() => console.log('item pressed')}
            className="w-[387px] shadow-none border border-gray-200 p-2"
          >
            <CardBody>
            <a href="#">
              <h5 className="text-gray-800 text-xl font-semibold tracking-tight dark:text-white mb-2 h-[52px]">
              {product.shop_name.length > 50
                    ? `${product.shop_name.substring(0, 20)}...`
                    : product.shop_name} blas bluer
              </h5>
            </a>
            <Link href="#">
              <Image className="object-cover h-[200px] w-[400px]" src={product.image} alt={product.name} />
            </Link>
            <div className="mb-2 mt-2.5 flex items-center">
            </div>
            <div className='mb-12 h-[30px] text-gray-600'>
             <p>
             {product.description.length > 115
                    ? `${product.description.substring(0, 115)}...`
                    : product.description}
             </p>
            </div>
            <div className='flex flex-col gap-1 my-1'>
                <p className=" text-gray-600">
                 Category : {' '}
                  <span className='font-medium text-gray-900'>
                  {product.category}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                    Open :{' '}
                    <span className="text-sm font-medium text-gray-900">
                      09:00 AM - 08:00 PM
                    </span>
                  </p>
              </div>
            <div className="flex pt-4 items-center justify-between">
            <div className="flex items-center justify-start">
                <span className="pt-2 text-sm  text-gray-900 dark:text-white">
                  Available Now.
                  <p>Get Notified.</p>
                </span>
              </div>
              <a
                href="#"
                className="rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center pt-2 text-[14px] text-white h-[37px] w-[130px] "
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
