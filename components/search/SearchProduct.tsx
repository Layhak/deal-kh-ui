import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { CloseIcon, SearchIcon } from '@/components/icons';
import { Input } from '@nextui-org/react';
import { ProductSearch } from '@/types/productSearch';
import { useRouter } from 'next/navigation';

type ProductDropDown = {
  products: ProductSearch[];
};

const SearchProduct: React.FC<ProductDropDown> = ({ products }) => {
  const [searchValue, setSearchValue] = useState('');
  const [productDropdown, setProductDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/searching-product?searchValue=${searchValue}`);
  };

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
    setProductDropdown(newSearchValue.length > 0);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setProductDropdown(false);
  };

  const handleInputFocus = () => {
    if (searchValue.length > 0) {
      setProductDropdown(true);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setProductDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setProductDropdown(false);
      handleSubmit();
    }
  };

  const handleOnSelectProduct = (item: string) => {
    setSearchValue(item);
    setProductDropdown(false);
    console.log('This is the value that I have Clicked: ', item);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <Input
        aria-label="Product Search"
        ref={inputRef}
        classNames={{
          inputWrapper:
            'bg-default-100 rounded-none rounded-l-xl w-[200px] mt-1',
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
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {productDropdown && (
        <div className="absolute left-0 top-[2px] mt-1 w-[200px] origin-top-left grid-cols-2 gap-4 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {filteredProducts.length > 0 && (
              <h1 className="text-gray py-2 text-center text-warning">
                Product
              </h1>
            )}
            {filteredProducts.map((product, index) => (
              <a
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 transition-all ease-in-out hover:bg-warning hover:text-white"
                role="menuitem"
                onClick={() => handleOnSelectProduct(product.name)}
              >
                {product.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
