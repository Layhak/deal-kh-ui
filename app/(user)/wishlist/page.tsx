import React from 'react';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { fileImgUrl } from '@/libs/ImageUrl';
import WishListTableComponent from '@/components/wishlist/wishlistComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Wishlist',
  description:
    'Explore and manage your wishlist at DealKH. Save your favorite products and discover exclusive offers.',
};

export default function WishlistPage() {
  return (
    <>
      <WishListTableComponent />
    </>
  );
}
