// types/productScrape.ts
export type ScrapedProduct = {
  name: string;
  description: string | null;
  price: number;
  image: string;
  discountPercentage: number;
  rating: number;
  url: string;
};

export type ScrapedProductPayload = {
  list: ScrapedProduct[];
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

export type ScrapedProductResponse = {
  payload: ScrapedProductPayload;
  message: string;
  status: number;
};
