import React, { useState } from 'react';
import { Button, cn, Progress } from '@nextui-org/react';

export type SummaryRatingCardProps = React.HTMLAttributes<HTMLDivElement> & {
  ratings: {
    rating: number;
    count: number;
  }[];
  totalRatingCount: number;
  averageRating: number;
  hasRated: boolean;
};

const SummaryRatingCard = React.forwardRef<
  HTMLDivElement,
  SummaryRatingCardProps
>(
  (
    { className, ratings, totalRatingCount, averageRating, hasRated, ...props },
    ref
  ) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    return (
      <div>
        <div
          ref={ref}
          className={cn(
            'flex flex-col gap-2 rounded-medium bg-content1 p-6 shadow-small',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            <span className="text-large font-semibold">
              {isNaN(averageRating) ? 0 : averageRating.toFixed(1)}
            </span>
            <span className="text-default-500">
              • (Based on {totalRatingCount} reviews)
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {ratings.map(({ rating, count }, index) => {
              const percentage =
                totalRatingCount > 0 ? (count / totalRatingCount) * 100 : 0;

              return (
                <div key={index} className="flex items-center gap-1">
                  <Progress
                    showValueLabel
                    aria-label={`${rating} stars`}
                    color="warning"
                    label={
                      <span className="text-small">{`${rating} ${
                        rating > 1 ? 'stars' : 'star'
                      }`}</span>
                    }
                    value={percentage}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

SummaryRatingCard.displayName = 'SummaryRatingCard';

export default SummaryRatingCard;
