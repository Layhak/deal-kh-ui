import React from 'react';
import CardCouponDetail from '@/components/card/coupon-detail/CardCouponDetail';
import { CouponDetail, couponDetail } from '@/components/card/coupon-detail/couponDetail';

// card coupon deatail
type Props = {
  params: {
    id: number;
  };
};

const CouponDetailPage = ({ params }: Props) => {

  const { id } = params;

  const coupons = couponDetail.find((coupon: CouponDetail) => coupon.id == id);

  if (!coupons) {
    return <p>Coupon not found</p>;
  }

  return ( 
    <div>
      <CardCouponDetail coupon={coupons} />
    </div>
  );
};

export default CouponDetailPage;
