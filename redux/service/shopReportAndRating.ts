import { ecommerceApi } from '@/redux/api';
import {
  CreateFeedbackRequest,
  CreateRatingRequest,
  CreateReportRequest,
  CreateShopRatingRequest,
  FeedbackResponse,
  RatingResponse,
  ShopRatingResponse,
} from '@/types/ratings';

export const shopRatingReportApi = ecommerceApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getShopRatingByShopSlug: builder.query<
    ShopRatingResponse,
      { shopSlug: string }
    >({
      query: ({ shopSlug }) => `/shop-ratings/${shopSlug}`,
    }),

    getShopReportBySlug: builder.query<
      FeedbackResponse,
      { shopSlug: string }
    >({
      query: ({ shopSlug }) => `/shop-reports/${shopSlug}`,
    }),

    createShopReport: builder.mutation<
      { message: string; status: number },
      CreateReportRequest
    >({
      query: (feedbackData) => ({
        url: `/shop-reports`,
        method: 'POST',
        body: feedbackData,
      }),
    }),

    createShopRating: builder.mutation<
      { message: string; status: number },
      CreateShopRatingRequest
    >({
      query: (ratingData) => ({
        url: `/shop-ratings`,
        method: 'POST',
        body: ratingData,
      }),
    }),

    deleteShopReport: builder.mutation({
      query: ({ feedbackId }) => ({
        url: `/shop-reports/${feedbackId}`,
        method: 'DELETE',
      }),
    }),

    deleteShopRating: builder.mutation({
      query: ({ shopSlug }) => ({
        url: `/shop-ratings/${shopSlug}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetShopRatingByShopSlugQuery,
  useGetShopReportBySlugQuery,
  useCreateShopReportMutation,
  useCreateShopRatingMutation,
  useDeleteShopRatingMutation,
  useLazyGetShopReportBySlugQuery,
  useDeleteShopReportMutation,
} = shopRatingReportApi;
