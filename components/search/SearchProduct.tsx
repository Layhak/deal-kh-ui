import React, {
  SetStateAction,
  useState,
} from 'react';
import { CloseIcon, SearchIcon } from '@/components/icons';
import { Input } from '@nextui-org/react';
import { productSearchList } from '@/types/productSearch';
import { useRouter } from 'next/navigation';
import { useGetCategoryQuery } from '@/redux/service/category';

export default function SearchProduct () { 
  // for product search bar
  const [searchValue, setSearchValue] = useState('');
  const [productDropdown, setProductDropdown] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const router = useRouter();

  const getCategory: string[] = [
    'T-Shirt',
    'Pizza',
    'iPhone',
    'Soda',
    'Jeans',
    'Burger',
    'Samsung Galaxy',
    'Coffee',
  ];
  
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
    setProductDropdown(newSearchValue.length > 0);
  };

  const handleSubmit = () => {
    // Navigate to the search results page and pass the filtered products
    router.push(`/searching-product?searchValue=${searchValue}`);
    setProductDropdown(false);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setProductDropdown(false);
    setClickCount(0);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  // for drop-down menu of product
  const [searchQuery, setSearchQuery] = useState('');
  const half = Math.ceil(productSearchList.length);
  const productList = productSearchList
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, half);

  const handleOnSelectProduct = (item: string) => {
    setSearchValue(item);
    console.log('This is the value that I have Clicked: ', item);
  };

  const filteredProducts = getCategory.filter((category: string) =>
    category.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleInputClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    setProductDropdown(clickCount % 2 === 0);
  };

  return (
    <div
      className="relative"
    >
      <Input
        aria-label="Product Search"
        classNames={{
          inputWrapper:
            'bg-default-100 rounded-none rounded-l-xl w-[200px] mt-1',
          input: 'text-sm',
        }}
        labelPlacement="outside"
        placeholder={searchValue || 'Search Product'}
        onChange={handleSearchChange}
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
        onClick={handleInputClick}
        onKeyPress={handleKeyPress}
      />
      {productDropdown && (
        <div className="relative">
          <div className="absolute left-0 top-[2px] mt-1 w-[200px] origin-top-left grid-cols-2 gap-4 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none group-hover:grid">
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
              {filteredProducts.map((category: string, index: any) => (
                <a
                  key={index}
                  className="hover:cursor-pointer block px-4 py-2 text-sm text-gray-700 transition-all ease-in-out hover:bg-warning hover:text-white group-hover:grid"
                  role="menuitem"
                  onClick={() => handleOnSelectProduct(category)}
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
