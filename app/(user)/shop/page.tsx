import CategoryCardComponent from '@/components/card/CategoryCardComponent';
import NormalProductComponent from '@/components/card/NormalProduct';
import ShopProfileComponent from '@/components/shop-profile/ShopProfileComponent';
import React from 'react';

export default function page() {
  return (
    <div>
      {/* shop profile section */}
      <ShopProfileComponent />
      {/* card category section */}
      <CategoryCardComponent />
      {/* normal card section */}
      <NormalProductComponent/>
      {/* about us section */}
      
    </div>
  );
}
