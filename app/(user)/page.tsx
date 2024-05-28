
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home Page',
  openGraph: {
    images: [
      {
        url: "logo.png",
        width: 1200,
        height: 630,
        alt: "DealKH Logo Ecommerce Website",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <div className=" grid justify-center place-content-center h-[100vh] text-2xl">
        <h1>Home</h1>
      </div>
    </>
  );
}
