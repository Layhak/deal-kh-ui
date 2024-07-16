export type ProductDetail = {
  slug: string;
  images: {
    url: string;
  }[];
  seller: string;
  name: string;
  ratingCount: number;
  price: number;
  discountPrice: number;
  ratingAvg: number;
  description: string;
  shop: string;
  shopSlug: string;
  location: string;
  openAt: string;
  closeAt: string;
  discountValue: number;
  isPercentage: boolean;
  discountType: string;
  expiredAt: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  quantity?: number | 0;
};
