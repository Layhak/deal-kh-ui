import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/redux/store';
import { setAccessToken } from '@/redux/feature/auth/authSlice'; //
//
// Setting up prepareHeaders to include the token in the headers
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_DEALKH_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log('Token from prepareHeaders', token);
    // if we have a token, let's set the authorization header
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// args: for the request details // api: for Redux api object // extraOptions: for additional
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  // check result of each query. if it's a 401, we'll try to re-authenticate
  console.log('args from baseQueryWithReAuth', args);
  console.log('api from baseQueryWithReAuth', api);
  console.log('extraOptions from baseQueryWithReAuth', extraOptions);
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    const res = await fetch('http://localhost:3000/api/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      api.dispatch(setAccessToken(data.accessToken));
      // re-run the query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      const res = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
    }
  }
  return result;
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const ecommerceApi = createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});

// Setting up prepareHeaders to include the token in the headers
// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_DJANGO_API_URL,
//   prepareHeaders: async (headers, { getState }) => {
//     const session = await getSession();
//     // if we have a token, let's set the authorization header
//     if (session) {
//       headers.set('authorization', `Bearer ${session?.user?.id}`);
//     }
//     return headers;
//   },
// });
//
// // args: for the request details // api: for Redux api object // extraOptions: for additional
// const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
//   const result = await baseQuery(args, api, extraOptions);
//   if (result?.error?.status === 401) {
//     const session = await getSession();
//     console.log('sessionapi', session);
//     if (session) {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_DJANGO_API_URL}token/refresh/`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ refresh: session?.user?.name }),
//         }
//       );
//       const resultResponse = await response.json();
//       console.log('resultResponse', resultResponse);
//       if (resultResponse?.access) {
//         console.log('refresh token success');
//         const refreshedResult = await fetchBaseQuery({
//           baseUrl: process.env.NEXT_PUBLIC_DJANGO_API_URL,
//           prepareHeaders: async (headers) => {
//             const session = await getSession();
//             console.log('after refreshed', session);
//             if (session) {
//               headers.set('authorization', `Bearer ${resultResponse.access}`);
//             }
//             return headers;
//           },
//         })(args, api, extraOptions);
//         return refreshedResult;
//       } else {
//         console.error('refresh token failed');
//         return result;
//       }
//     }
//   }
//   return result;
// };
//
// // initialize an empty api service that we'll inject endpoints into later as needed
// export const ecommerceApi = createApi({
//   reducerPath: 'ecommerceApi',
//   baseQuery: baseQueryWithReAuth,
//   endpoints: () => ({}),
// });
