import { ecommerceApi } from '@/redux/api';

type ImageUploadResponse = {
  payload: {
    downloadUrl: string;
    fileType: string;
    size: number;
    filename: string;
    fullUrl: string;
    description: string | null;
  }[];
  message: string;
  status: number;
};

export const imageApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImages: builder.mutation<ImageUploadResponse, FormData>({
      query: (formData) => ({
        url: '/images/multiple', // Updated endpoint
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImagesMutation } = imageApi;
