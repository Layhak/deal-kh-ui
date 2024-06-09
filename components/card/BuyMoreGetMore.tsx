import { Card, CardBody, Image, Link } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';

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

export default function BuyMoreGetMoreComponent() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data from the fake API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 8)))
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
      <div className="flex flex-wrap justify-between gap-[25px]">
        {products.map((product) => (
          <Card
            key={product.id}
            isPressable
            onPress={() => console.log('item pressed')}
            className="relative h-[330px] w-[250px] mb-2 flex-none rounded-xl border shadow-none border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <CardBody className="relative h-[230px] overflow-visible rounded-b-lg px-4">
            <Link href="#">
                <Image
                  className="h-[160px] w-[224px] object-cover"
                  src={product.image}
                />
            </Link>
            <span className='absolute right-4 top-3 z-20 h-[54px] w-[54px] rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-center text-[14px] font-medium text-white'>
            BUY 1 GET 1
            </span>
              <div className='flex flex-wrap justify-between'>
              <Link href="#">
                <h5 className="font-semibold mt-1.5 text-[18px] tracking-tight text-gray-800 dark:text-white h-[45px] w-[160px]">
                  {product.name.length > 60
                    ? `${product.name.substring(0, 60)}...`
                    : product.name} 
                </h5>
              </Link>
              <a href="" className='mt-2 right-3'>
              <FaRegHeart className='w-[30px] h-[30px] text-[#eb7d52]' />
              </a>
              </div>
              <div className=" pt-3 h-[30px]">
                <p className="font-medium text-[14px] text-gray-600 ">
                  Shop :{' '}
                  {product.shop_name.length > 20
                    ? `${product.shop_name.substring(0, 20)}...`
                    : product.shop_name}
                </p>
                <p className="font-medium text-[14px] text-gray-600 ">
                  Expired date : {' '}
                  <span className="font-medium text-red-500">
                    {formatDate(product.expired_date)}
                  </span>
                </p>
              </div>
                <span className="bg-gradient-to-r pt-8 from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent">
                  ${product.discount_price}
                </span>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
