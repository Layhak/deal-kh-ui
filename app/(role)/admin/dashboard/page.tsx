import Charts from '@/components/data/chart';
import { BackIcon } from '@/components/icons';
import { Metadata } from 'next';
import React from 'react'
import NextLink from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard Page',
  description: 'Dashboard Page',
};

export default function Dashboard() {
  return (
    <>
      <div className="w-full text-left">
        <NextLink href="/">
          <BackIcon />
        </NextLink>
      </div>
      <div className="">
        <Charts />
      </div>
    </>

  )
}
