// // Define a service using a base URL and expected endpoints
// import { ecommerceApi } from '@/redux/api';

// export const userApi = ecommerceApi.injectEndpoints({
//   // The name of the slice of state that will be managed by this api
//   endpoints: (builder) => ({
//     // get all products
//     getProfile: builder.query<any, void>({
//       query: () => `users/me`,
//     }),
//   }),

  
// });
// // Export hooks for usage in components, which are
// export const { useGetProfileQuery } = userApi;



// Define a service using a base URL and expected endpoints
import { ecommerceApi } from '@/redux/api';

export const userApi = ecommerceApi.injectEndpoints({
  // The name of the slice of state that will be managed by this api
  endpoints: (builder) => ({
    // Fetch user profile
    getProfile: builder.query<any, void>({
      query: () => `users/me`, // Adjust the endpoint based on your API
    }),
    // Update user profile if needed
    updateProfile: builder.mutation<void, Partial<FormValues>>({
      query: (data) => ({
        url: `users/me`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
