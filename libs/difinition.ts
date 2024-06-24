export type FormDataRegister = {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
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

export type CartProductType = {
  seller: string;
  name: string;
  slug: string;
  price: number;
  discountPrice: number;
  ratingAvg: number;
  description: string;
  images: Image[];
  shop: string;
  discountValue: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updateBy: string | null;
  onClick?: () => void;
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

export const BASE_URL = 'https://store.istad.co';
