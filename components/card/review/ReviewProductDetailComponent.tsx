'use client';
import { Button, Image, Link, ScrollShadow } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import SummaryRatingCard from '@/components/card/review/SummaryRatingCard';
import { RatingResponse, FeedbackItem } from '@/types/ratings';
import {
  useGetProductFeedbackQuery,
  useGetAllProductRatingsQuery,
} from '@/redux/service/ratingAndFeedback';
import ModalRating from '@/components/card/review/ModalRating';
import ReviewForm from '@/components/card/review/ReviewForm';
import Loading from '@/app/(user)/loading';
import FeedbackCard from '@/components/card/review/FeedbackCard'; // Import FeedbackCard

interface CombinedFeedbackItem extends FeedbackItem {
  ratingValue: number;
  createdAt: string;
}

type ReviewProductDetailComponentProps = {
  productSlug: string;
};

export default function ReviewProductDetailComponent({
  productSlug,
}: ReviewProductDetailComponentProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState<number[]>([
    0, 0, 0, 0, 0, 0,
  ]);
  const [combinedFeedback, setCombinedFeedback] = useState<
    CombinedFeedbackItem[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasRated, setHasRated] = useState(false); // Track if the user has rated

  const toggleModal = () => {
    if (!hasRated) {
      setIsModalOpen(!isModalOpen);
    } else {
      alert('You have already rated this product.');
    }
  };
  const toggleShowAllReviews = () => setShowAllReviews(!showAllReviews);

  const {
    data: ratingsData,
    error: ratingError,
    isLoading: ratingLoading,
    refetch: refetchRatings,
  } = useGetAllProductRatingsQuery();

  const {
    data: feedbackData,
    error: feedbackError,
    isLoading: feedbackLoading,
    refetch: refetchFeedback,
  } = useGetProductFeedbackQuery({ productSlug });

  useEffect(() => {
    if (ratingsData) {
      if (feedbackData) {
        const feedbacks = Array.isArray(feedbackData.payload)
          ? feedbackData.payload
          : [feedbackData.payload];
        combineData(ratingsData, feedbacks);
      }
    }
  }, [ratingsData, feedbackData]);

  useEffect(() => {
    if (ratingsData) {
      const currentUser = 'currentUser'; // Replace with actual logic to get the current user
      const userHasRated = ratingsData.some(
        (rating) => rating.username === currentUser
      );
      setHasRated(userHasRated);
    }
  }, [ratingsData]);

  const combineData = (
    ratings: RatingResponse[],
    feedbacks: FeedbackItem[]
  ) => {
    const combined = feedbacks.map((feedback) => {
      const rating = ratings.find(
        (r) =>
          r.username === feedback.username &&
          r.productName === feedback.productName
      );
      return {
        ...feedback,
        ratingValue: rating ? rating.ratingValue : 0,
        createdAt: rating ? rating.createdAt : '',
      };
    });
    setCombinedFeedback(combined);
    calculateRatings(ratings);
  };

  const calculateRatings = (ratings: RatingResponse[]) => {
    let totalRating = 0;
    let ratingCount = [0, 0, 0, 0, 0, 0];

    ratings.forEach((rating) => {
      totalRating += rating.ratingValue;
      const roundedStar = Math.round(rating.ratingValue);
      ratingCount[roundedStar]++;
    });

    setAverageRating(totalRating / ratings.length);
    setRatingCounts(ratingCount);
  };

  const handleNewRating = () => {
    refetchRatings();
    refetchFeedback();
  };

  if (ratingLoading || feedbackLoading) return <Loading />;
  if (ratingError || feedbackError)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">
          Error loading data because you are not logged in
        </div>
      </div>
    );

  const reviewsToShow = combinedFeedback.slice(
    0,
    showAllReviews ? combinedFeedback.length : 3
  );

  return (
    <>
      <div className="mb-6 p-4">
        <div className="mb-8 ">
          <p className="text-fourground-800 relative w-fit text-[26px] font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Product <span className="text-[#eb7d52]">Rating</span>
          </p>
        </div>
        <div className={'mb-5 pe-3 ps-8'}>
          <ReviewForm productSlug={productSlug} onNewRating={handleNewRating} />
        </div>
        <div className={'grid grid-cols-1 lg:grid-cols-3 '}>
          <section className="mx-auto w-full max-w-md lg:px-8">
            <div className="flex flex-col gap-4">
              <SummaryRatingCard
                averageRating={averageRating}
                ratings={[
                  { rating: 5, count: ratingCounts[5] },
                  { rating: 4, count: ratingCounts[4] },
                  { rating: 3, count: ratingCounts[3] },
                  { rating: 2, count: ratingCounts[2] },
                  { rating: 1, count: ratingCounts[1] },
                ]}
                totalRatingCount={ratingsData ? ratingsData.length : 0}
                onWriteReview={toggleModal}
                hasRated={hasRated}
              />
            </div>
          </section>
          <div className={'col-span-2'}>
            <ScrollShadow size={10} className="h-[550px] w-full ">
              {reviewsToShow.map((review, index) => (
                <FeedbackCard key={index} review={review} />
              ))}
            </ScrollShadow>
            {(combinedFeedback.length ?? 0) > 3 && (
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={toggleShowAllReviews}
                  className="text-fourground-800 mr-2 flex rounded-lg px-4 py-2 pb-1 text-[17px] font-normal"
                >
                  {showAllReviews ? 'Show Less ' : 'Show More'}
                  {showAllReviews ? (
                    <MdExpandLess className="text-fourground-800 ml-2 mt-[2px] text-2xl" />
                  ) : (
                    <MdExpandMore className="text-fourground-800 ml-2 mt-[2px] text-2xl" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="my-8 flex h-[50px] items-center justify-between">
          <div className="flex-1">
            <p className="text-fourground-800 relative w-fit text-[26px] font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Related <span className="text-[#eb7d52]">Product</span>
            </p>
          </div>
          <Link href="/buymoregetmore">
            <div className="flex items-center pt-1">
              <p className="text-fourground-800 mr-2 pb-1 text-[17px] font-normal">
                See More
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M42 24H6m24-12l12 12-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
      <ModalRating
        isOpen={isModalOpen}
        onClose={toggleModal}
        onOpenChange={toggleModal}
        productSlug={productSlug}
        onNewRating={handleNewRating}
        hasRated={hasRated}
      />
    </>
  );
}
