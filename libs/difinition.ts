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

export type CartProductType = {
  id: number;
  name: string;
  image: string;
  shop_name: string;
  expired_at: string;
  original_price: number;
  discount_price: number;
  discount: number;
  description: string;
  category: string;
  onClick?: () => void;
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
