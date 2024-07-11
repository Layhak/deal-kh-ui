// types/productScrape.ts
export interface ScrapedProduct {
    name: string;
    description: string | null;
    price: number;
    image: string;
    discountPercentage: number;
    rating: number;
    url: string;
  }
  
  export interface ScrapedProductPayload {
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
  }
  
  export interface ScrapedProductResponse {
    payload: ScrapedProductPayload;
    message: string;
    status: number;
  }
  