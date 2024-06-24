import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  removeAccessToken,
  setAccessToken,
} from '@/redux/feature/auth/authSlice';
import { RootState } from '@/redux/store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.accessToken));
          localStorage.setItem('loggedIn', 'loggedIn');
          localStorage.setItem('showSuccessToast', 'true');
        } catch (error) {
          // Handle error if needed
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeAccessToken());
          localStorage.removeItem('loggedIn');
        } catch (error) {
          // Handle error if needed
        }
      },
      async onCacheEntryAdded(arg, { dispatch, cacheEntryRemoved }) {
        try {
          await cacheEntryRemoved;
          dispatch(removeAccessToken());
          localStorage.removeItem('loggedIn');
        } catch (error) {
          // Handle error if needed
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = authApi;
