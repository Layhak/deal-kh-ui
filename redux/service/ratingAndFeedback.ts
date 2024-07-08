// ratingAndFeedbackApi.js
import { ecommerceApi } from '@/redux/api';
import {
  CreateFeedbackRequest,
  CreateRatingRequest,
  FeedbackResponse,
  RatingResponse,
} from '@/types/ratings';

export const ratingAndFeedbackApi = ecommerceApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProductRatingsByProductSlug: builder.query<
      RatingResponse[],
      { productSlug: string }
    >({
      query: ({ productSlug }) => `/product-ratings/${productSlug}`,
    }),
    getProductFeedback: builder.query<
      FeedbackResponse,
      { productSlug: string }
    >({
      query: ({ productSlug }) => `/product-feedbacks/${productSlug}`,
    }),
    createProductFeedback: builder.mutation<
      { message: string; status: number },
      CreateFeedbackRequest
    >({
      query: (feedbackData) => ({
        url: `/product-feedbacks`,
        method: 'POST',
        body: feedbackData,
      }),
    }),
    createProductRating: builder.mutation<
      { message: string; status: number },
      CreateRatingRequest
    >({
      query: (ratingData) => ({
        url: `/product-ratings`,
        method: 'POST',
        body: ratingData,
      }),
    }),
    deleteProductFeedback: builder.mutation({
      query: ({ feedbackId }) => ({
        url: `/product-feedbacks/${feedbackId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductRatingsByProductSlugQuery,
  useGetProductFeedbackQuery,
  useCreateProductFeedbackMutation,
  useLazyGetProductFeedbackQuery,
  useCreateProductRatingMutation,
  useDeleteProductFeedbackMutation,
} = ratingAndFeedbackApi;
