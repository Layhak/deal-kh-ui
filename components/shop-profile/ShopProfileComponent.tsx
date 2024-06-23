import React from 'react';
import { MdOutlineDirections } from 'react-icons/md';
import { HiOutlinePhone } from 'react-icons/hi';
import { LuClock10 } from 'react-icons/lu';
import { BiCategory } from 'react-icons/bi';
import MapComponent from '../Maps/MapComponent';

export default function ShopProfileComponent() {
  return (
    <div>
      {/* profile cover section */}
      <div className="mt-4 flex w-full flex-col items-center lg:flex-row">
        <div
          className="relative flex h-40 w-full justify-start rounded-lg bg-gray-800 lg:h-96"
          style={{
            backgroundImage:
              'url(https://i.pinimg.com/originals/e1/c4/69/e1c46950a62d9df60fa3f1d60eb90e3a.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute bottom-0 left-8 flex translate-y-1/2 transform flex-col items-start justify-start lg:flex-row">
            <img
              src="https://i.pinimg.com/564x/c8/5c/4c/c85c4cc81847cc51ff6e21ad0f71eb0d.jpg"
              alt="Profile Picture"
              className="h-24 w-24 rounded-full border-4 border-white lg:h-40 lg:w-40"
            />
            <h1 className="self-center text-start text-lg font-semibold lg:ml-4 lg:mt-16 lg:text-2xl">
              K The Shop - Ks’s collection Shop And Quality Product
            </h1>
          </div>
        </div>
      </div>

      {/* page details section */}
      <div className="mt-[74px] flex flex-col lg:mt-28 lg:flex-row">
        {/* description section */}
        <div className="w-full">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 lg:text-2xl">
            Page's Detail
          </p>
          <p className="mt-4 text-[16px] text-gray-600 dark:text-gray-300">
            Deliver the best collection for our customer, The best collection of
            this era
          </p>

          {/* icons */}
          {/* location */}
          <div className="mt-4 flex flex-row gap-4">
            <div className="self-center text-[24px] text-gray-700">
              <MdOutlineDirections />
            </div>
            <p className="text-[16px] text-gray-600 dark:text-gray-300">
              Russian Federation Blvd., Teuklaak1, Toul Kork, Cambodia
            </p>
          </div>
          {/* phone number */}
          <div className="mt-4 flex flex-row gap-4">
            <div className="self-center text-[24px] text-gray-700">
              <HiOutlinePhone />
            </div>
            <p className="text-[16px] text-gray-600 dark:text-gray-300">
              0 123 456 789
            </p>
          </div>
          {/* open and close */}
          <div className="mt-4 flex flex-row gap-4">
            <div className="self-center text-[24px] text-gray-700">
              <LuClock10 />
            </div>
            <p className="text-[16px] text-gray-600 dark:text-gray-300">
              8:00 AM to 8:00 PM
            </p>
          </div>
          {/* mail */}
          <div className="mt-4 flex flex-row gap-4">
            <div className="self-center text-[24px] text-gray-700">
              <BiCategory />
            </div>
            <p className="text-[16px] text-gray-600 dark:text-gray-300">
              cloth, shoes, skirt, pants, jeans, shirt and a lot more for the
              customer
            </p>
          </div>
        </div>

        {/* map section */}
        {/* <div className="w-full h-24">
        </div> */}
      </div>

      {/* category */}
      <p className="my-12 text-center text-lg font-semibold text-gray-700 dark:text-gray-300 lg:text-3xl">
        Category
      </p>
    </div>
  );
}