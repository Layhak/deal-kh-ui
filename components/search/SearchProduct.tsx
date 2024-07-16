import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from '@nextui-org/react';
import { useGetProductsQuery } from '@/redux/service/product';
import { SearchIcon } from '@/components/icons';
import { Product } from '@/libs/difinition';

export default function SearchProduct() {
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  // First query to get the total elements
  const {
    data: initialData,
    error: initialError,
    isLoading: initialLoading,
  } = useGetProductsQuery({
    page: 1,
    size: 1, // Fetching just one item to get the total number of elements
    filters: {
      categorySlug: '', // Adjust the filters as needed
      discountTypeSlug: '',
      name: '',
    },
  });

  // Update pageSize and totalElements based on the initial query
  useEffect(() => {
    if (initialData && initialData.payload && initialData.payload.pagination) {
      setTotalElements(initialData.payload.pagination.totalElements);
      setPageSize(initialData.payload.pagination.totalElements);
    }
  }, [initialData]);

  // Second query to fetch all products with the updated pageSize
  const { data, error, isLoading } = useGetProductsQuery({
    page: 1,
    size: pageSize, // Use the updated pageSize
    filters: {
      categorySlug: '', // Adjust the filters as needed
      discountTypeSlug: '',
      name: '',
    },
  });

  // Update products state based on the second query
  useEffect(() => {
    if (data && data.payload && data.payload.list) {
      setProducts(data.payload.list);
    }
  }, [data]);

  if (initialLoading || isLoading) {
    return <div>Loading...</div>;
  }

  if (initialError || error) {
    return <div>Error loading products</div>;
  }

  return (
    <Autocomplete
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
      popoverProps={{
        offset: 10,
        classNames: {
          base: 'rounded-large',
          content: 'p-1 border-small border-default-100 bg-background fixed',
        },
      }}
      startContent={<SearchIcon size={24} />}
      radius="md"
      variant="bordered"
    >
      {(item) => (
        <AutocompleteItem key={item.slug} textValue={item.name}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar
                alt={item.name}
                className="flex-shrink-0"
                size="sm"
                src={item.images.length > 0 ? item.images[0].url : ''}
              />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-default-400">{item.shop}</span>
              </div>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
