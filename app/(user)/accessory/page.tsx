import React from 'react';
import { Metadata } from 'next';
import { fileImgUrl } from '@/libs/ImageUrl';

import Accessory from '@/components/pages/Accessory';

export const metadata: Metadata = {
          title: 'Shop the Best Accessories in Cambodia - DealKH',
          description:
            'Find the best deals on accessories in Cambodia. Shop a wide range of stylish and affordable accessories at DealKH.',
          keywords:
            'Cambodia accessories, accessory deals, stylish accessories, affordable accessories, shop accessories, DealKH',
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dealkh.istad.co/category/accessory',
            title: 'Shop the Best Accessories in Cambodia - DealKH',
            description:
              'Find the best deals on accessories in Cambodia. Shop a wide range of stylish and affordable accessories at DealKH.',
            images: [
              {
                url: fileImgUrl('/icon.png'),
                alt: 'DealKH Accessory Icon',
              },
              {
                url: fileImgUrl('/banner.jpg'),
                alt: 'Stylish and Affordable Accessories in Cambodia',
              },
            ],
            siteName: 'dealkh.istad.co',
          },
        };
        

export default function page() {
  return (
    <div>
      <Accessory/>
    </div>
  );
}
