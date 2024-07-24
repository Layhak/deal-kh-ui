import { ecommerceApi } from '@/redux/api';
import { WishiList, WishListResponse } from '@/types/wishList';

export const wishListApi = ecommerceApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllUserWishList: builder.query<
      WishListResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `/wishlists/me?page=${page}&size=${size}`,
    }),
    createWishList: builder.mutation<
      { message: string; status: number },
      WishiList
    >({
      query: (wishListData) => ({
        url: '/wishlists',
        method: 'POST',
        body: wishListData,
      }),
    }),
    deleteWishList: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/wishlists/${uuid}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateWishListMutation,
  useDeleteWishListMutation,
  useGetAllUserWishListQuery,
  useLazyGetAllUserWishListQuery,
} = wishListApi;
