// Define a service using a base URL and expected endpoints
import { ecommerceApi } from '@/redux/api';

export const userApi = ecommerceApi.injectEndpoints({
  // The name of the slice of state that will be managed by this api
  endpoints: (builder) => ({
    // get all products
    getProfile: builder.query<any, void>({
      query: () => `users/me`,
    }),
  }),
});
// Export hooks for usage in components, which are
export const { useGetProfileQuery } = userApi;
