'use client';
import React, { useEffect, useState } from 'react';
import { Button, Tooltip, useDisclosure } from '@nextui-org/react';
import { HeartFilledIcon, HeartIcon } from '@/components/icons';
import WishListDropDownComponent from '@/components/WishListDropDownComponent';
import { Product } from '@/libs/difinition';
import { useGetAllUserWishListQuery } from '@/redux/service/wishList';
import { useGetProfileQuery } from '@/redux/service/user';
import { WishListItem } from '@/types/wishList';

type WishlistButtonProps = {
  product: Product;
};

const WishlistButton: React.FC<WishlistButtonProps> = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(1);

  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileQuery();

  // Initial fetch with limited size
  const {
    data: initialWishListData,
    error: initialError,
    isLoading: initialLoading,
  } = useGetAllUserWishListQuery({ page: 1, size: 1 });

  useEffect(() => {
    if (
      initialWishListData &&
      initialWishListData.payload &&
      initialWishListData.payload.pagination
    ) {
      setTotalElements(initialWishListData.payload.pagination.totalElements);
      setPageSize(initialWishListData.payload.pagination.totalElements);
    }
  }, [initialWishListData]);

  // Subsequent fetch with the correct page size
  const {
    data: wishListData,
    error,
    isLoading,
    refetch: refetchWishList,
  } = useGetAllUserWishListQuery({
    page: 1,
    size: pageSize,
  });

  useEffect(() => {
    if (userProfile && wishListData && wishListData.payload) {
      const found = wishListData.payload.list.some(
        (item: WishListItem) => item.productSlug === product.slug
      );
      setIsInWishlist(found);
    }
  }, [userProfile, wishListData, product.slug]);

  return (
    <>
      <Tooltip
        content={
          <p className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            {isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          </p>
        }
        showArrow
      >
        <Button
          isIconOnly
          radius={'full'}
          variant={'light'}
          color={'default'}
          onPress={onOpen}
        >
          {isInWishlist ? (
            <HeartFilledIcon className="fill-current" size={24} />
          ) : (
            <HeartIcon className="fill-current" size={24} />
          )}
        </Button>
      </Tooltip>

      <WishListDropDownComponent
        isOpen={isOpen}
        onOpenChange={onClose}
        product={product}
      />
    </>
  );
};

export default WishlistButton;
