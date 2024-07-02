export type ShopFake = {
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  open: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

const shopFakes: ShopFake[] = [
  {
    name: 'Phnom Penh Market',
    description: 'The Phnom Penh Central Market is a large indoor market located in the heart of the city. It offers a wide variety of goods including clothes, electronics, handicrafts, and local produce.',
    imageUrl: 'https://i.pinimg.com/564x/e9/75/5a/e9755a1e7487febc402e446019e43317.jpg',
    category: 'Marketplace',
    open: '10:00AM to 05:00PM',
    location: {
      latitude: 11.562880,
      longitude: 104.917042
    }
  },
  {
    name: 'Orussey Market',
    description: 'Orussey Market is a lively outdoor market known for its wide selection of clothing, household items, and Khmer street food. It\'s a popular spot for locals and tourists alike.',
    imageUrl: 'https://i.pinimg.com/564x/8a/b3/bc/8ab3bca7c93183c4cb7429bf45d80c90.jpg',
    category: 'Marketplace',
    open: '07:00AM to 06:00PM',
    location: {
      latitude: 11.569175,
      longitude: 104.917000
    }
  },
  {
    name: 'Kandal Market',
    description: 'Kandal Market is a traditional Cambodian market selling a diverse range of goods such as fresh produce, flowers, household items, and local handicrafts. It\'s a great place to experience the local culture.',
    imageUrl: 'https://i.pinimg.com/564x/2b/a3/6c/2ba36c9de9af7b59f8fc9f305897a8e0.jpg',
    category: 'Marketplace',
    open: '06:00AM to 05:00PM',
    location: {
      latitude: 11.557401,
      longitude: 104.916111
    }
  },
  {
    name: 'Old Market',
    description: 'The Old Market is a bustling open-air market in the heart of the city, offering a wide range of local produce, handicrafts, and street food. It\'s a popular spot for both locals and tourists.',
    imageUrl: 'https://i.pinimg.com/736x/b1/54/8c/b1548c9b3b5e4b55a425269f62e215b4.jpg',
    category: 'Marketplace',
    open: '07:00AM to 06:00PM',
    location: {
      latitude: 11.560811,
      longitude: 104.917703
    }
  },
  {
    name: 'Psar Thmei',
    description: 'Psar Thmei, or the New Market, is a modern indoor market that sells a variety of goods, from clothing and electronics to local delicacies and souvenirs. It\'s a popular shopping destination for both locals and visitors.',
    imageUrl: 'https://i.pinimg.com/736x/1f/b8/fd/1fb8fd84b470337ee9e55ce2877de7b0.jpg',
    category: 'Marketplace',
    open: '07:00AM to 06:00PM',
    location: {
      latitude: 11.561467,
      longitude: 104.918956
    }
  },
  {
    name: 'Russian Market',
    description: 'The Russian Market, also known as Tuol Tompoung Market, is a vibrant outdoor market that sells a wide range of goods, from clothes and handicrafts to electronics and local produce. It\'s a popular spot for bargain hunting.',
    imageUrl: 'https://i.pinimg.com/736x/34/95/d9/3495d94cd00d6ad379eefd86063276a7.jpg',
    category: 'Marketplace',
    open: '07:00AM to 06:00PM',
    location: {
      latitude: 11.554958,
      longitude: 104.920923
    }
  },
  {
    name: 'Boeung Keng Kang Market',
    description: 'Boeung Keng Kang Market, or BKK Market, is a modern indoor market that offers a diverse selection of goods, including clothing, electronics, household items, and local delicacies. It\'s a popular shopping destination for both locals and tourists.',
    imageUrl: 'https://i.pinimg.com/736x/59/c9/95/59c995f893201ce2fb25beaba03cfe8b.jpg',
    category: 'Marketplace',
    open: '07:00AM to 06:00PM',
    location: {
      latitude: 11.550422,
      longitude: 104.922607
    }
  },
  {
    name: 'Chbar Ampov Market',
    description: 'Chbar Ampov Market is a lively outdoor market located in the southern part of Phnom Penh. It offers a wide variety of local produce, street food, and handicrafts, providing a glimpse into the daily life of the local community.',
    imageUrl: 'https://i.pinimg.com/736x/a9/ea/94/a9ea94a83f21591aafa4eb3eedd522ef.jpg',
    category: 'Marketplace',
    open: '06:00AM to 05:00PM',
    location: {
      latitude: 11.545900,
      longitude: 104.927412
    }
  },
  {
    name: 'Samaki Market',
    description: 'Samaki Market is a traditional Cambodian market that specializes in fresh seafood, meat, and local produce. It\'s a popular destination for both locals and visitors who want to experience authentic Khmer cuisine.',
    imageUrl: 'https://i.pinimg.com/736x/19/cf/06/19cf067ca7d605efe2d9140ab49f13ec.jpg',
    category: 'Marketplace',
    open: '07:00AM to 05:00PM',
    location: {
      latitude: 11.557844,
      longitude: 104.915033
    }
  },
  {
    name: 'Central Market Annex',
    description: 'The Central Market Annex is a smaller, more specialized market located adjacent to the Phnom Penh Central Market. It focuses on selling a wide range of local handicrafts, souvenirs, and artisanal products.',
    imageUrl: 'https://i.pinimg.com/736x/3f/35/f8/3f35f88fd8a1c6e07360e5170f36033d.jpg',
    category: 'Marketplace',
    open: '07:00AM to 06:00PM',
    location: {
      latitude: 11.563544,
      longitude: 104.917467
    }
  }
];

export default shopFakes;