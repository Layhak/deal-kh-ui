import React from 'react';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import UserProfileComponent from '@/components/profile/UserProfileComponent';
import { fileImgUrl } from '@/libs/ImageUrl';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'User Profile - DealKH',
  description:
    'Manage your user profile at DealKH. Update your information, view order history, and manage preferences.',
  keywords:
    'user profile, DealKH profile, manage account, update information, order history, preferences, Cambodia user profile',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealkh.istad.co/profile',
    title: 'User Profile - DealKH',
    description:
      'Manage your user profile at DealKH. Update your information, view order history, and manage preferences.',
    images: [
      {
        url: fileImgUrl('/icon.png'),
        alt: 'DealKH Profile Icon',
      },
      {
        url: fileImgUrl('/banner.jpg'),
        alt: 'User Profile Management',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
};


export default function ProfilePage() {
  return (
    <>
      <UserProfileComponent />
    </>
  );
}
