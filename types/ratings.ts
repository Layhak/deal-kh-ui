export type RatingResponse = {
  username: string;
  productName: string;
  ratingValue: number;
  isRated: boolean;
  createdAt: string;
};

export type ShopRatingResponse = {
  payload: RatingResponse[]
};

export type FeedbackResponse = {
  payload: FeedbackItem[];
};

export type FeedbackItem = {
  uuid: string;
  profile: string;
  description: string;
  productName: string;
  username: string;
  images: { url: any }[];
};

export type CreateFeedbackRequest = {
  description: string;
  productSlug: string;
  images: { url: string }[];
};

export type CreateReportRequest = {
  description: string;
  shopSlug: string;
  images: { url: string }[];
};

export type CreateRatingRequest = {
  ratingValue: number;
  productSlug: string;
};

export type CreateShopRatingRequest = {
  ratingValue: number;
  shopSlug: string;
};
