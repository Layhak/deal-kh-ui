import React from 'react';
import { Metadata } from 'next';

import Electronic from '@/components/pages/Electronic';
import { fileImgUrl } from '@/libs/ImageUrl';


export const metadata: Metadata = {
          title: 'Shop the Latest Electronics in Cambodia - DealKH',
          description:
            'Discover the best deals on electronics at DealKH. Shop a wide range of gadgets and devices with amazing discounts in Cambodia.',
          keywords:
            'Cambodia electronics, electronic deals, gadget discounts, shop electronics, latest devices, DealKH electronics',
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dealkh.istad.co/category/electronic',
            title: 'Shop the Latest Electronics in Cambodia - DealKH',
            description:
              'Discover the best deals on electronics at DealKH. Shop a wide range of gadgets and devices with amazing discounts in Cambodia.',
            images: [
              {
                url: fileImgUrl('/icon.png'),
                alt: 'DealKH Electronics Icon',
              },
              {
                url: fileImgUrl('/banner.jpg'),
                alt: 'Latest Electronics and Gadgets in Cambodia',
              },
            ],
            siteName: 'dealkh.istad.co',
          },
        };
        

export default function page() {
  return (
    <div>
      <Electronic/>
    </div>
  );
}
