'use client';
import React, { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react';
import { useGetProductsQuery } from '@/redux/service/product';
import { SearchIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Product } from '@/libs/difinition';

export default function SearchProduct() {
  const [productSlug, setProductSlug] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const { data, error, isLoading } = useGetProductsQuery({
    page: 1,
    size: 10, // Limit to 10 products
    filters: {
      categorySlug: '', // Adjust the filters as needed
      discountTypeSlug: '',
      name: searchValue,
    },
  });

  useEffect(() => {
    if (data && data.payload && data.payload.list) {
      setProducts(data.payload.list);
    }
  }, [data]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchButtonClick = () => {
    setSearchValue('');
    console.log('Search Value:', searchValue);
    if (productSlug) {
      handleProductClick('');
      router.push(`/products/${productSlug}`);
    }
  };

  const handleProductClick = (slug: string) => {
    setProductSlug(slug);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <Autocomplete
      allowsCustomValue
      value={searchValue}
      onValueChange={handleSearchChange}
      classNames={{
        base: 'max-w-xs rounded-e-none',
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-default-500',
      }}
      defaultItems={products}
      inputProps={{
        classNames: {
          input: 'ml-1',
          inputWrapper: 'h-[48px]',
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            'rounded-medium',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'dark:data-[hover=true]:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[hover=true]:bg-default-200',
            'data-[selectable=true]:focus:bg-default-100',
            'data-[focus-visible=true]:ring-default-500',
          ],
        },
      }}
      aria-label="Select a product"
      placeholder="Enter product name"
      selectedKey={productSlug}
      onSelectionChange={(key) => setProductSlug(key as string)}
      popoverProps={{
        offset: 10,
        classNames: {
          base: 'rounded-large',
          content: 'p-1 border-small border-default-100 bg-background fixed',
        },
      }}
      startContent={
        <Button
          size={'sm'}
          isIconOnly
          radius={'full'}
          variant="light"
          onClick={handleSearchButtonClick}
        >
          <SearchIcon size={24} />
        </Button>
      }
      radius="sm"
      variant="bordered"
    >
      {products.map((item) => (
        <AutocompleteItem
          key={item.slug}
          textValue={item.name}
          value={item.slug}
          onSelect={() => handleProductClick(item.slug)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar
                alt={item.name}
                className="flex-shrink-0"
                size="sm"
                radius={'sm'}
                src={item.images.length > 0 ? item.images[0].url : ''}
              />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-default-400">{item.shop}</span>
              </div>
            </div>
          </div>
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
