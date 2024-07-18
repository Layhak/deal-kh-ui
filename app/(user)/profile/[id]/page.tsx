import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import UpdateUserProfileComponent from '@/components/profile/update-profile/UpdateUserProfileComponent';
import { fileImgUrl } from '@/libs/ImageUrl';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Profile Settings - DealKH',
  description:
    'Manage your profile settings at DealKH. Update personal information, profile picture, and privacy settings.',
  keywords:
    'profile settings, DealKH profile, manage profile, update information, privacy settings, Cambodia profile settings',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.dealkh.com/profile/settings',
    title: 'Profile Settings - DealKH',
    description:
      'Manage your profile settings at DealKH. Update personal information, profile picture, and privacy settings.',
    images: [
      {
        url: fileImgUrl('/profile-settings-icon.png'),
        alt: 'DealKH Profile Settings Icon',
      },
      {
        url: fileImgUrl('/profile-settings-banner.jpg'),
        alt: 'Profile Settings Management',
      },
    ],
    siteName: 'dealkh.istad.co',
  },
};


export default function UpdateProfilePage() {
  return (
    <>
      <UpdateUserProfileComponent closeModal={function (): void {
        throw new Error('Function not implemented.');
      } } refetchProfile={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </>
  );
}

