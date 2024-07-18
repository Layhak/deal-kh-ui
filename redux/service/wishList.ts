import { ecommerceApi } from '@/redux/api';
import { WishiList } from '@/types/wishList';

export const wishListApi = ecommerceApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({

    getAllWishList: builder.query<any, void>({
        query: () => `/wishlists/me`,
      }),

    // add wishlist to cart
    createWishList: builder.mutation<
      { message: string; status: number },
      WishiList
    >({
      query: (wishListData) => ({
        url: `/wishlists`,
        method: 'POST',
        body: wishListData,
      }),
    }),

    // delete wishlist from the cart
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
  useGetAllWishListQuery
} = wishListApi;
