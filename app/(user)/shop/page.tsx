import ShopListComponent from '@/components/pages/AllShop';
import { fileImgUrl } from '@/libs/ImageUrl';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title:
    'Shop Page',
};
export default function page() {
  return (
    <div><ShopListComponent /></div>
  )
}
