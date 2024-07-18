'use client';
import { Button, Image, Tooltip } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { CartProductType } from '@/libs/difinition';

type ProductProps = {
  product: CartProductType;
  quantity: number;
  imageClick: () => void;
  increaseQty: () => void;
  decreaseQty: () => void;
  removeFromCart: () => void;
};

export default function ListProductAddToCart({
  product,
  quantity,
  imageClick,
  increaseQty,
  decreaseQty,
  removeFromCart,
}: ProductProps) {
  return (
    <div>
      <>
        <h3 className="sr-only">Items in your cart</h3>
        <ul>
          <li className="flex items-center gap-x-4 border-b-small border-divider py-4">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-md">
                <Image
                  alt={product.name}
                  src={product.images[0].url}
                  className="h-full w-full rounded-md object-cover cursor-pointer"
                  onClick={imageClick}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <h4 className="text-fourground-600 dark:text-fourground-300 text-sm font-medium ">
                {product.name}
              </h4>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-fourground-600 dark:text-fourground-300 text-sm font-medium">
                  ${product.price}
                </span>
                <span className="text-fourground-600 dark:text-fourground-300 text-sm font-medium">
                  x
                </span>
                <span className="text-fourground-600 dark:text-fourground-300 text-sm font-medium">
                  {quantity}
                </span>
              </div>
              <div className="mt-2 flex gap-8">
                <Icon
                  icon="bx:bxs-minus-circle"
                  className="text-danger"
                  onClick={decreaseQty}
                  width={16}
                />

                <Icon
                  icon="bx:bxs-plus-circle"
                  className="text-success"
                  onClick={increaseQty}
                  width={16}
                />
              </div>
            </div>

            <Tooltip content="Remove" placement="top">
              <Button
                isIconOnly
                size="sm"
                className="h-7 w-7 min-w-[1.5rem]"
                radius="full"
                variant="light"
                onClick={removeFromCart}
              >
                <Icon
                  icon="lucide:x"
                  className="text-fourground-600 dark:text-fourground-300"
                  width={14}
                />
              </Button>
            </Tooltip>
          </li>
        </ul>
      </>
    </div>
  );
}
