"use client";
import { ShopResponse } from '@/libs/difinition';
import { useGetShopsQuery } from '@/redux/service/shop';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { BsShop } from "react-icons/bs";
import React from 'react';
import ShopCardComponent from '../card/Shop';

export default function ShopListComponent() {
  return(
    <div>
        <div className="my-8 flex h-[50px] items-center justify-between">
        {/* Left section */}
        <div className="flex-1">
        <p className="relative w-fit text-[20px] font-bold  text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r from-pink-500 to-yellow-500 lg:text-[26px]">
              Shop
            </p>
        </div>
      </div>
      <ShopCardComponent page={'1'} size={'10'}/>
    </div>
  );
}
