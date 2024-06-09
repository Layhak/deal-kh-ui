'use client';
import { Image } from '@nextui-org/react';
import React, { useState } from 'react';
import { product } from '@/app/api/get-product/route';

const initialItems = [
  {
    id: 1,
    imageSrc:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
    title: 'Basic Tee 6-Pack',
    collection: 'TenTen New Collection',
    price: '$500',
  },
  {
    id: 2,
    imageSrc:
      'https://i.pinimg.com/236x/fe/c2/a4/fec2a4eab17950d22e69f563b45fbed5.jpg',
    title: 'Another Product',
    collection: 'Spring Collection',
    price: '$700',
  },
  {
    id: 3,
    imageSrc:
      'https://i.pinimg.com/474x/16/55/c8/1655c80363e753ae9920e8524c72c95e.jpg',
    title: 'Yet Another Product',
    collection: 'Summer Collection',
    price: '$600',
  },
  {
    id: 4,
    imageSrc:
      'https://i.pinimg.com/474x/16/55/c8/1655c80363e753ae9920e8524c72c95e.jpg',
    title: 'Yet Another Product',
    collection: 'Summer Collection',
    price: '$600',
  },
  {
    id: 5,
    imageSrc:
      'https://i.pinimg.com/474x/16/55/c8/1655c80363e753ae9920e8524c72c95e.jpg',
    title: 'Yet Another Product',
    collection: 'Summer Collection',
    price: '$600',
  },
  {
    id: 6,
    imageSrc:
      'https://i.pinimg.com/474x/16/55/c8/1655c80363e753ae9920e8524c72c95e.jpg',
    title: 'Yet Another Product',
    collection: 'Summer Collection',
    price: '$600',
  },
];

const WishlistComponent = () => {
  const [items, setItems] = useState(product);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleOptionClick = (itemId: number, option: string) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [itemId]: option,
    }));
    // Close the dropdown after selecting an option
    setOpenDropdown(null);
    console.log(`Item ${itemId} selected discount: ${option}`);
  };

  const handleRemoveItem = (itemId: number) => {
    setItems(items.filter((item) => item.id !== itemId));
    setSelectedOptions((prevState) => {
      const newState = { ...prevState };
      delete newState[itemId];
      return newState;
    });
  };

  const toggleDropdown = (itemId: number) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

  return (
    <section className="rounded-md bg-white dark:bg-black">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="mb-4">
            <header>
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Wishlist
              </h1>
            </header>
            <div className=" mb-4 h-2 w-[115px] bg-orange-600"></div>
          </div>

          <div className="mt-8">
            <div className="flex h-12 items-center justify-around rounded-lg border text-center text-lg font-semibold">
              <p>Product</p>
              <p>Shop</p>
              <p>Discount you want</p>
              <p>Price</p>
            </div>

            <ul className="mt-5 space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    className="size-16 rounded object-cover"
                  />

                  <div className="w-[450px] ">
                    <h3 className="text-base text-gray-900">{item.title}</h3>
                  </div>

                  <div className="w-[450px] ">
                    <h3 className="text-base text-gray-900">
                      {item.collection}
                    </h3>
                  </div>

                  <div className="relative inline-block w-[450px] text-center ">
                    <button
                      className="z-0 inline-flex w-[150px] items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-white dark:bg-black dark:text-white"
                      onClick={() => toggleDropdown(item.id)}
                    >
                      {selectedOptions[item.id] || 'Discount off'}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="-mr-1 ml-2 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        =
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {openDropdown === item.id && (
                      <div
                        className="absolute right-12 z-30 mt-2 w-36 divide-y divide-gray-100 rounded-md border-gray-200  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border dark:bg-black dark:text-white"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div className="block w-full" role="none">
                          <button
                            className="dark:hover:text-red px-4 py-2 text-sm  text-gray-700"
                            role="menuitem"
                            onClick={() =>
                              handleOptionClick(item.id, '20% off')
                            }
                          >
                            20% off
                          </button>
                          <button
                            className="dark:hover:text-red px-4 py-2 text-sm  text-gray-700"
                            role="menuitem"
                            onClick={() =>
                              handleOptionClick(item.id, '50% off')
                            }
                          >
                            50% off
                          </button>
                          <button
                            className="dark:hover:text-red px-4 py-2 text-sm  text-gray-700"
                            role="menuitem"
                            onClick={() =>
                              handleOptionClick(item.id, '70% off')
                            }
                          >
                            70% off
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="w-[400px] pr-12 text-right">
                    <h3 className="text-base text-gray-900">{item.price}</h3>
                  </div>

                  <div className="mr-5 flex flex-1 items-center justify-end gap-2">
                    <button
                      className="text-red-600 transition"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <span className="sr-only">Remove item</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="hover:text-red h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishlistComponent;
