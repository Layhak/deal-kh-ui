import React, { useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { CartIcon, CloseIcon, HeartIcon, SearchIcon } from '@/components/icons';
import { Input } from '@nextui-org/react';

interface LocationDropDown {
  location: string[];
  onLocationSelect: (location: string) => void;
}

const SearchLocationDropDown: React.FC<LocationDropDown> = ({
  location,
  onLocationSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const half = Math.ceil(location.length);
  const locationList = location
    .filter((category) =>
      category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, half);

  const handleLocationClick = (selectedLocation: string) => {
    onLocationSelect(selectedLocation);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div className="absolute left-0 top-[46px] mt-1 w-[200px] origin-top-left grid-cols-2 gap-4 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <h1 className="text-gray py-2 text-center text-warning">Locations</h1>
          {locationList.map((location, index) => (
            <a
              key={index}
              href={`/category/${encodeURIComponent(location.toLowerCase())}`}
              onClick={() => handleLocationClick(location)}
              className="block px-4 py-2 text-sm text-gray-700 transition-all ease-in-out hover:bg-warning hover:text-white"
              role="menuitem"
            >
              {location}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchLocationDropDown;
