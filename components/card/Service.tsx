import { Card, CardBody, Image, Link } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { LuShoppingCart } from 'react-icons/lu';

// Fake product data API URL
const API_URL = 'https://665d3148e88051d60405a47d.mockapi.io/api/v1/products';

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

export default function ServiceCardComponent() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data from the fake API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 4)))
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
      <div className="flex flex-wrap justify-between gap-[38px] ">
        {products.map((product) => (
          <Card
            key={product.id}
            isPressable
            onPress={() => console.log('item pressed')}
            className="w-[595px] border border-gray-200 shadow-none"
          >
            <div className="flex">
              <div className="flex-1">
                <Link href="#">
                  <Image
                    className="ml-2 mt-2 h-[250px] w-[274px] object-cover"
                    src={product.image}
                  />
                </Link>
              </div>
              <div className="item-start mx-2 flex-1 text-left">
                <a href="#">
                  <h5 className="mt-2 text-lg font-semibold tracking-tight text-gray-800 dark:text-white">
                    {product.name.length > 60
                      ? `${product.name.substring(0, 60)}...`
                      : product.name}{' '}
                    For Your Need, Starlight Sport
                  </h5>
                </a>
                <div className="my-2 text-sm text-gray-600">
                  <p>
                    Trending Short for easy wear which provide comfort for you
                    which is really comfortable especially in hot weather.
                  </p>
                </div>
                <div>
                  <p className=" mb-1 text-sm text-gray-600">
                    Shop :{' '}
                    <span className="text-sm font-medium text-gray-900">
                      {product.shop_name.length > 30
                        ? `${product.shop_name.substring(0, 20)}...`
                        : product.shop_name}
                    </span>
                  </p>
                  <p className="mb-1 text-sm text-gray-600">
                    Expired date :{' '}
                    <span className="text-sm font-medium text-red-500">
                      {formatDate(product.expired_date)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Open :{' '}
                    <span className="text-sm font-medium text-gray-900">
                      09:00 AM - 08:00 PM
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center justify-start">
                    <span className="pt-2 text-base text-gray-500 dark:text-white">
                      From
                    </span>
                    <span className="ml-3 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-3xl font-semibold text-transparent">
                      $ 3.5
                    </span>
                  </div>
                  <div className="flex justify-end gap-[15px]">
                    <a href="#">
                      <FaRegHeart className="h-[30px] w-[30px] text-[#eb7d52]" />
                    </a>
                    <a href="">
                      <LuShoppingCart className="h-[30px] w-[30px] text-[#eb7d52]" />
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
