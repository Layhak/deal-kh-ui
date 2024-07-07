import { ecommerceApi } from '@/redux/api';
import {
  RatingResponse,
  FeedbackResponse,
  CreateFeedbackRequest,
  CreateRatingRequest, // Add this line
} from '@/types/ratings';

export const ratingAndFeedbackApi = ecommerceApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProductRatings: builder.query<RatingResponse[], void>({
      query: () => `/product-ratings`,
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
  }),
});

export const {
  useGetAllProductRatingsQuery,
  useGetProductFeedbackQuery,
  useCreateProductFeedbackMutation,
  useLazyGetProductFeedbackQuery,
  useCreateProductRatingMutation, // Add this line
} = ratingAndFeedbackApi;
