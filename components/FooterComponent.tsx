import { Divider, Image, Link, Spacer } from '@nextui-org/react';
import React from 'react';
import { Icon } from '@iconify/react';
import { siteConfig } from '../config/site';

const navigation = [
  {
    name: 'Facebook',
    href: '#',
    icon: <Icon icon={'bi:facebook'} width={20} height={20} />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: <Icon icon={'mdi:instagram'} width={20} height={20} />,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: <Icon icon={'pajamas:twitter'} width={20} height={20} />,
  },
  {
    name: 'Gmail',
    href: '#',
    icon: <Icon icon={'mdi:gmail'} width={20} height={20} />,
  },
];

function FooterComponent() {
  return (
    <footer className="mt-10 bg-foreground-50 ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-5">
        <div className="py-5 md:flex md:justify-between md:py-10  ">
          <div className="mb-6  md:mb-0 ">
            <h1 className={`mb-5 text-2xl font-semibold text-foreground`}>
              Our Sponsors
            </h1>
            <div className={'grid  grid-cols-2 gap-4 '}>
              <Link href="https://mptc.gov.kh/" className="flex items-center">
                <Image
                  width={150}
                  src="/images/sponsor1.png"
                  alt="FlowBite Logo"
                />
              </Link>
              <Link href="https://cbrd.gov.kh/" className="flex items-center">
                <Image
                  width={150}
                  src="/images/sponsor2.png"
                  alt="FlowBite Logo"
                />
              </Link>
            </div>
          </div>
          <div className="grid min-w-[60%] grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase  text-foreground">
                Page Links
              </h2>
              <ul className="font-medium text-foreground ">
                {siteConfig.footerItems.map((item) => (
                  <li key={item.label} className="mb-4 flex items-center gap-2">
                    <Link
                      href={item.href}
                      className="space-y-2  text-foreground-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase  text-foreground">
                Features
              </h2>
              <ul className="font-medium text-foreground ">
                {siteConfig.featureItems.map((item) => (
                  <li key={item.label} className="mb-4 flex items-center gap-2">
                    <Link
                      href={item.href}
                      className="space-y-2  text-foreground-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-foreground ">
                Legal
              </h2>
              <ul className="font-medium text-foreground ">
                <li className="mb-4">
                  <Link
                    href="/policy"
                    className="text-foreground-500  hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policy"
                    className="text-foreground-500  hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-foreground ">
                Social Links
              </h2>
              <ul className="font-medium text-foreground ">
                {navigation.map((item) => (
                  <li key={item.href} className="mb-4 flex items-center gap-2">
                    {item.icon}
                    <Link
                      href={item.href}
                      className="space-y-2  text-foreground-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Spacer y={10} />
        <Divider className={'  bg-gradient-to-r from-pink-500 to-yellow-500'} />
        <Spacer y={5} />
        <div className="flex items-center justify-center">
          <p className="text-sm text-foreground-800  sm:text-center">
            © 2024 Copyright DealKh by{' '}
            <Link
              href="https://www.istad.co/"
              className="text-blue-700  hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent"
              target={'_blank'}
            >
              ISTAD.
            </Link>
            <span className={'block text-center sm:inline-block'}>
              All Rights Reserved.™
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
