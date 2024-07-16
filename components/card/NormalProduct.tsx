'use client';

import { CartProductType, WishListResponse } from '@/libs/difinition';
import { useGetProductsQuery } from '@/redux/service/product';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LuShoppingCart } from 'react-icons/lu';
import { addToCart, removeFromCart } from '@/redux/feature/cart/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import WishListDropDownComponent from '../WishListPopUpComponent';
import {
  addToWishList,
  removeFromWishList,
} from '@/redux/feature/wishList/wishListSlice';
import { MdOutlineShoppingCart, MdShoppingCart } from 'react-icons/md';
import {
  useDeleteWishListMutation,
  useGetAllWishListQuery,
} from '@/redux/service/wishList';

export default function NormalProductComponent({
  category,
  discountType,
}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [heartStates, setHeartStates] = useState<Record<string, boolean>>({});
  const [cartStates, setCartStates] = useState<Record<string, boolean>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deleteWishlist] = useDeleteWishListMutation();
  const [currentProduct, setCurrentProduct] = useState<CartProductType | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { data: wishlists = [], refetch } = useGetAllWishListQuery();
  const { data, isLoading, error } = useGetProductsQuery({
    page: 1,
    size: 8,
    filters: {
      categorySlug: category,
      discountType: discountType,
    },
  });

  // load saved states from local storage when the component mounts.
  useEffect(() => {
    const savedHeartStates = localStorage.getItem('heartStates');
    if (savedHeartStates) {
      setHeartStates(JSON.parse(savedHeartStates));
    }

    const savedCartStates = localStorage.getItem('cartStates');
    if (savedCartStates) {
      setCartStates(JSON.parse(savedCartStates));
    }
  }, []);

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

  // handle add to wishlist
  const handleAddToWishlist = (product: CartProductType) => {
    // if (!isLoggedIn) {
    //   router.push('/login');
    //   return;
    // }

    setIsPopupOpen(true);
    setCurrentProduct(product);
  };

  // handle remove from wishlist
  const handleRemoveFromWishlist = (product: CartProductType) => {
    const updatedHeartStates = {
      ...heartStates,
      [product.slug]: false, // Set heart state to false (removed from wishlist)
    };

    dispatch(removeFromWishList(product.slug)); // Dispatch removeFromWishList action
    localStorage.setItem('heartStates', JSON.stringify(updatedHeartStates)); // Update local storage
    setHeartStates(updatedHeartStates);

    handleDeleteWishlist(product.slug);

    setIsPopupOpen(false);
    setCurrentProduct(product);
  };

  // handle add to cart
  const handleAddToCart = (product: CartProductType) => {
    // if (!isLoggedIn) {
    //   router.push('/login');
    //   return;
    // }
    const updatedCartStates = {
      ...cartStates,
      [product.slug]: true, // Set cart state to true (added to cart)
    };

    dispatch(addToCart(product)); // Dispatch addToCart action
    localStorage.setItem('cartStates', JSON.stringify(updatedCartStates)); // Update local storage
    setCartStates(updatedCartStates); // Update state
  };

  // handle remove from cart
  const handleRemoveFromCart = (product: CartProductType) => {
    const updatedCartStates = {
      ...cartStates,
      [product.slug]: false, // Set cart state to false (removed from cart)
    };

    dispatch(removeFromCart(product.slug)); // Dispatch removeFromCart action
    localStorage.setItem('cartStates', JSON.stringify(updatedCartStates)); // Update local storage
    setCartStates(updatedCartStates); // Update state
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
          <div>
            <Card
              key={product.slug}
              className="relative mb-2 h-[395px] w-[284px] flex-none rounded-xl  bg-foreground-50  shadow-none  dark:border-foreground-700"
            >
              <CardBody className="relative h-[260px] overflow-visible rounded-b-lg px-4">
                <Link href="#">
                  <Image
                    onClick={() => router.push(`/${product.slug}`)}
                    className="h-[193px] w-[284px] object-cover"
                    src={
                      product.images[0].url ||
                      'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                    }
                    alt={product.name}
                  />
                </Link>
                <div className="mt-2 flex h-[20px]">
                  <div className="flex items-center rtl:space-x-reverse">
                    {[...Array(Math.floor(product.ratingAvg))].map(
                      (_, index) => (
                        <svg
                          key={index}
                          className="h-4 w-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      )
                    )}
                    {[...Array(5 - Math.floor(product.ratingAvg))].map(
                      (_, index) => (
                        <svg
                          key={index}
                          className="h-4 w-4 text-foreground-200 dark:text-foreground-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      )
                    )}
                  </div>
                  <span className="ml-1 text-[15px] font-medium text-foreground-600">
                    ({product.ratingAvg}) Reviews
                  </span>
                </div>
                <Link href="#">
                  <h5 className="mt-1 h-[45px] text-[18px] font-semibold tracking-tight text-foreground-800 dark:text-white">
                    {product.name.length > 60
                      ? `${product.name.substring(0, 45)}...`
                      : product.name || 'Product Name'}
                  </h5>
                </Link>
                <div className=" h-[30px] pt-2">
                  <p className="text-[14px] font-medium text-foreground-600 ">
                    Shop :{' '}
                    <Link href="">
                      <span className="text-[14px] font-medium text-blue-800">
                        {product.shop.length > 30
                          ? `${product.shop.substring(0, 20)}...`
                          : product.shop || 'Shop Name'}
                      </span>
                    </Link>
                  </p>
                  <p className="text-[14px] font-medium text-foreground-600 ">
                    Expired date :{' '}
                    <span className="font-medium text-red-500">
                      {product.expiredAt}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between py-8">
                  <div className="flex items-center justify-start">
                    <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent">
                      ${product.price || 'Price'}
                    </span>
                  </div>
                  <div className="flex justify-end gap-[15px]">
                    <div
                      className="cursor-pointer"
                      // onClick={() => handleHeartClick(product)}
                    >
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
                    <div
                      className="cursor-pointer"
                      // onClick={() => handleCartClick(product)}
                    >
                      <div key={product.slug}>
                        {cartStates[product.slug] ? (
                          <MdShoppingCart
                            className="h-[25px] w-[25px] text-[#eb7d52]"
                            onClick={() => handleRemoveFromCart(product)}
                          />
                        ) : (
                          <MdOutlineShoppingCart
                            className="h-[25px] w-[25px] text-[#eb7d52]"
                            onClick={() => handleAddToCart(product)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
}
