import { ecommerceApi } from '@/redux/api';
import { Banner, BannerResponse } from '@/types/banner';

export const bannerApi = ecommerceApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBanners: builder.query<BannerResponse, { bannerType: string }>({
      query: ({ bannerType }) => `/banners/types?bannerType=${bannerType}`,
    }),
  }),
});

export const { useGetBannersQuery } = bannerApi;
