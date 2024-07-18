export type ShopType = {
  name: string;
  slug: string;
  icon: string | null;
};

export type ShopTypesResponse = {
  payload: {
    list: ShopType[];
  };
};
