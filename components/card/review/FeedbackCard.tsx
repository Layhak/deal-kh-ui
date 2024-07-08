import React from 'react';
import { Image } from '@nextui-org/react';
import { StarIcon } from '@/components/card/review/StarIcon';

interface FeedbackItemProps {
  review: {
    profile?: string;
    username: string;
    ratingValue: number;
    description: string;
    createdAt: string;
    images: { url: string }[];
  };
}

const FeedbackCard: React.FC<FeedbackItemProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isHalf = rating - i >= -0.5 && rating - i < 0;
      stars.push(
        <StarIcon
          key={i}
          filled={i <= rating}
          half={isHalf}
          color={i <= rating ? '#F5A524' : '#363636'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="rounded-medium bg-content1 p-5 shadow-small">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center justify-center gap-2 rounded-small outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus">
                <Image
                  src={review?.profile || '/images/members/votey.jpg'}
                  width={30}
                  height={30}
                  className="flex object-cover opacity-0 transition-opacity !duration-500 data-[loaded=true]:opacity-100"
                  alt={review.username}
                  data-loaded="true"
                />
                <div className="inline-flex flex-col items-start">
                  <span className="text-small font-medium text-inherit">
                    {review.username || 'Anonymous'}
                  </span>
                  <span className="text-small text-foreground-400">
                    {new Date(review.createdAt).toLocaleDateString() || 'Date'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {renderStars(review.ratingValue)}
            </div>
          </div>
          <div className="mt-4 w-full">
            <p className="mt-2 text-default-500">{review.description}</p>
            <div className="mt-4 flex">
              {review.images.map((image, imgIndex) => (
                <Image
                  key={imgIndex}
                  className="mr-2 h-28 w-28 rounded-lg bg-foreground object-cover"
                  src={image.url}
                  alt="Comment"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
