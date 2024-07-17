import { ecommerceApi } from '@/redux/api';
import { ProductResponse } from '@/libs/difinition';

export const productApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      any,
      {
        page: number;
        size: number;
        filters: { [key: string]: any };
        field?: string;
      }
    >({
      query: ({ page, size, filters, field }) => {
        // Base URL
        let queryString = `products?page=${page}&size=${size}`;

        // Append field to the query string if provided
        if (field) {
          queryString += `&field=${encodeURIComponent(field)}`;
        }

        // Append each filter to the query string
        if (filters) {
          queryString +=
            '&' +
            Object.entries(filters)
              .map(
                ([key, value]) =>
                  `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
              )
              .join('&');
        }

        return queryString;
      },
    }),

    getAllProducts: builder.query<any, void>({
      query: () => `products`,
    }),

    getProductBySlug: builder.query<any, string>({
      query: (slug) => `products/${slug}`,
    }),
    getProductByProfile: builder.query<any, { page: number; pageSize: number }>(
      {
        query: ({ page = 1, pageSize = 10 }) =>
          `/products/?page=${page}&page_size=${pageSize}`,
      }
    ),
    createProduct: builder.mutation<any, { newProduct: object }>({
      query: ({ newProduct }) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
    }),

    updateProduct: builder.mutation<
      any,
      { id: number; updatedProduct: object }
    >({
      query: ({ id, updatedProduct }) => ({
        url: `products/${id}/`,
        method: 'PATCH',
        body: updatedProduct,
      }),
    }),
    deleteProduct: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `products/${id}/`,
        method: 'DELETE',
      }),
    }),
    getMyProducts: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page = 1, pageSize = 10 }) =>
        `/products/my_products/?page=${page}&page_size=${pageSize}`,
    }),
    getProductImages: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page = 1, pageSize = 10 }) =>
        `file/product/?page=${page}&page_size=${pageSize}`,
    }),
    getCategoryImages: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page = 1, pageSize = 10 }) =>
        `file/icon/?page=${page}&page_size=${pageSize}`,
    }),
    uploadImage: builder.mutation<any, { data: object }>({
      query: ({ data }) => ({
        url: 'file/product/',
        method: 'POST',
        body: data,
      }),
    }),
    uploadCategoryImage: builder.mutation<any, { data: object }>({
      query: ({ data }) => ({
        url: 'file/icon/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetMyProductsQuery,
  useGetProductImagesQuery,
  useGetCategoryImagesQuery,
  useUploadImageMutation,
  useUploadCategoryImageMutation,
  useGetAllProductsQuery,
} = productApi;
