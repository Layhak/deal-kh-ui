export type FormDataRegister = {
  email: string;
  password1: string;
  password2: string;
  firstName: string;
  lastName: string;
};
export type FormDataCreate = {
  category: {
    name: string;
    icon: string;
  };
  name: string;
  desc: string;
  image?: string;
  price: string;
  quantity: string;
};
export type FormDataUpdate = {
  readonly id: number;
  category: { name: any };
  name: string;
  desc: string;
  image?: string;
  price: string;
  quantity: string;
  seller: string;
  fileProduct: any;
};

export type ImageType = {
  id: number;
  name: string;
  image: string;
};

export type ProductType = {
  category: {
    name: string;
    icon: string;
  };
  name: string;
  price: number;
  quantity: number;
  desc: string;
  image: string;
};

export type Image = {
  url: string;
};

export type ImageResponse = {
  url: string;
};

export type CartProductType = {
  seller: string;
  images: Image[];
  name: string;
  ratingCount: number;
  slug: string;
  price: number;
  discountPrice: number;
  ratingAvg: number;
  description: string;
  shop: string;
  discountValue: number;
  discountType: string;
  expiredAt: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  quantity?: number | 0;
};

export type ShopResponse = {
  profile: string;
  name: string;
  slug: string;
  address: string;
  description: string;
  phoneNumber: string;
  email: string;
  isDeleted: boolean;
  isDisabled: boolean;
  openAt: string;
  closeAt: string;
  shopType: string;
  images: ImageResponse[];
  owners: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};

export type Payload = {
  list: CartProductType[];
  pagination: Pagination;
};

export type ShopPayload = {
  list: ShopResponse[];
  pagination: Pagination;
};

export type ShopsResponse = {
  payload: ShopPayload;
};

export interface Coordinates {
  lat: number;
  lng: number;
}

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

export type ApiResponse = {
  payload: Payload;
  message: string;
  status: number;
};

// types/productScrape.ts

export type ProductResponse = {
  list: CartProductType[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
};

export type ModalType = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
};
export type ModalTypeWithId = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  id: number;
};

export interface Profile {
  email: string;
  name: string;
}

// for wishlist response
export type WishListResponse = {
  uuid: string;
  productSlug: string;
  profile: string;
  productName: string;
  username: string;
  discountPercentage: string;
  description: string;
}

export const BASE_URL = 'https://store.istad.co';
