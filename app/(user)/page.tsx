
import CardDiscountComponent from '@/components/card/discountCard';
import HomeCard from '@/components/HomeCard';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'This is a Home Page',
  openGraph: {
    images: [
      {
        url: "/images/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "DealKH Logo Ecommerce Website",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
        <CardDiscountComponent />
    </>
  );
}
