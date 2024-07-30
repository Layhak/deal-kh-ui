import React from 'react';
import { Metadata } from 'next';

import Deal from '@/components/pages/Deal';


export const metadata: Metadata = {
  title: 'Deal Page',
};


export default function page() {
  return (
    <main>
      <Deal />
    </main>
  );
}
