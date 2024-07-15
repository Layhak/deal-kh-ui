import { ecommerceApi } from '@/redux/api';

export const verifyApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyUser: builder.query<any, { token: string }>({
      query: ({ token }) => ({
        url: `auth/verify?token=${token}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useVerifyUserQuery } = verifyApi;
