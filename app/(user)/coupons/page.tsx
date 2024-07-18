import React from 'react';
import { Metadata } from 'next';

import Coupon from '@/components/pages/Coupon';
import { fileImgUrl } from '@/libs/ImageUrl';

export const metadata: Metadata = {
          title: 'Find the Best Coupons in Cambodia - DealKH',
          description:
            'Save big with the latest coupons and promo codes from your favorite shops in Cambodia. Discover exclusive discounts and offers at DealKH.',
          keywords:
            'Cambodia coupons, promo codes, discount coupons, shopping discounts, exclusive offers, DealKH coupons, save big',
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dealkh.istad.co/coupons',
            title: 'Find the Best Coupons in Cambodia - DealKH',
            description:
              'Save big with the latest coupons and promo codes from your favorite shops in Cambodia. Discover exclusive discounts and offers at DealKH.',
            images: [
              {
                url: fileImgUrl('/icon.png'),
                alt: 'DealKH Coupons Icon',
              },
              {
                url: fileImgUrl('/banner.jpg'),
                alt: 'Exclusive Coupons and Discounts in Cambodia',
              },
            ],
            siteName: 'dealkh.istad.co',
          },
        };
        

export default function page() {
  return (
    <main>
      <Coupon/>
    </main>
  );
}
