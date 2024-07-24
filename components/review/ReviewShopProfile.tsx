import React, { useEffect, useState } from 'react';
import { FeedbackItem } from '@/types/ratings';
import { useGetProfileQuery } from '@/redux/service/user';
import ReviewFormShop from './ReviewFormShop';
import { useGetShopRatingByShopSlugQuery, useGetShopReportBySlugQuery } from '@/redux/service/shopReportAndRating';

interface CombinedFeedbackItem extends FeedbackItem {
  ratingValue: number;
  createdAt: string;
}

type ReviewProductDetailComponentProps = {
  productSlug: string;
};

export default function ReviewSHopProfile({
  productSlug,
}: ReviewProductDetailComponentProps) {
  const [hasRated, setHasRated] = useState(false);
  const { data: currentUserProfile, isLoading: profileLoading } = useGetProfileQuery();
  const { data: ratingsData, isLoading: ratingLoading, refetch: refetchRatings } = useGetShopRatingByShopSlugQuery({ shopSlug: productSlug });
  const { data: feedbackData, isLoading: feedbackLoading, refetch: refetchFeedback } = useGetShopReportBySlugQuery({ shopSlug: productSlug });

  useEffect(() => {
    if (ratingsData && currentUserProfile) {
      const userHasRated = ratingsData?.payload.some(
        (rating: any) => rating.username === currentUserProfile?.payload?.username
      );
      setHasRated(userHasRated);
    }
  }, [ratingsData, currentUserProfile]);

  console.log("User has rated", ratingsData)
  const handleNewRating = () => {
    refetchRatings();
    refetchFeedback();
  };

  return (
    <>
      <div className="mb-6">
        <div className="mb-8">
          <p className="relative w-fit from-pink-500 to-yellow-500  text-[20px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r lg:text-[26px]">
            Shop{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Rating
            </span>
          </p>
        </div>
        <div className={'mb-5'}>
          <ReviewFormShop
            shopSlug={productSlug}
            onNewRating={handleNewRating}
            hasRated={hasRated}
          />
        </div>
      </div>
    </>
  );
}
