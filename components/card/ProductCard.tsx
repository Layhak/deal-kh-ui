import { Card, CardBody, Image, Link, Tooltip } from '@nextui-org/react';
import React from 'react';
import { Product } from '@/libs/difinition';
import { StarIcon } from '@/components/review/StarIcon';
import NextLink from 'next/link';
import { Button } from '@nextui-org/button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/feature/cart/cartSlice';
import { CartIcon, HeartIcon } from '@/components/icons';

type ProductDiscountType =
  | 'no-discount'
  | 'discount-off'
  | 'shop-coupons'
  | 'event'
  | 'buy-one-get-one'
  | 'buy-more-get-more'
  | 'clearance-sales'
  | 'flash-sales'
  | 'top-sales';
type ProductCardProps = {
  product: Product;
  discountType?: ProductDiscountType | string;
};
export default function ProductCard({
  product,
  discountType = 'no-discount',
}: ProductCardProps) {
  const dispatch = useDispatch();
  return (
    <>
      <Card
        isPressable
        className={`${
          ['clearance-sales'].includes(discountType)
            ? 'h-[560px] sm:h-[530px]'
            : ['buy-more-get-more'].includes(discountType)
              ? 'h-[420px] sm:h-[400px]'
              : 'h-[420px] sm:h-[410px]'
        }
        } rounded-xl  bg-foreground-50  ring-1 ring-foreground-200  `}
      >
        <CardBody className="relative  rounded-b-lg ">
          <Link href={`/products/${product.slug}`}>
            <Image
              width={500}
              className={`${
                ['clearance-sales'].includes(discountType)
                  ? 'h-[300px] max-h-[300px] object-cover object-center'
                  : 'h-[180px] max-h-[180px] object-cover object-center'
              }`}
              src={
                product.images[0].url ||
                'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
              }
              alt={'product name'}
            />
          </Link>
          {!['clearance-sales', 'no-discount'].includes(discountType) && (
            <span className="absolute right-0 top-0 z-10 h-[54px] w-[54px] rounded-bl-xl rounded-tr-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-center text-sm font-semibold text-white">
              {(() => {
                switch (discountType) {
                  case 'discount-off':
                  case 'shop-coupons':
                  case 'event':
                    return `${product.discountValue}${
                      product.isPercentage ? '%' : '$'
                    } OFF`;
                  case 'buy-one-get-one':
                  case 'buy-more-get-more':
                    return 'Buy 1 Get 1';
                  case 'clearance-sales':
                    return 'Clearance Sales';
                  case 'flash-sales':
                    return 'Flash Sales';
                  case 'top-sales':
                    return 'Top Sales';
                  default:
                    return 'Discount Off';
                }
              })()}
            </span>
          )}
          <div className="mt-4 h-[16] w-full">
            <div className={'flex items-center justify-between'}>
              <div className="flex">
                {!['buy-more-get-more'].includes(discountType) && (
                  <RatingStar ratingAvg={product.ratingAvg} />
                )}
              </div>
            </div>
          </div>
          <NextLink href={`/products/${product.slug}`}>
            <h5
              className={`mt-1 line-clamp-2  h-[45px] sm:h-[54px] ${
                ['clearance-sales'].includes(discountType)
                  ? 'text-md md:text-2xl '
                  : 'text-md md:text-xl'
              }  overflow-hidden font-bold text-foreground-700`}
            >
              {product.name || 'Product Name'}
            </h5>
          </NextLink>
          <div className="flex h-[30px] flex-col items-start justify-between">
            <div className=" py-1 sm:py-3">
              <p className="text-xs font-medium text-foreground-600 md:text-sm">
                Shop :{' '}
                <Link
                  href={`/shop/${product.shop}`}
                  className={'w-full overflow-hidden sm:w-fit'}
                >
                  <span className="line-clamp-1 text-xs font-medium text-blue-500 md:text-sm">
                    {product.shop || 'Shop Name'}
                  </span>
                </Link>
              </p>
              <p className="text-xs font-medium text-foreground-600 md:text-sm">
                Expired date :{' '}
                <span className="font-medium text-red-500">
                  {product.expiredAt}
                </span>
              </p>
            </div>
            <div className="flex h-[30px] w-full items-center justify-start pt-10 font-semibold">
              {['no-discount'].includes(discountType) ? (
                <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-xl font-bold text-transparent">
                  ${product.price - product.discountPrice || '0'}
                </span>
              ) : (
                <div
                  className={
                    'flex w-full flex-col items-start justify-start sm:flex-row md:items-center md:justify-between '
                  }
                >
                  <div>
                    <span className="pt-1 text-lg font-bold text-foreground-400 line-through dark:text-white">
                      ${product.price || '0'}
                    </span>
                    <span className="ml-4 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent">
                      ${product.price - product.discountPrice || '0'}
                    </span>
                  </div>
                  <div
                    className={
                      'flex items-start justify-start gap-1 sm:items-center sm:justify-center '
                    }
                  >
                    <Tooltip
                      content={
                        <p className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                          Add to cart
                        </p>
                      }
                      showArrow
                    >
                      <Button
                        isIconOnly
                        variant={'light'}
                        color={'default'}
                        radius={'full'}
                        onPress={() =>
                          dispatch(
                            addToCart({
                              discountTypeSlug: product.discountTypeSlug,
                              closeAt: product.closeAt,
                              isPercentage: product.isPercentage,
                              ratingCount: product.ratingCount,
                              openAt: product.openAt,
                              seller: product.seller,
                              slug: product.slug,
                              name: product.name,
                              price: product.price,
                              discountPrice: product.discountPrice,
                              ratingAvg: product.ratingAvg,
                              description: product.description,
                              images: product.images,
                              shop: product.shop,
                              discountValue: product.discountValue,
                              discountType: product.discountType,
                              expiredAt: product.expiredAt,
                              category: product.category,
                              createdAt: product.createdAt,
                              updatedAt: product.updatedAt,
                              createdBy: product.createdBy,
                              updatedBy: product.updatedBy,
                              address: product.address,
                              quantity: product.quantity,
                              location: product.location,
                            })
                          )
                        }
                      >
                        {['clearance-sales'].includes(discountType) ? (
                          <CartIcon className="fill-current" size={32} />
                        ) : (
                          <CartIcon className="fill-current" size={24} />
                        )}
                      </Button>
                    </Tooltip>
                    <Tooltip
                      content={
                        <p className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                          Add to wishlist
                        </p>
                      }
                      showArrow
                    >
                      <Button
                        isIconOnly
                        radius={'full'}
                        variant={'light'}
                        color={'default'}
                      >
                        {['clearance-sales'].includes(discountType) ? (
                          <HeartIcon className="fill-current" size={32} />
                        ) : (
                          <HeartIcon className="fill-current" size={24} />
                        )}
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
const RatingStar = ({ ratingAvg }: { ratingAvg: number }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (ratingAvg >= index + 1) {
      return (
        <StarIcon
          key={index}
          filled
          className="h-2 w-2 text-warning md:h-4 md:w-4"
        />
      );
    } else if (ratingAvg >= index + 0.1) {
      return (
        <StarIcon
          key={index}
          half
          className="h-2 w-2 text-warning md:h-4 md:w-4"
        />
      );
    } else {
      return (
        <StarIcon key={index} className="h-2 w-2 text-warning md:h-4 md:w-4" />
      );
    }
  });
  return (
    <>
      {stars}
      <span className="ml-1 text-[9px] font-medium text-foreground-600 md:text-small">
        ({Math.round(ratingAvg * 10) / 10}) Reviews
      </span>
    </>
  );
};
