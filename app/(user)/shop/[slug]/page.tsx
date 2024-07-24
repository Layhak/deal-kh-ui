'use client';
import ShopProfileComponent from '@/components/shop-profile/ShopProfileComponent';
import React from 'react';
import { useGetShopBySlugQuery } from '@/redux/service/shop';
import Loading from '@/app/(user)/loading';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { StarIcon } from '@/components/review/StarIcon';
import { Product } from '@/libs/difinition';
import { useGetProductsByShopQuery } from '@/redux/service/product';

type Props = {
  params: {
    slug: string;
  };
};

const ShopProfile = ({ params }: Props) => {
  const slug = params.slug;
  // console.log('slug', slug);
  const {
    data: shop,
    isLoading: shopLoading,
    error: shopError,
  } = useGetShopBySlugQuery(slug);
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsByShopQuery(slug);

  if (shopLoading || productsLoading) {
    return <Loading />;
  }

  if (productsError) {
    return <p>Error fetching products</p>;
  }

  return (
    <div>
      {/* for shop profile */}
      <ShopProfileComponent shopProfile={shop.payload} />
      {/* for shop product */}

      <div className="mx-2 my-2 flex h-[40px] items-center justify-between md:my-8 md:h-[50px] lg:mx-0 lg:my-8 lg:h-[50px]">
        <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
          All{' '}
          <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            Products
          </span>
        </p>
      </div>

      {/* card section */}
      <div className="flex flex-wrap justify-center gap-2 lg:gap-[25px]">
        {products.payload.list.map((product: Product) => {
          return (
            <Card
              key={product.slug}
              className="relative mb-0 h-[300px] w-[195px] flex-none rounded-xl text-gray-50 shadow-none md:h-[395px] md:w-[245px]  lg:mb-2  lg:h-[410px] lg:w-[289px]"
            >
              <CardBody className="relative h-[260px] overflow-visible rounded-b-lg px-4">
                <Link href={`/products/${product.slug}`}>
                  <Image
                    className="h-[140px] w-[284px] object-cover md:h-[193px] lg:h-[193px]"
                    isZoomed
                    src={
                      product.images[0]?.url ||
                      'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                    }
                    alt={product.name}
                  />
                </Link>

                <span className="absolute right-0 top-0 z-10 h-[54px] w-[54px] rounded-bl-xl rounded-tr-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-center text-[14px] font-semibold text-white">
                  {`${product.discountValue}${product.isPercentage ? '%' : '$'} OFF`}
                </span>

                <div className="mt-2 h-[16] w-full lg:mt-4">
                  <div className={'flex items-center justify-between'}>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, index) => {
                        if (product.ratingAvg >= index + 1) {
                          return (
                            <StarIcon
                              key={index}
                              filled
                              className="h-3 w-3 text-yellow-300 md:h-4 md:w-4 lg:h-4 lg:w-4"
                            />
                          );
                        } else if (product.ratingAvg >= index + 0.5) {
                          return (
                            <StarIcon
                              key={index}
                              half
                              className="h-3 w-3 text-yellow-300 md:h-4 md:w-4 lg:h-4 lg:w-4"
                            />
                          );
                        } else {
                          return (
                            <StarIcon
                              key={index}
                              className="h-3 w-3 text-yellow-300 md:h-4 md:w-4 lg:h-4 lg:w-4"
                            />
                          );
                        }
                      })}
                      <span className="ml-2 text-[12px] font-medium text-foreground-600 md:text-[14px] lg:text-[18px] ">
                        ({Math.round(product.ratingAvg * 10) / 10}) Reviews
                      </span>
                    </div>
                  </div>
                </div>
                <Link>
                  <h5 className="mt-1 line-clamp-1 h-[18px]  text-[14px] font-semibold tracking-tight text-foreground-800 md:line-clamp-2  md:h-[45px] md:text-[18px] lg:line-clamp-3 lg:h-[45px] lg:text-[18px]">
                    {product.name.length > 60
                      ? `${product.name.substring(0, 25)}...`
                      : product.name || 'Product Name'}
                  </h5>
                </Link>
                <div className="h-[30px] pt-2">
                  <p className="text-[12px] font-medium text-foreground-600 md:text-[14px] lg:text-[18px]">
                    Shop :{' '}
                    <Link href={`/shop/${product.shopSlug}`}>
                      <span className="line-clamp-1 cursor-pointer text-[14px] font-medium text-blue-800 lg:line-clamp-2">
                        {product.shop.length >
                        (window.innerWidth >= 768 ? 30 : 15)
                          ? `${product.shop.substring(0, window.innerWidth >= 768 ? 30 : 15)}...`
                          : product.shop || 'Shop Name'}
                      </span>
                    </Link>
                  </p>
                  <p className="text-[12px] font-medium text-foreground-600 md:text-[14px] lg:text-[18px]">
                    Expired date :{' '}
                    <span className="font-medium text-red-500">
                      {product.expiredAt}
                    </span>
                  </p>
                </div>
                <div className="flex h-[30px] items-center justify-start pt-10 font-semibold lg:my-4">
                  <span className="pt-1 text-[14px] font-bold text-foreground-500 line-through dark:text-white md:text-xl lg:text-xl">
                    ${product.price || 'Price'}
                  </span>
                  <span className="md:2xl  ml-4 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-[18px] font-bold text-transparent lg:text-2xl">
                    ${(product.price - product.discountPrice).toFixed(2) || '0'}
                  </span>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ShopProfile;
