export type Banner = {
  bannerType: string;
  description: string;
  expiredAt: string;
  image: string;
  isExpired: boolean;
  name: string;
  shopLink: string;
  uuid: string;
};

export type BannerResponse = {
  payload: Banner[];
  message: string;
  status: number;
};
