import React, { useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { CartIcon, CloseIcon, HeartIcon, SearchIcon } from '@/components/icons';
import { Input } from '@nextui-org/react';

interface ProductDropDown {
  categories: string[];
}

const SearchProductDropDown: React.FC<ProductDropDown> = ({ categories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const half = Math.ceil(categories.length);
  const productList = categories
    .filter((category) =>
      category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, half);

    const handleOnClick = () => {
      console.log("This is the value: New York")
    }

  return (
    <div className="relative">
      <div className="absolute left-0 top-[46px] mt-1 w-[200px] origin-top-left grid-cols-2 gap-4 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <h1 className="text-gray py-2 text-center text-warning">Product</h1>
          {productList.map((category, index) => (
            <a
              key={index}
              href={`/category/${encodeURIComponent(category.toLowerCase())}`}
              className="block px-4 py-2 text-sm text-gray-700 transition-all ease-in-out hover:bg-warning hover:text-white"
              role="menuitem"
              onClick={handleOnClick}
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchProductDropDown;
