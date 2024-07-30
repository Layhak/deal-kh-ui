'use client';
import React from 'react';
import { Button, cn, Image, Link, Skeleton, Tooltip } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

export type PlaceItem = {
  name: string;
  shopType: string;
  phoneNumber: string;
  shopSlug: string;
  rating: number;
  location: string;
  address: string;
  imageSrc: string;
  openAt: string;
  closeAt: string;
};

export type PlaceListItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'slug'
> & {
  isPopular?: boolean;
  isLoading?: boolean;
  removeWrapper?: boolean;
} & PlaceItem;
const handleGetDirections = (location: string) => {
  if (!location || !location.includes(',')) {
    console.error('Invalid location format');
    return;
  }
  const [lat, lng] = location.split(',');
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  window.open(url, '_blank');
};

const ShopList = React.forwardRef<HTMLDivElement, PlaceListItemProps>(
  (
    {
      name,
      phoneNumber,
      rating,
      isLoading,
      location,
      shopType,
      shopSlug,
      imageSrc,
      address,
      removeWrapper,
      openAt,
      closeAt,
      className,
      ...props
    },
    ref
  ) => {
    const router = useRouter();
    const [isLiked, setIsLiked] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex w-full flex-none flex-col gap-3',
          {
            'rounded-none bg-background shadow-none': removeWrapper,
          },
          className
        )}
        {...props}
      >
        <Tooltip
          showArrow
          content={
            <p className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Shop Location
            </p>
          }
        >
          <Button
            isIconOnly
            className="group absolute right-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
            radius="full"
            variant="flat"
            onPress={() => handleGetDirections(location)}
          >
            <Icon
              className={cn('text-default-900/50 group-hover:text-warning-500')}
              // icon="solar:shop-linear"
              icon="carbon:location"
              width={24}
            />
          </Button>
        </Tooltip>
        <Image
          isBlurred
          onClick={() => router.push(`/shop/${shopSlug}`)}
          isZoomed
          alt={name}
          width={400}
          // height={400}
          className="aspect-square h-[250px] w-full cursor-pointer bg-foreground-900 hover:scale-110"
          isLoading={isLoading}
          src={imageSrc}
        />

        <div className="mt-1 flex flex-col gap-2 px-1">
          {isLoading ? (
            <div className="my-1 flex flex-col gap-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="mt-3 w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="mt-4 w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-1">
                <h1 className="justify-center-center inline-flex items-center gap-1 text-lg font-medium capitalize text-default-700">
                  <Icon
                    icon={'bi:shop'}
                    width={16}
                    className={'text-default-500'}
                  />
                  <span className={'line-clamp-1'}>{name}</span>
                </h1>
                {rating !== undefined ? (
                  <div className="flex items-center gap-1">
                    <Icon
                      className="text-default-500"
                      icon="solar:star-bold"
                      width={16}
                    />
                    <span className="text-small text-default-500">
                      {rating}
                    </span>
                  </div>
                ) : null}
              </div>
              <p className="text-small font-medium text-default-500">
                Shop Type : {shopType}
              </p>
              {/*<p className="line-clamp-3 h-[80px] text-small text-default-500">*/}
              {/*  {description}*/}
              {/*</p>*/}
              <p className="text-small font-medium text-default-500">
                Phone Number :
                <Link
                  href={'callto:' + phoneNumber}
                  className={'cursor-pointer text-sm text-default-400'}
                >
                  {phoneNumber}
                </Link>
              </p>
              <p className=" mb-5 line-clamp-1 text-small font-medium text-default-500">
                Open At :
                <span className="cursor-pointer text-sm text-default-400">
                  {openAt}
                </span>
              </p>
              <p className=" mb-5 line-clamp-1 text-small font-medium text-default-500">
                Close At :
                <span className="cursor-pointer text-sm text-default-400">
                  {closeAt}
                </span>
              </p>
              <p className=" mb-5 line-clamp-1  text-small font-medium text-default-500">
                Address :
                <span
                  className={'cursor-pointer text-sm text-default-400'}
                  onClick={() => handleGetDirections(location)}
                >
                  {address}
                </span>
              </p>
              <Button
                className={
                  'bg-gradient-to-r from-pink-500 to-yellow-500 text-center text-[14px] text-gray-50'
                }
                onPress={() => router.push(`/shop/${shopSlug}`)}
                //go to shop profile
              >
                Check Us Out
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
);

ShopList.displayName = 'ShopList';

export default ShopList;
