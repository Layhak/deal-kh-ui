'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect, useState } from 'react';
import { CartProductType } from '@/libs/difinition';
import {
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { LuMinus, LuPlus, LuTrash } from 'react-icons/lu';
import { Button } from '@nextui-org/button';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromWishList,
  selectTotalWishlistPrice,
  selectWishlistProducts,
} from '@/redux/feature/wishList/wishListSlice';
import { GrMapLocation } from 'react-icons/gr';
import { Input } from '@nextui-org/react';
import { SearchIcon } from './seller/component/table/SearchIcon';

export default function WishListComponent() {
  const products = useAppSelector(selectWishlistProducts);
  const totalWishlistPrice = useAppSelector(selectTotalWishlistPrice);

  const dispatch = useAppDispatch();

  // Display number of product that only unique select
  const [uniqueProducts, setUniqueProducts] = useState<CartProductType[]>([]);

  useEffect(() => {
    // Filter unique products based on their IDs
    const unique = products.filter(
      (product: { slug: any }, index: any, self: any[]) =>
        index === self.findIndex((t) => t.slug === product.slug)
    );

    // Update the state with the unique products
    setUniqueProducts(unique);
  }, [products]);

  const handleIncrementQuantity = (product: CartProductType) => {
    dispatch(incrementQuantity(product.slug));
  };

  const handleDecrementQuantity = (product: CartProductType) => {
    dispatch(decrementQuantity(product.slug));
  };

  const handleRemoveFromWishList = (product: CartProductType) => {
    dispatch(removeFromWishList(product.slug));
  };

  const handleGetDirections = (location: string) => {
    const [lat, lng] = location.split(',');
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const renderCell = (product: CartProductType, columnKey: string) => {
    switch (columnKey) {
      case 'image':
        return (
          <div className="flex items-center">
            <div className="h-12 w-12">
              <Image
                src={
                  product.images?.[0]?.url ||
                  'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                }
                className="h-12 w-12 object-cover"
                alt={product.name}
              />
            </div>
          </div>
        );
      case 'name':
        return (
          <div>
            {product.name.length > 30
              ? `${product.name.substring(0, 26)}...`
              : product.name || 'Product Name'}
          </div>
        );
      case 'shop':
        return <div>{product.shop}</div>;
      case 'location':
        return (
          <div className="flex">
            <GrMapLocation className="pr-2 text-3xl text-[#eb7d52]" />

            <div
              onClick={() => handleGetDirections(product.location)}
              className="my-auto ml-2 cursor-pointer"
            >
              {product.address}
            </div>
          </div>
        );
      case 'price':
        return <div>${product.price}</div>;
      case 'discount price':
        return <div>${product.discountPrice}</div>;
      case 'quantity':
        return (
          <div className="flex items-center">
            {/* increase button */}
            <div className="flex ">
              <div className="flex h-8 w-8 items-center justify-center rounded-l-lg border">
                <LuPlus
                  onClick={() => dispatch(incrementQuantity(product.slug))}
                />
              </div>

              <div className="flex h-8  w-8 items-center justify-center border">
                <span>{product.quantity}</span>
              </div>

              <div className=" flex h-8  w-8 items-center justify-center rounded-r-lg border">
                <LuMinus
                  onClick={() => dispatch(decrementQuantity(product.slug))}
                />
              </div>
            </div>
          </div>
        );
      case 'total':
        return <div>${product.discountPrice * (product.quantity || 1)}</div>;
      case 'delete':
        return (
          <div className="flex justify-center">
            <Button
              isIconOnly
              onClick={() => dispatch(removeFromWishList(product.slug))}
              className="rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-2 text-white"
            >
              <LuTrash />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center ">
          <Image
            alt="cartEmpty"
            src={'https://store.istad.co/media/product_images/cartEmpty.png'}
            width={200}
            height={200}
          />
          <p className="mt-4 text-2xl font-semibold ">
            Your wishlist is empty!
          </p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p>Look like you haven't make any choice yet...</p>
        </div>
      )}

      {products.length !== 0 && (
        <div>
          <div className="col-span-3 p-4">
            <div className="flex justify-between">
              <p className="relative w-fit text-[20px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]  lg:text-[26px]">
                Your <span className="text-[#eb7d52]">Wishlist</span>
              </p>
            </div>

            <Input
              isClearable
              radius="lg"
              classNames={{
                label: 'text-black/50 dark:text-white/90',
                input: [
                  'bg-transparent',
                  'text-black/90 dark:text-white/90',
                  'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                ],
                innerWrapper: 'bg-transparent',
                inputWrapper: [
                  'bg-default-200/50',
                  'dark:bg-default/60',
                  'backdrop-blur-xl',
                  'backdrop-saturate-200',
                  'hover:bg-default-200/70',
                  'dark:hover:bg-default/70',
                  'group-data-[focus=true]:bg-default-200/50',
                  'dark:group-data-[focus=true]:bg-default/60',
                  '!cursor-text',
                  'w-1/3',
                  'mt-8'
                ],
              }}
              placeholder="Type to searh..."
              startContent={
                <SearchIcon className="pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90" />
              }
            />

            <Table aria-label="Wishlist" className="mt-8">
              <TableHeader
                columns={[
                  { uid: 'image', name: 'Image' },
                  { uid: 'name', name: 'Name' },
                  { uid: 'shop', name: 'Shop Name' },
                  { uid: 'location', name: 'Location' },
                  { uid: 'price', name: 'Price' },
                  { uid: 'discount price', name: 'Discount Price' },
                  { uid: 'quantity', name: 'Quantity' },
                  { uid: 'total', name: 'Total' },
                  { uid: 'delete', name: 'Remove' },
                ]}
              >
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                    <span className="text-sm text-[#eb7d52]">
                      {column.name}
                    </span>
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={uniqueProducts}>
                {(product) => (
                  <TableRow key={product.slug}>
                    {(columnKey: any) => (
                      <TableCell>{renderCell(product, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </main>
  );
}
