import React from 'react';
import { Metadata } from 'next';

import SkinCare from '@/components/pages/SkinCare';
import { fileImgUrl } from '@/libs/ImageUrl';

export const metadata: Metadata = {
          title: 'Shop Skincare Products in Cambodia - DealKH',
          description:
            'Discover a wide range of skincare products at DealKH. Shop for skincare essentials and enjoy great deals and discounts.',
          keywords:
            'Cambodia skincare, skincare products, beauty products, skincare deals, skincare essentials, DealKH skincare',
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dealkh.istad.co/category/skin-care',
            title: 'Shop Skincare Products in Cambodia - DealKH',
            description:
              'Discover a wide range of skincare products at DealKH. Shop for skincare essentials and enjoy great deals and discounts.',
            images: [
              {
                url: fileImgUrl('/skincare-icon.png'),
                alt: 'DealKH Skincare Icon',
              },
              {
                url: fileImgUrl('/skincare-banner.jpg'),
                alt: 'Skincare Products in Cambodia',
              },
            ],
            siteName: 'dealkh.istad.co',
          },
        };
        

export default function page() {
  return (
    <div>
      <SkinCare/>
    </div>
  );
}
