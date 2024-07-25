// src/components/WishlistButton.tsx

'use client';
import React, { useEffect, useState } from 'react';
import { Button, Tooltip, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { HeartFilledIcon, HeartIcon } from '@/components/icons';
import WishListDropDownComponent from '@/components/wishlist/WishListDropDownComponent';
import { Product } from '@/libs/difinition';
import { useGetAllUserWishListQuery } from '@/redux/service/wishList';
import { useGetProfileQuery } from '@/redux/service/user';
import { WishListItem } from '@/types/wishList';
import DeleteWishListConfirmationModal from '@/components/wishlist/DeleteWishlistConfirmationModal';

type WishlistButtonProps = {
  product: Product;
};

const WishlistButton: React.FC<WishlistButtonProps> = ({ product }) => {
  const {
    isOpen: isAddWishlistOpen,
    onOpen: onAddWishlistOpen,
    onClose: onAddWishlistClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const [wishlistItemUuid, setWishlistItemUuid] = useState<string | null>(null);

  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileQuery();
  const router = useRouter();

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
    if (userProfile && !initialLoading) {
      refetchWishList();
    }
  }, [userProfile, refetchWishList, initialLoading]);

  useEffect(() => {
    if (userProfile && wishListData && wishListData.payload) {
      const foundItem = wishListData.payload.list.find(
        (item: WishListItem) => item.productSlug === product.slug
      );
      setIsInWishlist(!!foundItem);
      setWishlistItemUuid(foundItem ? foundItem.uuid : null);
    }
  }, [userProfile, wishListData, product.slug]);

  const handleWishlistToggle = async () => {
    if (!userProfile) {
      router.push('/login');
      return;
    }

    if (isInWishlist && wishlistItemUuid) {
      onDeleteModalOpen();
    } else {
      onAddWishlistOpen();
    }
  };

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
          onPress={handleWishlistToggle}
        >
          {isInWishlist ? (
            <HeartFilledIcon className="fill-current" size={24} />
          ) : (
            <HeartIcon className="fill-current" size={24} />
          )}
        </Button>
      </Tooltip>

      <WishListDropDownComponent
        isOpen={isAddWishlistOpen}
        onOpenChange={onAddWishlistClose}
        product={product}
        refetchWishList={refetchWishList}
      />

      <DeleteWishListConfirmationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalClose}
        wishlistItemUuid={wishlistItemUuid as string}
        refetchWishList={refetchWishList}
      />
    </>
  );
};

export default WishlistButton;
