import { ecommerceApi } from '@/redux/api';

export const userApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get the current user's profile
    getProfile: builder.query<any, void>({
      query: () => `users/me`,
    }),
    // Upload a new profile image
    uploadProfileImage: builder.mutation<any, { profile: string }>({
      query: (profileData) => ({
        url: 'users/profile',
        method: 'POST',
        body: profileData,
      }),
    }),
    // Delete the current profile image
    deleteProfileImage: builder.mutation<any, void>({
      query: () => ({
        url: 'users/profile',
        method: 'DELETE',
      }),
    }),
    // Upload a new cover image
    uploadCoverImage: builder.mutation<any, { cover: string }>({
      query: (coverData) => ({
        url: 'users/cover',
        method: 'POST',
        body: coverData,
      }),
    }),
    // Delete the current cover image
    deleteCoverImage: builder.mutation<any, void>({
      query: () => ({
        url: 'users/cover',
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProfileQuery,
  useUploadProfileImageMutation,
  useDeleteProfileImageMutation,
  useUploadCoverImageMutation,
  useDeleteCoverImageMutation,
} = userApi;
