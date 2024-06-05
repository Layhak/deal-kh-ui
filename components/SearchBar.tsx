import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Input, Image } from "@nextui-org/react";
import { SearchIcon } from '@heroicons/react/solid'; // replace with your actual icon import

interface SearchBarProps {
  onSearch: (values: { firstValue: string; secondValue: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [firstValue, setFirstValue] = useState<string>('');
  const [secondValue, setSecondValue] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ firstValue, secondValue });
  };

  const handleChangeFirstValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstValue(e.target.value);
  };

  const handleChangeSecondValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <Input
        aria-label="First Search"
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm',
        }}
        labelPlacement="outside"
        placeholder="First value..."
        endContent={
          <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
        }
        type="search"
        value={firstValue}
        onChange={handleChangeFirstValue}
      />
      <Input
        aria-label="Second Search"
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm',
        }}
        labelPlacement="outside"
        placeholder="Second value..."
        endContent={
          <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
        }
        type="search"
        value={secondValue}
        onChange={handleChangeSecondValue}
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
