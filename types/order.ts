// Request Payload
export type OrderRequest = {
  productSlugs: string[];
};

// Response Payload
export type OrderResponse = {
  payload: OrderPayload;
  message: string;
  status: number;
};

export type OrderPayload = {
  uuid: string;
  username: string;
  products: string[];
  date: string; // ISO 8601 date string
};
