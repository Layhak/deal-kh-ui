export type PackageShopList = {
  name: string;
  email: string;
  created_At: string;
  owner: string;
  phone: number;
  status: string;
  action: string;
};

export type PackageReport = {
  shop_name: string;
  seller_name: string;
  location: string;
  contact: number;
  created_At: string;
  action: string;
}

export type PackageListCategories = {
  name: string;
  created_By: string;
  created_At: string;
  updated_By: string;
  updated_At: string;
  status: string;
  action: string;
}

export type PackagePromotion = {
  product_Name: string;
  discount_Type: string;
  discount_Percentage: number;
  created_At: string;
  expired_At: string;
  action: string;
}


