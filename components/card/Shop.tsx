import { Card, CardBody, Image, Link } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

// Fake product data API URL
const API_URL = 'https://6668f7e12e964a6dfed36875.mockapi.io/api/v1/products';

type Product = {
  id: number;
  name: string;
  image: string;
  shop_name: string;
  expired_date: any;
  original_price: number;
  discount_price: number;
  discount: number;
};

export default function ShopCardComponent() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data from the fake API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 3)))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div>
      

      <div className="flex flex-wrap justify-between gap-[25px] ">
        {products.map((product) => (
          <Card
            key={product.id}
            isPressable
            onPress={() => console.log('item pressed')}
            className="w-[370px] shadow-none border border-gray-200"
          >
            <CardBody>
            <a href="#">
              <h5 className="text-gray-800 text-xl w-[] font-semibold tracking-tight dark:text-white mb-2 h-[52px]">
              {product.shop_name.length > 50
                    ? `${product.shop_name.substring(0, 20)}...`
                    : product.shop_name} blas bluer
              </h5>
            </a>
            <Link href="#">
              <Image className="object-cover" src={product.image} />
            </Link>
            <div className="mb-2 mt-2.5 flex items-center">
            </div>
            <div className='mb-2 text-gray-600'>
             <p>
             Trending Short for easy wear which provide
             comfort for you which is really comfortable especially in hot weather.
             </p>
            </div>
            <div>
                <p className=" text-gray-600">
                 Category : {' '}
                  <span className='font-medium text-gray-900'>
                  {product.shop_name.length > 30
                    ? `${product.shop_name.substring(0, 20)}...`
                    : product.shop_name}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                    Open :{' '}
                    <span className="text-sm font-medium text-gray-900">
                      09:00 AM - 08:00 PM
                    </span>
                  </p>
              </div>
            <div className="flex pt-5 items-center justify-between">
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
