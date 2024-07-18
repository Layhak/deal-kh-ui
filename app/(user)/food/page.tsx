import React from 'react';
import { Metadata } from 'next';

import Food from '@/components/pages/Food';
import { fileImgUrl } from '@/libs/ImageUrl';

export const metadata: Metadata = {
          title: 'Discover the Best Food Deals in Cambodia - DealKH',
          description:
            'Explore a variety of delicious food options and find great deals on dining experiences in Cambodia. Discover exclusive offers at DealKH.',
          keywords:
            'Cambodia food deals, dining discounts, food promotions, restaurant deals, eat out discounts, DealKH food',
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dealkh.istad.co/category/food',
            title: 'Discover the Best Food Deals in Cambodia - DealKH',
            description:
              'Explore a variety of delicious food options and find great deals on dining experiences in Cambodia. Discover exclusive offers at DealKH.',
            images: [
              {
                url: fileImgUrl('/icon.png'),
                alt: 'DealKH Food Icon',
              },
              {
                url: fileImgUrl('/banner.jpg'),
                alt: 'Best Food Deals in Cambodia',
              },
            ],
            siteName: 'dealkh.istad.co',
          },
        };
        

export default function page() {
  return (
    <div>
      <Food/>
    </div>
  );
}
