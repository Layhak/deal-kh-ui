'use client';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  type ModalProps,
  Textarea,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RatingDisplay from '@/components/card/review/RatingDisplay';
import RatingSlider from '@/components/card/review/RatingSlider';
import {
  useLazyGetProductFeedbackQuery,
  useGetProductFeedbackQuery,
  useCreateProductRatingMutation,
} from '@/redux/service/ratingAndFeedback';
import { FeedbackItem } from '@/types/ratings';
import { useTheme } from 'next-themes';

interface ProductModalProps extends Omit<ModalProps, 'children'> {
  productSlug: string;
  onNewRating: () => void;
  hasRated: boolean; // Add hasRated prop
}

const ModalRating = React.forwardRef<HTMLDivElement, ProductModalProps>(
  (
    {
      isOpen,
      onClose,
      onOpenChange,
      productSlug,
      onNewRating,
      hasRated,
      ...props
    },
    ref
  ) => {
    const [rating, setRating] = useState(0);
    const { theme } = useTheme();
    const [createRating] = useCreateProductRatingMutation();
    const { data: feedbackData } = useGetProductFeedbackQuery({ productSlug });

    const handleSliderChange = (value: number | number[]) => {
      setRating(Array.isArray(value) ? value[0] : value);
    };

    useEffect(() => {
      if (!isOpen) {
        setRating(0);
      }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await createRating({
          ratingValue: rating,
          productSlug,
        }).unwrap();
        toast.success('Rating submitted successfully!', { theme });
        onNewRating();
        onClose?.();
      } catch (error: any) {
        if (error.data?.error?.code === 'AUTH_ERROR') {
          toast.error('Invalid token. Please log in again.', { theme });
          onClose?.();
        } else {
          toast.info(
            error.data.error?.description ?? 'Failed to submit rating.',
            { theme }
          );
        }
      }
    };

    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...props} ref={ref}>
        <ModalContent>
          <ModalHeader className="flex-col pt-8">
            <h1 className="text-large font-semibold">Write a review</h1>
            <p className="text-small font-normal text-default-400">
              Share your experience with this product
            </p>
          </ModalHeader>
          <ModalBody className="pb-8">
            {hasRated ? (
              <div className="text-center text-red-500">
                You have already rated this product.
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div>
                  <RatingSlider
                    rating={rating}
                    onRatingChange={handleSliderChange}
                  />
                  <div className="mt-4">
                    <RatingDisplay rating={rating} size={24} />
                    <p className="mt-2">{rating} stars</p>
                  </div>
                </div>
                <Tooltip
                  content="You already rated this product"
                  isOpen={hasRated}
                >
                  <Button
                    color="primary"
                    type="submit"
                    disabled={hasRated}
                    className={'bg-gradient-to-r from-pink-500 to-warning-400 '}
                  >
                    Submit
                  </Button>
                </Tooltip>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

ModalRating.displayName = 'ModalRating';

export default ModalRating;
