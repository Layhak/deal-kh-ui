import { ecommerceApi } from '@/redux/api';
import { ProductResponse } from '@/libs/difinition';

export const discountTypesApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiscountTypes: builder.query<any, void>({
      query: () => `discount-types`,
    }),
  }),
});

export const { useGetDiscountTypesQuery, useLazyGetDiscountTypesQuery } =
  discountTypesApi;
