import { ecommerceApi } from '@/redux/api';
import { OrderRequest, OrderResponse } from '@/types/order';

export const orderApi = ecommerceApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Define the getOrderByUuid query with the appropriate response type
    getOrderByUuid: builder.query<OrderResponse, void>({
      query: () => `/orders`,
    }),

    // Define the OrderProduct mutation with the appropriate request and response types
    OrderProduct: builder.mutation<OrderResponse, OrderRequest>({
      query: (orderRequest) => ({
        url: '/orders',
        method: 'POST',
        body: orderRequest,
      }),
    }),

    // Define the deleteOrder mutation with the appropriate response type
    deleteOrder: builder.mutation<void, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/orders/${uuid}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useOrderProductMutation,
  useDeleteOrderMutation,
  useGetOrderByUuidQuery,
} = orderApi;
