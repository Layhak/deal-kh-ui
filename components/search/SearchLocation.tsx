import React, { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react';
import { useGetApprovedShopsQuery } from '@/redux/service/shop';
import { SearchIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Shop } from '@/types/shop';
import { ShopResponse } from '@/libs/difinition';

export default function SearchShop() {
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [shops, setShops] = useState<ShopResponse[]>([]);
  const [selectedShopSlug, setSelectedShopSlug] = useState<string | null>(null);
  const router = useRouter();

  // First query to get the total elements
  const {
    data: initialData,
    error: initialError,
    isLoading: initialLoading,
  } = useGetApprovedShopsQuery({
    page: 1,
    size: 1, // Fetching just one item to get the total number of elements
  });

  // Update pageSize and totalElements based on the initial query
  useEffect(() => {
    if (initialData && initialData.payload && initialData.payload.pagination) {
      setTotalElements(initialData.payload.pagination.totalElements);
      setPageSize(initialData.payload.pagination.totalElements);
    }
  }, [initialData]);

  // Second query to fetch all shops with the updated pageSize
  const { data, error, isLoading } = useGetApprovedShopsQuery({
    page: 1,
    size: pageSize, // Use the updated pageSize
  });

  // Update shops state based on the second query
  useEffect(() => {
    if (data && data.payload && data.payload.list) {
      setShops(data.payload.list);
    }
  }, [data]);

  const handleSelectedShopSlug = (selectedShopSlug: string) => {
    setSelectedShopSlug(selectedShopSlug);
  };

  const handleSubmit = () => {
    if (selectedShopSlug) {
      router.push(`/shops/${selectedShopSlug}`);
    }
  };

  if (initialLoading || isLoading) {
    return <div>Loading...</div>;
  }

  if (initialError || error) {
    return <div>Error loading shops</div>;
  }

  return (
    <Autocomplete
      classNames={{
        base: 'max-w-xs rounded-e-none',
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-default-500',
      }}
      defaultItems={shops}
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
      aria-label="Select a shop"
      placeholder="Enter shop name"
      popoverProps={{
        offset: 10,
        classNames: {
          base: 'rounded-large',
          content: 'p-1 border-small border-default-100 bg-background fixed',
        },
      }}
      onClick={handleSubmit}
      startContent={
        <Button size={'sm'} isIconOnly radius={'full'} variant="light">
          <SearchIcon size={24} />
        </Button>
      }
      radius="sm"
      variant="bordered"
    >
      {(item) => (
        <AutocompleteItem
          key={item.slug}
          textValue={item.name}
          onClick={() => handleSelectedShopSlug(item.slug)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar
                alt={item.name}
                className="flex-shrink-0"
                size="sm"
                radius={'sm'}
                src={item.profile || ''}
              />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-default-400">
                  {item.address}
                </span>
              </div>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
