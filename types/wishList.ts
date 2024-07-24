// for wishlist type
export type WishiList = {
  productSlug: string;
  discountPercentage: number;
  description: string;
};

// Define the WishListItem type
export type WishListItem = {
  uuid: string;
  profile: string;
  productName: string;
  productSlug: string;
  username: string;
  discountPercentage: number;
  description: string;
  isGranted: string;
};

// Define the Pagination type
export type Pagination = {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

// Define the WishListResponsePayload type
export type WishListResponsePayload = {
  list: WishListItem[];
  pagination: Pagination;
};

export interface WishListResponse {
  message: string;
  payload: {
    list: WishListItem[];
    pagination: {
      pageSize: number;
      pageNumber: number;
      totalPages: number;
      totalElements: number;
      numberOfElements: number;
    };
  };
  status: number;
}
