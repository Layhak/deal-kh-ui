import React from 'react';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { fileImgUrl } from '@/libs/ImageUrl';
import WishListTableComponent from '@/components/wishlist/wishlistComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Wishlist - DealKH',
  description:
    'Explore and manage your wishlist at DealKH. Save your favorite products and discover exclusive offers.',
  keywords:
    'wishlist, DealKH wishlist, favorite products, save items, exclusive offers, Cambodia wishlist',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealkh.istad.co/wishlist',
    title: 'My Wishlist - DealKH',
    description:
      'Explore and manage your wishlist at DealKH. Save your favorite products and discover exclusive offers.',
    images: [
      {
        url: fileImgUrl('/icon.png'),
        alt: 'DealKH Wishlist Icon',
      },
      {
        url: fileImgUrl('/banner.jpg'),
        alt: 'My Wishlist at DealKH',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
};

export default function WishlistPage() {
  return (
    <>
      <WishListTableComponent />
    </>
  );
}
