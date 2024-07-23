'use client';
import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Skeleton,
} from '@nextui-org/react';
import { useGetProductsQuery } from '@/redux/service/product';
import { SearchIcon } from '@/components/icons';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Product } from '@/libs/difinition';

export default function SearchProduct() {
  const [pageSize, setPageSize] = useState(10);
  const [, setTotalElements] = useState(0);
  const [productSlug, setProductSlug] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: initialData,
    error: initialError,
    isLoading: initialLoading,
  } = useGetProductsQuery({
    page: 1,
    size: 1, // Limit to 1 product for initial load
    filters: {},
    field: 'name',
  });

  // Update pageSize and totalElements based on the initial query
  useEffect(() => {
    if (initialData && initialData.payload && initialData.payload.pagination) {
      setTotalElements(initialData.payload.pagination.totalElements);
      setPageSize(initialData.payload.pagination.totalElements);
    }
  }, [initialData]);

  const { data, error, isLoading } = useGetProductsQuery({
    page: 1,
    size: pageSize,
    filters: {},
    field: 'name',
  });

  useEffect(() => {
    if (data && data.payload && data.payload.list) {
      setProducts(data.payload.list);
    }
  }, [data]);

  // Clear search value and selected key on route change
  useEffect(() => {
    setSearchValue('');
    setProductSlug('');
  }, [pathname]);

  const handleSearchButtonClick = () => {
    const matchedProduct = products.find(
      (product) => product.name === searchValue
    );
    if (matchedProduct) {
      setProductSlug(matchedProduct.slug);
      router.push(`/products/${matchedProduct.slug}`);
    } else {
      console.log('No matching product found');
    }
  };

  const handleProductClick = (slug: string) => {
    setProductSlug(slug);
    router.push(`/products/${slug}`);
  };

  const handleSelectionChange = (key: React.Key | null) => {
    if (key !== null) {
      const slug = key.toString();
      setProductSlug(slug);
      navigateToProduct(slug);
    }
  };

  const navigateToProduct = (slug: string) => {
    if (slug) {
      router.push(`/products/${slug}`);
    }
  };

  if (initialLoading || isLoading) {
    return <Skeleton className={'h-[50px] w-full rounded-full sm:w-[300px]'} />;
  }

  if (initialError || error) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <Autocomplete
        allowsCustomValue
        value={searchValue}
        onValueChange={setSearchValue}
        className={'border-warning-300'}
        classNames={{
          base: [
            ' max-w-[350px] w-[290px] sm:w-[350px]  ',
            'group-data-[focus=true]:border-warning-500',
          ],
          listboxWrapper: [
            'max-h-[320px]  ',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'dark:data-[hover=true]:bg-warning-50',
            'data-[pressed=true]:opacity-70',
            'data-[hover=true]:bg-warning-200',
            'data-[selectable=true]:focus:bg-warning-500',
            'data-[focus-visible=true]:ring-warning-500',
          ],
          selectorButton: 'text-warning-500 dark:text-warning-300',
        }}
        selectedKey={productSlug}
        defaultItems={products}
        inputProps={{
          classNames: {
            input: 'ml-1',
            inputWrapper: [
              'h-[48px] w-[290px] sm:w-[350px] ',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'border-warning-300',
              'dark:border-warning-50',
              'data-[focus-visible=true]:border-warning-500',
              'group-data-[hover=true]:border-warning-500',
              'group-data-[focus=true]:border-warning-500',
              'dark:data-[focus-visible=true]:border-warning-100',
              'dark:group-data-[hover=true]:border-warning-100',
              'dark:group-data-[focus=true]:border-warning-100',
            ],
          },
        }}
        listboxProps={{
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              'rounded-medium w-[290px] sm:w-[350px]',
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'dark:data-[hover=true]:bg-warning-50',
              'data-[pressed=true]:opacity-70',
              'data-[hover=true]:bg-warning-100',
              'data-[selectable=true]:focus:bg-warning-100',
              'data-[focus-visible=true]:ring-warning-100',
            ],
          },
        }}
        aria-label="Select a product"
        placeholder="Enter product name"
        onSelectionChange={handleSelectionChange}
        popoverProps={{
          offset: 10,
          classNames: {
            base: 'rounded-large ',
            content: 'p-1 border-small border-warning-100 bg-background fixed',
          },
        }}
        startContent={
          <Button size={'md'} isIconOnly radius={'full'} variant="light">
            <SearchIcon size={24} />
          </Button>
        }
        color={'default'}
        radius="full"
        variant="bordered"
      >
        {products.map((item) => (
          <AutocompleteItem
            key={item.slug}
            textValue={item.name}
            value={item.slug}
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
                  <span className="text-bold text-small text-default-900">
                    {item.name}
                  </span>
                  <span className="text-tiny text-warning-500">
                    {item.shop}
                  </span>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
}
