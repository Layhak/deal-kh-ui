import { Image } from '@nextui-org/react';
import React from 'react';

type CouponData = {
  id: number;
  images: string[];
  name: string;
  duration: string;
  location: string;
  contact: string;
  type: string;
};

type Props = {
  coupon: CouponData;
};

const CardCouponDetail: React.FC<Props> = ({ coupon }) => {
  return (
    <div className="mt-6 overflow-hidden rounded border-2 bg-white p-8">
      <div className="">
        <div className="coupon-container flex flex-col justify-between lg:flex-row lg:pb-10">
          {coupon.images.map((imageUrl, index) => (
            <div
              key={index}
              className="mb-4 overflow-hidden rounded-md border border-gray-200 lg:mb-0 lg:mr-4"
            >
              <Image
                className="h-[250px] w-[550px] object-cover"
                src={imageUrl}
                alt={`${coupon.name} Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{coupon.name}</div>
        <p className="mb-2 text-base text-gray-700">{coupon.duration}</p>
        <p className="mb-2 text-base text-gray-700">{coupon.location}</p>
        <p className="mb-2 text-base text-gray-700">{coupon.contact}</p>
        <p className="mb-2 text-base text-gray-700">{coupon.type}</p>
      </div>
    </div>
  );
};

export default CardCouponDetail;
