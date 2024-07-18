import React from 'react';
import { Metadata } from 'next';


import FlashSale from '@/components/pages/FlashSale';
import { fileImgUrl } from '@/libs/ImageUrl';

export const metadata: Metadata = {
          title: 'Flash Sale - Limited-Time Offers at DealKH',
          description:
            'Do not miss out on our flash sale events with incredible discounts on various products. Shop now and save big at DealKH.',
          keywords:
            'flash sale, limited-time offers, flash sale deals, shop now, save big, DealKH flash sale',
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dealkh.istad.co/flash-sale',
            title: 'Flash Sale - Limited-Time Offers at DealKH',
            description:
              'Do not miss out on our flash sale events with incredible discounts on various products. Shop now and save big at DealKH.',
            images: [
              {
                url: fileImgUrl('/icon.png'),
                alt: 'DealKH Flash Sale Icon',
              },
              {
                url: fileImgUrl('/banner.jpg'),
                alt: 'Flash Sale - Limited-Time Offers',
              },
            ],
            siteName: 'dealkh.istad.co',
          },
        };
        
export default function page() {
  return (
    <div>
      <FlashSale/>
    </div>
  );
}
