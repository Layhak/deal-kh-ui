import ShopListComponent from '@/components/pages/AllShop';
import { fileImgUrl } from '@/libs/ImageUrl';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title:
      'Discover the Best Deals, Coupons, and Promotions in Cambodia - DealKH',
    description:
      'Explore a wide range of deals, coupons, and promotions from various shops in Cambodia. Save big on your shopping with exclusive offers at DealKH.',
    keywords:
      'Cambodia deals, Cambodia coupons, Cambodia promotions, shop deals, shopping discounts, exclusive offers, DealKH',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://dealkh.istad.co/shop',
      title:
        'Discover the Best Deals, Coupons, and Promotions in Cambodia - DealKH',
      description:
        'Explore a wide range of deals, coupons, and promotions from various shops in Cambodia. Save big on your shopping with exclusive offers at DealKH.',
      images: [
        {
          url: fileImgUrl('/icon.png'),
          alt: 'DealKH Logo Ecommerce Website',
        },
        {
          url: fileImgUrl('/banner.jpg'),
          alt: 'Exclusive Shopping Deals in Cambodia',
        },
      ],
      siteName: 'dealkh.istad.co',
    },
  };
export default function page() {
  return (
    <div><ShopListComponent/></div>
  )
}
