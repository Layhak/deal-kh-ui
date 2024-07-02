export type ShopDetail = {
    name: string;
    address: string;
    slug: string,
    description: string,
    phoneNumber: number,
    email: string,
    openAt: string,
    closeAt: string,
    shopType: string,
    // location: string,
    category: string,
    open: string,
    imageUrl: string,
    location: {
        latitude: number;
        longitude: number;
      };
    image:[
        {
            url: string
        }
    ],
    socialMedias: [
        {
            socialName: string,
            socialLink: string,
        }
    ]
  };
