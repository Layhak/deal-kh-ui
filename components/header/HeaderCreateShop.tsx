'use client';
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import CreateShopModal from './FormCreateShop';

type openMenuProps = {
  isMenuOpen: boolean;
  hasShop: boolean;
};

export default function HeaderCreateShop({
  isMenuOpen,
  hasShop,
}: openMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      router.push('/login');
    } else {
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const refetch = () => {};

  if (isMenuOpen || hasShop) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center gap-2 gap-x-3 border-b-1 border-divider bg-gradient-to-r from-warning-300 to-pink-500 px-6 py-2 sm:flex-row sm:px-3.5 sm:before:flex-1">
      <p
        className="inline-flex items-center justify-center text-small text-foreground"
        onClick={handleOpenModal}
      >
        Do you want to be a seller? Click here.{' '}
        <Icon
          className="hidden outline-none transition-transform group-data-[hover=true]:translate-x-0.5 sm:block [&>path]:stroke-[2]"
          icon="solar:arrow-right-linear"
          width={16}
        />{' '}
        &nbsp;
      </p>
      <Button
        onClick={handleOpenModal}
        className="group relative h-9 overflow-hidden bg-transparent text-small font-normal"
        color="default"
        startContent={
          <Icon
            className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
            icon="weui:shop-filled"
            width={16}
          />
        }
        style={{
          border: 'solid 2px transparent',
          backgroundImage: `linear-gradient(hsl(var(--nextui-foreground-100)), hsl(var(--nextui-foreground-100))), linear-gradient(to right, #f92386, #eaad20)`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
        variant="bordered"
      >
        Create your own shop
      </Button>
      <div className="flex  flex-1 justify-end">
        <CreateShopModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
