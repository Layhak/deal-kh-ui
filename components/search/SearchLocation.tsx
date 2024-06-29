"use client"

import React, { SetStateAction, useRef, useState } from 'react';
import { CartIcon, CloseIcon, HeartIcon, SearchIcon } from '@/components/icons';
import { Input, dropdown } from '@nextui-org/react';
import { useSubmitFormMutation } from '@/redux/api';
import { LocationSearch } from '@/types/locationSearch';
import { useRouter } from 'next/navigation';

type Location = {
  locations: LocationSearch[];
}

const SearchLocation: React.FC<Location> = ({ locations }) => {
  // for product search bar
  const [submitForm, { isLoading, isError, error }] = useSubmitFormMutation();
  const [searchValue, setSearchValue] = useState('');
  const [productDropdown, setProductDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = () => {
    // Navigate to the search results page and pass the filtered products
    router.push(`/testing?searchValue=${searchValue}`);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleInputClick = () => {
    setProductDropdown(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setProductDropdown(false)
      handleSubmit();
    }
  };

  // for drop-down menu of product
  const [searchQuery, setSearchQuery] = useState('');
  const [selectItem, setSelectItem] = useState('');
  const half = Math.ceil(locations.length);
  const productList = locations
    .filter((location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, half);

    const handleOnSelectProduct = (item: string) => {
      setSearchValue(item);
      console.log("This is the value that I have Clicked: ", item)
    };

  return (
    <div
      className="relative"
      onMouseEnter={() => setProductDropdown(true)}
      onMouseLeave={() => setProductDropdown(false)}
    >
      <Input
        aria-label="Location Search"
        classNames={{
          inputWrapper:
            'bg-default-100 rounded-none rounded-r-xl w-[200px] mt-1',
          input: 'text-sm',
        }}
        labelPlacement="outside"
        placeholder={searchValue || 'Search Deal-KH'}
        endContent={
          searchValue ? (
            <CloseIcon
              onClick={handleClearSearch}
              className="flex-shrink-0 cursor-pointer text-base text-default-400"
            />
          ) : (
            <SearchIcon
              onClick={handleSubmit}
              className="pointer-events-none flex-shrink-0 text-base text-default-400"
            />
          )
        }
        type="search"
        value={searchValue}
        onChange={handleSearchChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {productDropdown && (
        <div className="relative">
          <div className="absolute left-0 top-[2px] mt-1 w-[200px] origin-top-left grid-cols-2 gap-4 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <h1 className="text-gray py-2 text-center text-warning">
                Locations
              </h1>
              {productList.map((location, index) => (
                <a
                  key={index}
                  // href={`/category/${encodeURIComponent(location.name.toLowerCase())}`}
                  className="block px-4 py-2 text-sm text-gray-700 transition-all ease-in-out hover:bg-warning hover:text-white"
                  role="menuitem"
                  onClick={ () => handleOnSelectProduct(location.name)}
                >
                  {location.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
