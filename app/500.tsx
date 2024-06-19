import { Metadata } from 'next';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import React from 'react';

export const metadata: Metadata = {
  title: '500 Internal Error ',
  description: 'This is a Error Page 500',
  openGraph: {
    images: [
      {
        url: '/logo.png',
        alt: 'DealKH Logo Ecommerce Website',
      },
    ],
  },
};

export default function InternalErrorPage() {
  return (
    <main className="flex flex-col items-center justify-center text-center">
      <Image
        src="/Error500.png"
        alt="Error500"
        width={500}
        height={400}
        className="animate-fadeIn mb-4"
      />
      <h1 className="animate-slideUp mb-3 text-center text-2xl font-bold text-gray-800">
        500 Internal Error
      </h1>
      <p className="animate-slideUp text-4xl font-bold text-black">
        Whoops! That page does not exist.
      </p>
    </main>
  );
}
