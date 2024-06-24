// couponDetail.ts

export type CouponDetail = {
  id: number;
  images: string[];
  name: string;
  duration: string;
  location: string;
  contact: string;
  type: string;
};

export const couponDetail: CouponDetail[] = [
  {
    id: 1,
    images: [
      "https://as1.ftcdn.net/v2/jpg/02/91/67/60/1000_F_291676069_ZBjqhpjsPBprZlfjmbOTt4zebYG5gGq5.jpg",
      "https://as2.ftcdn.net/v2/jpg/03/05/13/85/1000_F_305138528_x4wL6ODkV9DbEf8UF2lnwzwNQtGzw6rj.jpg"
    ],
    name: "Example Coupon 1",
    duration: "July 2024",
    location: "Example City 1",
    contact: "+1 234 567 890",
    type: "Discount"
  },
  {
    id: 2,
    images: [
      "https://as1.ftcdn.net/v2/jpg/02/91/67/62/1000_F_291676248_IuE3mdvCI2vKNRw1tsBqRVvmMvFAE8hN.jpg",
      "https://as1.ftcdn.net/v2/jpg/02/91/67/62/1000_F_291676254_0OPBGYugiXq8GVLW69Etyj98yXlfvZxm.jpg"
    ],
    name: "Example Coupon 2",
    duration: "August 2024",
    location: "Example City 2",
    contact: "+1 345 678 901",
    type: "Free Item"
  },
  {
    id: 3,
    images: [
      "https://as2.ftcdn.net/v2/jpg/02/91/67/83/1000_F_291678347_ldV3Fs2UXsVMe1fpkoTcluIjNh65z6ya.jpg",
      "https://as2.ftcdn.net/v2/jpg/02/91/67/63/1000_F_291676387_QctpTEs8irjtBdaDFP3tirEMLDuCsQc9.jpg"
    ],
    name: "Example Coupon 3",
    duration: "September 2024",
    location: "Example City 3",
    contact: "+1 456 789 012",
    type: "Buy One Get One"
  },
  {
    id: 4,
    images: [
      "https://as1.ftcdn.net/v2/jpg/03/05/13/86/1000_F_305138615_3S2eG484NTtMRupLZB4odKxboyBqhVbb.jpg",
      "https://as1.ftcdn.net/v2/jpg/03/05/13/86/1000_F_305138640_LuY2pqN2NfQmVwA5nh4oFdIZxoYQL5HW.jpg"
    ],
    name: "Example Coupon 3",
    duration: "September 2024",
    location: "Example City 3",
    contact: "+1 456 789 012",
    type: "Buy One Get One"
  },
  {
    id: 5,
    images: [
      "https://as2.ftcdn.net/v2/jpg/02/91/67/61/1000_F_291676143_GtsMEfoFeRQADmmeLg7MSiOxYE1ET9hZ.jpg",
      "https://as2.ftcdn.net/v2/jpg/02/91/67/61/1000_F_291676143_GtsMEfoFeRQADmmeLg7MSiOxYE1ET9hZ.jpg"
    ],
    name: "Example Coupon 3",
    duration: "September 2024",
    location: "Example City 3",
    contact: "+1 456 789 012",
    type: "Buy One Get One"
  },
  {
    id: 6,
    images: [
      "https://as2.ftcdn.net/v2/jpg/02/91/67/65/1000_F_291676535_WzMlxsrQh8Ww7V04HvR5owHArtWcZkuv.jpg",
      "https://as1.ftcdn.net/v2/jpg/02/91/67/64/1000_F_291676443_ySCyhA0jymmsq3JXHEy315ohKA3HfW3T.jpg"
    ],
    name: "Example Coupon 1",
    duration: "July 2024",
    location: "Example City 1",
    contact: "+1 234 567 890",
    type: "Discount"
  },
  {
    id: 7,
    images: [
      "https://as2.ftcdn.net/v2/jpg/02/91/67/59/1000_F_291675907_a42y1cNQP2VRH2t5nNoVZsmkshVrHwVh.jpg",
      "https://as2.ftcdn.net/v2/jpg/02/91/67/59/1000_F_291675907_a42y1cNQP2VRH2t5nNoVZsmkshVrHwVh.jpg"
    ],
    name: "Example Coupon 2",
    duration: "August 2024",
    location: "Example City 2",
    contact: "+1 345 678 901",
    type: "Free Item"
  },
  {
    id: 8,
    images: [
      "https://as1.ftcdn.net/v2/jpg/02/91/67/60/1000_F_291676097_ycnF7xaUPfzSMWp6X8v94EOvWgtI9Szx.jpg",
      "https://as1.ftcdn.net/v2/jpg/02/91/67/60/1000_F_291676097_ycnF7xaUPfzSMWp6X8v94EOvWgtI9Szx.jpg"
    ],
    name: "Example Coupon 3",
    duration: "September 2024",
    location: "Example City 3",
    contact: "+1 456 789 012",
    type: "Buy One Get One"
  }
];

