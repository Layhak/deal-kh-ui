import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Image,
  Link,
  Tooltip,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Product } from '@/libs/difinition';
import { StarIcon } from '@/components/review/StarIcon';
import NextLink from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  selectIsProductInCart,
} from '@/redux/feature/cart/cartSlice';
import { CartIcon, FilledCartIcon } from '@/components/icons';
import { RootState } from '@/redux/store';
import WishlistButton from '@/components/seller/component/WishlistButton';
import { useGetProfileQuery } from '@/redux/service/user';

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
  const router = useRouter();
  const isInCart = useSelector((state: RootState) =>
    selectIsProductInCart(state, product.slug)
  );
  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileQuery();

  const handleCartToggle = () => {
    if (!userProfile) {
      router.push('/login');
      return;
    }
    if (isInCart) {
      dispatch(removeFromCart(product.slug));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <>
      <Card
        isPressable
        className={`${
          ['clearance-sales'].includes(discountType)
            ? 'h-[560px] sm:h-[535px]'
            : ['buy-more-get-more'].includes(discountType)
              ? 'h-[420px] sm:h-[380px]'
              : 'h-[420px] sm:h-[415px]'
        }   rounded-xl bg-foreground-50 ring-1 ring-foreground-200`}
      >
        <CardBody className="relative overflow-hidden  rounded-b-lg">
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
          <div className={'flex h-full flex-col flex-wrap justify-between'}>
            <div className="mt-4 h-[16] w-full">
              <div className={'flex flex-wrap'}>
                {!['buy-more-get-more'].includes(discountType) && (
                  <RatingStar
                    ratingAvg={product.ratingAvg}
                    ratingCount={product.ratingCount}
                  />
                )}
              </div>
              <NextLink href={`/products/${product.slug}`}>
                <h5
                  className={`mt-1 line-clamp-2  ${
                    ['clearance-sales'].includes(discountType)
                      ? 'text-md md:text-2xl'
                      : 'text-md md:text-xl'
                  }  overflow-hidden font-bold text-foreground-700 `}
                >
                  {product.name || 'Product Name'}
                </h5>
              </NextLink>
            </div>

            <div className="flex  flex-col items-start justify-between">
              <div
                className={`py-1 ${
                  ['buy-more-get-more'].includes(discountType)
                    ? 'space-y-2 sm:py-2'
                    : 'space-y-3 sm:py-3'
                }`}
              >
                <p className="text-xs font-medium text-foreground-600 md:text-sm">
                  Shop :{' '}
                  <Link
                    href={`/shop/${product.shopSlug}`}
                    className={' overflow-hidden '}
                  >
                    <span className="line-clamp-1 text-sm font-medium text-blue-500">
                      {product.shop || 'Shop Name'}
                    </span>
                  </Link>
                </p>
                <p className="text-sm font-medium text-foreground-600">
                  Expired date :{' '}
                  <span className="font-medium text-red-500">
                    {product.expiredAt}
                  </span>
                </p>
              </div>
              <div
                className={
                  'flex w-full  flex-row  items-center justify-between '
                }
              >
                <div className={'flex items-center justify-center gap-2'}>
                  {['no-discount'].includes(discountType) ? (
                    <>
                      <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent">
                        ${product.price || '0'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="pt-1 text-lg  font-bold text-foreground-400 line-through ">
                        ${product.price || '0'}
                      </span>
                      <span className=" bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-xl font-bold text-transparent ">
                        $
                        {(product.price - product.discountPrice).toFixed(2) ||
                          '0'}
                      </span>
                    </>
                  )}
                </div>
                <div
                  className={
                    'flex items-start justify-start gap-1 sm:items-center sm:justify-center '
                  }
                >
                  <Tooltip
                    content={
                      <p className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                        {isInCart ? 'Remove from cart' : 'Add to cart'}
                      </p>
                    }
                    showArrow
                  >
                    <Button
                      isIconOnly
                      variant={'light'}
                      color={'default'}
                      radius={'full'}
                      onPress={handleCartToggle}
                    >
                      {['clearance-sales'].includes(product.discountType) ? (
                        isInCart ? (
                          <FilledCartIcon className="fill-current" size={32} />
                        ) : (
                          <CartIcon className="fill-current" size={32} />
                        )
                      ) : isInCart ? (
                        <FilledCartIcon className="fill-current" size={24} />
                      ) : (
                        <CartIcon className="fill-current" size={24} />
                      )}
                    </Button>
                  </Tooltip>

                  <WishlistButton product={product} />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

const RatingStar = ({
  ratingAvg,
  ratingCount,
}: {
  ratingAvg: number;
  ratingCount: number;
}) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (ratingAvg >= index + 1) {
      return <StarIcon key={index} filled className=" h-4 w-4 text-warning" />;
    } else if (ratingAvg >= index + 0.1) {
      return <StarIcon key={index} half className=" h-4  w-4 text-warning" />;
    } else {
      return <StarIcon key={index} className="h-4 w-4 text-warning" />;
    }
  });
  return (
    <>
      {stars}
      <span className="ml-1  text-small font-medium text-foreground-600">
        ({ratingCount}) Reviews
      </span>
    </>
  );
};
