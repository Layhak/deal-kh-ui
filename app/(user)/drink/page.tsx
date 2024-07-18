import React from 'react';
import { Metadata } from 'next';

import { fileImgUrl } from '@/libs/ImageUrl';
import Drink from '@/components/pages/Drink';

export const metadata: Metadata = {
          title: 'Shop the Best Drinks in Cambodia - DealKH',
          description:
            'Discover a wide selection of drinks at DealKH. Enjoy great deals and discounts on beverages from top brands in Cambodia.',
          keywords:
            'Cambodia drinks, beverage deals, drink discounts, shop drinks, best beverages, DealKH drinks',
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dealkh.istad.co/category/drink',
            title: 'Shop the Best Drinks in Cambodia - DealKH',
            description:
              'Discover a wide selection of drinks at DealKH. Enjoy great deals and discounts on beverages from top brands in Cambodia.',
            images: [
              {
                url: fileImgUrl('/icon.png'),
                alt: 'DealKH Drinks Icon',
              },
              {
                url: fileImgUrl('/banner.jpg'),
                alt: 'Best Drinks and Beverages in Cambodia',
              },
            ],
            siteName: 'dealkh.istad.co',
          },
        };
        

export default function page() {
  return (
    <div>
      <Drink/>
    </div>
  );
}
