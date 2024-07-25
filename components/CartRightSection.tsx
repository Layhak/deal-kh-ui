// ProductDetailComponent.tsx

import { Product } from '@/libs/difinition';
import { GrMapLocation } from 'react-icons/gr';
import { BsShop } from 'react-icons/bs';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

type ProductDetailProps = {
  product: Product;
  handleGetDirections: (location: string) => void;
};

export default function CartRightSection({
  product,
  handleGetDirections,
}: ProductDetailProps) {

  // const router = useRouter();
  // const navigateToShop = () => {
  //   router.push(`/shop/${shopSlug}`);
  // };

  return (
    <div>
      <div className="flex md:h-[300px] flex-shrink-0 items-center justify-center lg:h-[400px]">
        <div className="relative md:h-[300px] overflow-hidden rounded-md lg:h-[400px]">
          <Image
            alt={product.name}
            src={product.images[0].url}
            className="h-full w-full rounded-md object-fill"
          />
        </div>
      </div>
      <h2 className="text-fourground-700 lg:my-4 md:my-2 text-2xl font-semibold dark:text-white">
        {product.name}
      </h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center rtl:space-x-reverse">
          {[...Array(Math.floor(product.ratingAvg))].map((_, index) => (
            <svg
              key={index}
              className="h-4 w-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          {[...Array(5 - Math.floor(product.ratingAvg))].map((_, index) => (
            <svg
              key={index}
              className="h-4 w-4 text-foreground-200 dark:text-foreground-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        </div>

        <span className="text-fourground-600 pl-2 text-sm dark:text-white">
          {product.ratingCount} Reviews
        </span>
      </div>
      <div className="my-2 flex gap-4 text-foreground-400 md:flex-row">
        <p className="lg:my-2 md:my-1 text-lg font-bold line-through dark:text-white md:mr-3">
          ${product.price}
        </p>
        <p className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text lg:text-3xl md:text-2xl font-bold text-transparent">
          ${(product.price - product.discountPrice).toFixed(2)}
        </p>
      </div>
      <div className="text-fourground-600 dark:text-fourground-300 mb-4 w-fit">
        {product.description}
      </div>
      <div className="mb-4 flex gap-4">
        <BsShop className="text-2xl text-[#eb7d52]" />
        <span className="text-fourground-600 dark:text-fourground-300 cursor-pointer hover:text-[#eb7b52]">
          {product.shop}
        </span>
      </div>
      <div className="mb-4 flex gap-4">
        <GrMapLocation className="text-2xl text-[#eb7d52]" />
        <span
          className="text-fourground-600 dark:text-fourground-300 cursor-pointer hover:text-[#eb7b52]"
          onClick={() => handleGetDirections(product.location)}
        >
          {product.address}
        </span>
      </div>
      <div className="flex gap-4">
        <MdOutlineLocalPhone className="text-2xl text-[#eb7d52]" />
        <span className="text-fourground-600 dark:text-fourground-300">
          012 345 678
        </span>
      </div>
    </div>
  );
}
