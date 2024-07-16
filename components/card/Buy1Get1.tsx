'use client';

import { Card, CardBody, Image, Link } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { productApi, useGetProductsQuery } from '@/redux/service/product';
import { CartProductType, WishListResponse } from '@/libs/difinition';
import {
  addToWishList,
  removeFromWishList,
} from '@/redux/feature/wishList/wishListSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { selectWishlistProducts } from '@/redux/feature/wishList/wishListSlice';
import WishListDropDownComponent from '../WishListPopUpComponent';
import {
  useDeleteWishListMutation,
  useGetAllWishListQuery,
} from '@/redux/service/wishList';
import { useRouter } from 'next/navigation';

const Buy1Get1Component = ({ category, discountType }: any) => {
  const dispatch = useAppDispatch();
  const wishlistProducts = useAppSelector(selectWishlistProducts);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // for pop up whishlist
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<CartProductType | null>(
    null
  );
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();

  const [deleteWishlist] = useDeleteWishListMutation();
  const {
    data: wishlists = [],
    isLoading,
    error,
    refetch,
  } = useGetAllWishListQuery();

  const handleSubmit = () => {
    setHeartStates((prevHeartStates) => ({
      ...prevHeartStates,
      [currentProduct?.slug!]: true,
    }));

    dispatch(addToWishList(currentProduct!));
    localStorage.setItem('heartStates', JSON.stringify(heartStates));

    setIsPopupOpen(false);
  };

  const handleClose = () => {
    setHeartStates((prevHeartStates) => ({
      ...prevHeartStates,
      [currentProduct?.slug!]: false, // Set the heart state to true
    }));
    setIsPopupOpen(false);
  };

  const { data } = useGetProductsQuery({
    page: 1,
    size: 6,
    filters: {
      categorySlug: category,
      discountType: discountType,
    },
  });

  // Initialize the heart state for each product
  const [heartStates, setHeartStates] = useState<Record<string, boolean>>({});

  // Load heart state from local storage on mount
  useEffect(() => {
    const savedHeartStates = localStorage.getItem('heartStates');
    if (savedHeartStates) {
      setHeartStates(JSON.parse(savedHeartStates));
    }
  }, []);

  const handleAddToWishlist = (product: CartProductType) => {
    // if (!isLoggedIn) {
    //   router.push('/login');
    //   return;
    // }
    setIsPopupOpen(true);
    setCurrentProduct(product);
    console.log('Login successfully');
  };

  const handleRemoveFromWishlist = (product: CartProductType) => {
    setHeartStates((prevHeartStates) => {
      const updatedHeartStates = {
        ...prevHeartStates,
        [product.slug]: false, // Set the heart state to false
      };

      dispatch(removeFromWishList(product.slug));
      localStorage.setItem('heartStates', JSON.stringify(updatedHeartStates));
      return updatedHeartStates;
    });

    handleDeleteWishlist(product.slug);

    setIsPopupOpen(false);
    setCurrentProduct(product);
  };

  // handle delete wishlist
  const handleDeleteWishlist = async (productSlug: string) => {
    try {
      // Check if there's any loading or error condition
      if (isLoading) {
        console.log('Loading wishlists...');
        return;
      }

      if (error) {
        console.error('Error fetching wishlists:', error);
        return;
      }

      // Find the wishlist item with matching productSlug
      const wishlistToDelete = wishlists.payload.list.find(
        (wishlist: WishListResponse) => wishlist.productSlug === productSlug
      );

      if (!wishlistToDelete) {
        console.log('Wishlist item not found for slug:', productSlug);
        return;
      }

      // Extract UUID from the wishlist item
      const { uuid } = wishlistToDelete;
      console.log('uuid of the wishlist: ', uuid);

      // Perform deletion (assuming deleteWishlist function is correctly implemented)
      await deleteWishlist({ uuid }).unwrap();

      console.log('Wishlist deleted successfully:', productSlug);
      refetch();
    } catch (error) {
      console.error('Error deleting wishlist:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[25px]">
        {data?.payload.list.map((product: CartProductType) => (
          <div key={product.slug}>
            <Card
              isPressable
              className="relative mb-2 h-[330px] w-[250px] flex-none rounded-xl  bg-foreground-50 shadow-none  dark:border-foreground-700"
            >
              <CardBody className="relative h-[230px] overflow-visible rounded-b-lg px-4">
                <Link href={`products/${product.slug}`}>
                  <Image
                    isZoomed
                    className="h-[160px] w-[224px] object-cover"
                    src={
                      product.images[0].url ||
                      'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                    }
                    alt={product.name}
                  />
                </Link>
                <span className="absolute right-4 top-3 z-20 h-[54px] w-[54px] rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 pt-2 text-center text-[14px] font-medium text-white">
                  BUY 1 GET 1
                </span>
                <div className="flex flex-wrap justify-between">
                  <Link href="#">
                    <h5 className="mt-3 h-[45px] w-[160px] text-[18px] font-semibold tracking-tight text-foreground-800 dark:text-white">
                      {product.name.length > 30
                        ? `${product.name.substring(0, 25)}...`
                        : product.name || 'Product Name'}
                    </h5>
                  </Link>
                  <div className="right-4 mt-3 cursor-pointer">
                    <div key={product.slug}>
                      {heartStates[product.slug] ? (
                        <FaHeart
                          className="h-[25px] w-[25px] text-[#eb7d52]"
                          onClick={() => handleRemoveFromWishlist(product)}
                        />
                      ) : (
                        <FaRegHeart
                          className="h-[25px] w-[25px] text-[#eb7d52]"
                          onClick={() => handleAddToWishlist(product)}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className=" h-[30px] pt-3">
                  <p className="text-[14px] font-medium text-foreground-600 ">
                    Shop :{' '}
                    <Link href="">
                      <span className="text-info-800 text-[14px] font-medium">
                        {product.shop.length > 20
                          ? `${product.shop.substring(0, 20)}...`
                          : product.shop || 'Shop Name'}
                      </span>
                    </Link>
                  </p>
                  <p className="text-[14px] font-medium text-foreground-600 ">
                    Expired date :{' '}
                    <span className="font-medium text-red-500">
                      {product.expiredAt || 'Expired Date'}
                    </span>
                  </p>
                </div>
                <span className="bg-gradient-to-l from-pink-500 from-70% to-yellow-500 to-100% bg-clip-text pt-8 text-2xl font-bold text-transparent">
                  ${product.price || 'Price'}
                </span>
              </CardBody>
            </Card>

            {isPopupOpen && currentProduct && (
              <WishListDropDownComponent
                productSlug={currentProduct.slug}
                onClose={handleClose}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy1Get1Component;
