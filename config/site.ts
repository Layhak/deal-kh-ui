export const siteConfig = {
  name: 'Deal Kh',
  description:
    'Find the best deals, coupons, and promotions from shops in Cambodia. Save big on your shopping with exclusive offers and discounts at DealKH.',
  navItems: [
    { label: 'Home', href: '/', tooltip: 'Go to Home Page' },
    { label: 'Deal', href: '/deal', tooltip: 'Go to Discount Page' },
    { label: 'Shop', href: '/shop', tooltip: 'Go to Shop Page' },
    { label: 'About', href: '/about', tooltip: 'Go to About Page' },
    { label: 'Policy', href: '/policy', tooltip: 'Go to Policy Page' },
  ],
  footerItems: [
    { label: 'Home', href: '/' },
    { label: 'Deal', href: '/deal' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
  ],
  featureItems: [
    { label: 'Cart', href: '/cart' },
    { label: 'Wishlist', href: '/wishlist' },
  ],
  metadata: {
    title: 'Dealkh Istad',
    description:
      'Find the best deals, coupons, and promotions from shops in Cambodia. Save big on your shopping with exclusive offers and discounts at DealKH.',
    keywords: ['Dealkh', 'Deal kh', 'Deal-kh', 'dealkh istad', 'dealkh-istad'],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://www.dealkh.istad.co/',
      title: 'Istad DealKH | Platform for Cambodian Deals',
      description:
        'Discover the latest deals, coupons, and promotions from shops in Cambodia at DealKH. Save on your shopping with our curated list of discounts and offers.',
      images: [
        {
          url: process.env.NEXT_PUBLIC_LOGO_URL + 'banner.png',
          width: 1200,
          height: 630,
          alt: 'DealKH Logo Ecommerce Website',
        },
        // { url: process.env.NEXT_PUBLIC_LOGO_URL + 'logo.png', alt: 'Exclusive Shopping Deals in Cambodia' },
      ],
      siteName: 'dealkh.istad.co',
    },
    twitter: {
      site: 'Ecommerce',
      title: 'Istad DealKH | Platform for Cambodian Deals',
      description:
        'Find the best deals, coupons, and promotions from shops in Cambodia. Save big on your shopping with exclusive offers and discounts at DealKH.',
      images: [
        {
          url: process.env.NEXT_PUBLIC_LOGO_URL + 'banner.png',
          alt: 'DealKH Logo Ecommerce Website',
        },
      ],
    },
  },
};

export type SiteConfig = typeof siteConfig;
