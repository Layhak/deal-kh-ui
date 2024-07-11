export type Category = {
  name: string;
  slug: string;
  icon: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type CategoryResponse = {
  payload: Category[];
  message: string;
  status: number;
};
