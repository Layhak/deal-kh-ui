// redux/service/productScrapeApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ScrapedProductResponse } from '@/types/productScrape';
import { ecommerceApi } from '../api';

export const productScrapeApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductScrape: builder.query<ScrapedProductResponse, { page: number; size: number }>({
      query: ({ page, size }) => `product-scrape?page=${page}&size=${size}`,
    }),
  }),
});

export const { useGetProductScrapeQuery } = productScrapeApi;
