import { Card, CardBody, Image, Link } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

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

export default function ClearanceCardComponent() {
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
            className="w-[353px] shadow-none border border-gray-200"
          >
            <CardBody>
            <Link href="#">
              <Image className="object-cover" src={product.image} />
            </Link>
            <div className="mb-2 mt-2.5 flex items-center">
            <div className="flex items-center rtl:space-x-reverse">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="none"
                      key={index}
                    >
                      <path
                        d="M9.04897 2.92708C9.34897 2.00608 10.652 2.00608 10.951 2.92708L12.021 6.21908C12.0863 6.41957 12.2134 6.59426 12.384 6.71818C12.5547 6.84211 12.7601 6.90892 12.971 6.90908H16.433C17.402 6.90908 17.804 8.14908 17.021 8.71908L14.221 10.7531C14.05 10.8771 13.9227 11.0521 13.8573 11.2529C13.7919 11.4538 13.7918 11.6702 13.857 11.8711L14.927 15.1631C15.227 16.0841 14.172 16.8511 13.387 16.2811L10.587 14.2471C10.4162 14.1231 10.2105 14.0563 9.99947 14.0563C9.78842 14.0563 9.58277 14.1231 9.41197 14.2471L6.61197 16.2811C5.82797 16.8511 4.77397 16.0841 5.07297 15.1631L6.14297 11.8711C6.20815 11.6702 6.20803 11.4538 6.14264 11.2529C6.07725 11.0521 5.94994 10.8771 5.77897 10.7531L2.97997 8.72008C2.19697 8.15008 2.59997 6.91008 3.56797 6.91008H7.02897C7.24002 6.91013 7.44568 6.84342 7.6165 6.71948C7.78732 6.59554 7.91455 6.42073 7.97997 6.22008L9.04997 2.92808L9.04897 2.92708Z"
                        fill="#FACA15"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-[16px] ml-2 text-gray-600 font-medium">
                 (32) Reviews
                </span>
            </div>
            <a href="#">
              <h5 className="text-gray-800 text-xl font-semibold tracking-tight dark:text-white mb-2">
              {product.name.length > 60
                    ? `${product.name.substring(0, 60)}...`
                    : product.name} For Your Need, Starlight Sport 
              </h5>
            </a>
            <div className='mb-2 text-gray-600'>
             <p>
             Trending Short for easy wear which provide
             comfort for you which is really comfortable especially in hot weather.
             </p>
            </div>
            <div>
                <p className=" text-gray-600">
                  Shop : {' '}
                  <span className='font-medium text-gray-900'>
                  {product.shop_name.length > 30
                    ? `${product.shop_name.substring(0, 20)}...`
                    : product.shop_name}
                  </span>
                </p>
                <p className=" text-gray-600 ">
                  Expired date : {' '}
                  <span className="font-medium text-red-500">
                    {formatDate(product.expired_date)}
                  </span>
                </p>
              </div>
            <div className="flex pt-6 items-center justify-between">
            <div className="flex items-center justify-start font-semibold">
                <span className="pt-2 text-lg font-bold text-gray-500 line-through dark:text-white">
                  $3900
                </span>
                <span className="bg-gradient-to-r ml-3 from-pink-500 to-yellow-500 bg-clip-text text-3xl font-bold text-transparent">
                  $3778
                </span>
              </div>
              <a
                href="#"
                className="rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center pt-2 text-[14px] text-white h-[37px] w-[100px] "
              >
                Add To Cart
              </a>
            </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}