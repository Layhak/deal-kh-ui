import { ecommerceApi } from '@/redux/api';

export const categoryApi = ecommerceApi.injectEndpoints({
  // The name of the slice of state that will be managed by this api
  endpoints: (builder) => ({
    // get all products
    getCategory: builder.query<any, void>({
      query: () => `categories`,
    }),
    getCategoryBySlug: builder.query<any, string>({
      query: (slug) => `categories/${slug}`,
    }),
  }),
});
// Export hooks for usage in components, which are
export const { useGetCategoryQuery, useGetCategoryBySlugQuery } = categoryApi;
