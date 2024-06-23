import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found ',
  description: 'This is a Error Page 404',
  openGraph: {
    images: [
      {
        url: '/logo.png',
        alt: 'DealKH Logo Ecommerce Website',
      },
    ],
  },
};

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center text-center">
      <Image
        src="/Error404.png"
        alt="Error404"
        width={500}
        height={400}
        className="animate-fadeIn mb-2"
      />
      <h1 className="animate-slideUp mb-3 text-center text-2xl font-bold text-gray-800">
        404 Not Found
      </h1>
      <p className="animate-slideUp text-4xl font-bold text-black">
        Whoops! That page does not exist.
      </p>
    </main>
  );
}
