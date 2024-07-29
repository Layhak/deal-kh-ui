export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Deal Kh',
  description:
    'Best ecommerce platform for your business needs with a modern design and easy to use.',
  navItems: [
    {
      label: 'Home',
      href: '/',
      tooltip: 'Go to Home Page',
    },
    {
      label: 'Deal',
      href: '/deal',
      tooltip: 'Go to Discount Page',
    },
    {
      label: 'Shop',
      href: '/shop',
      tooltip: 'Go to Shop Page',
    },
    {
      label: 'About',
      href: '/about',
      tooltip: 'Go to About Page',
    },
    {
      label: 'Policy',
      href: '/policy',
      tooltip: 'Go to Policy Page',
    },
  ],
  footerItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Deal',
      href: '/deal',
    },
    {
      label: 'Shop',
      href: '/shop',
    },
    {
      label: 'About',
      href: '/about',
    },
  ],
  featureItems: [
    {
      label: 'Cart',
      href: '/cart',
    },
    {
      label: 'Wishlist',
      href: '/wishlist',
    },
  ],
};
