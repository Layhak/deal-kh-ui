import React from 'react';
import { Metadata } from 'next';

import Cloth from '@/components/pages/Cloth';
import { fileImgUrl } from '@/libs/ImageUrl';

export const metadata: Metadata = {
          title: 'Shop the Latest Fashion and Clothes in Cambodia - DealKH',
          description:
            'Discover the latest fashion trends and shop a wide range of clothes at DealKH. Enjoy great deals and discounts on stylish apparel in Cambodia.',
          keywords:
            'Cambodia clothes, fashion deals, latest fashion trends, stylish clothes, shop clothes, clothing discounts, DealKH',
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dealkh.istad.co/category/clothes',
            title: 'Shop the Latest Fashion and Clothes in Cambodia - DealKH',
            description:
              'Discover the latest fashion trends and shop a wide range of clothes at DealKH. Enjoy great deals and discounts on stylish apparel in Cambodia.',
            images: [
              {
                url: fileImgUrl('/icon.png'),
                alt: 'DealKH Clothes Icon',
              },
              {
                url: fileImgUrl('/banner.jpg'),
                alt: 'Latest Fashion and Clothes in Cambodia',
              },
            ],
            siteName: 'dealkh.istad.co',
          },
        };
        
export default function page() {
  return (
    <div>
      <Cloth/>
    </div>
  );
}
