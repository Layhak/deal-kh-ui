// Define a service using a base URL and expected endpoints
import { ecommerceApi } from '@/redux/api';

export const shopApi = ecommerceApi.injectEndpoints({
  // The name of the slice of state that will be managed by this api
  endpoints: (builder) => ({
    // get all products
    getShops: builder.query<
      any,
      { page: number; size: number }
    >({
      query: ({ page, size }) =>
        `shops?page=${page}&size=${size}`,
    }),

    getAllShops: builder.query<any, void>({
      query: () => `shops`,
    }),

    // get single product
    getShopById: builder.query<any, number>({
      query: (id) => `shops/${id}/`,
    }),
    
  }),
});
// Export hooks for usage in components, which are
export const {
  useGetShopsQuery,
  useGetShopByIdQuery,
  useLazyGetShopByIdQuery,
} = shopApi;
