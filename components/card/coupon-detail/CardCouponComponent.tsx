import React from 'react';
import { useRouter } from 'next/navigation';
import { CouponData, couponData } from './couponData';
import { Image } from '@nextui-org/react';

type Props = {
  displayCount: number;
};

const CardCouponComponent: React.FC<Props> = ({ displayCount }) => {
  const router = useRouter();

  const handleClick = (couponId: number) => {
    router.push(`/coupons/${couponId}`);
  };

  // Determine the number of coupons to display based on displayCount prop
  const couponsToDisplay =
    displayCount === 3 ? couponData.slice(0, 3) : couponData;

  return (
    <div className="my-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {couponsToDisplay.map((coupon: CouponData, index: number) => (
        <div
          key={index}
          onClick={() => handleClick(coupon.slug)}
          className="relative cursor-pointer"
        >
          <Image
            width={500}
            height={500}
            className="object-cover"
            src={coupon.image}
            alt={`Coupon ${coupon.slug}`}
          />
        </div>
      ))}
    </div>
  );
};

export default CardCouponComponent;
