import React from 'react';
import { Metadata } from 'next';

import Discount from '@/components/pages/DiscountOff';
import { fileImgUrl } from '@/libs/ImageUrl';

export const metadata: Metadata = {
          title: 'Exclusive Discounts in Cambodia - DealKH',
          description:
            'Unlock amazing discounts on a wide range of products at DealKH. Shop and save with exclusive offers and promotions in Cambodia.',
          keywords:
            'Cambodia discounts, exclusive discounts, shopping promotions, save money, shopping deals, DealKH discounts',
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dealkh.istad.co/discount',
            title: 'Exclusive Discounts in Cambodia - DealKH',
            description:
              'Unlock amazing discounts on a wide range of products at DealKH. Shop and save with exclusive offers and promotions in Cambodia.',
            images: [
              {
                url: fileImgUrl('/icon.png'),
                alt: 'DealKH Discounts Icon',
              },
              {
                url: fileImgUrl('/banner.jpg'),
                alt: 'Exclusive Discounts in Cambodia',
              },
            ],
            siteName: 'dealkh.istad.co',
          },
        };
        

export default function page() {
  return (
    <div>
      <Discount/>
    </div>
  );
}
