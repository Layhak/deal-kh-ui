import ShopProfileComponent from '@/components/shop-profile/ShopProfileComponent';
import shopFakes, { ShopFake } from '@/types/shopFake';
import React from 'react';

type Props = {
  params: {
    slug: string;
  };
};

const ShopProfile = ({ params }: Props) => {
  const { slug } = params;

  const shopProfiles = shopFakes.find(
    (shopProfile: ShopFake) => shopProfile.slug === slug
  );

  if (!shopProfiles) {
    return <p>Shop Not Founded</p>;
  }

  return (
    <div>
      <ShopProfileComponent shopProfile={shopProfiles} />
    </div>
  );
};

export default ShopProfile;
