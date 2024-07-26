'use client';
import React, { useEffect, useState } from 'react';
import { Chip, Navbar, NavbarContent, ScrollShadow } from '@nextui-org/react';
import { useGetCategoryQuery } from '@/redux/service/category';
import NextLink from 'next/link';
import { Category } from '@/types/category';
import { usePathname } from 'next/navigation';

export default function FilterCategory() {
  const { data, isLoading, error } = useGetCategoryQuery();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  const pathnameLists = ['/about', '/policy', '/wishlist', '/cart'];
  return (
    <Navbar
      position="sticky"
      maxWidth={'xl'}
      className={` top-28 z-30 transition-all duration-700 sm:top-16 ${
        showNavbar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }
      ${pathnameLists.includes(pathname) ? 'hidden' : ''}
      `}
      classNames={{
        base: 'bg-default-50/80 backdrop-blur-md	',
        menu: 'bg-default-50/80 backdrop-blur-md	',
      }}
    >
      <ScrollShadow
        size={20}
        hideScrollBar
        orientation={'horizontal'}
        className="h-[30px] w-full space-x-5"
      >
        <NavbarContent className="flex items-center gap-2">
          {data?.payload.map((category: Category) => (
            <NextLink key={category.slug} href={`/category/${category.slug}`}>
              <Chip
                color={'default'}
                variant="bordered"
                classNames={{
                  // base: 'bg-gradient-to-r from-pink-500 to-yellow-500 cursor-pointer',
                  base:
                    pathname === `/category/${category.slug}`
                      ? 'bg-gradient-to-r from-pink-500 to-yellow-500 cursor-pointer'
                      : ' cursor-pointer  ring-foreground-200 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-700 ',
                  content:
                    pathname === `/category/${category.slug}`
                      ? 'drop-shadow text-gray-50'
                      : 'drop-shadow text-foreground',
                }}
              >
                {category.name}
              </Chip>
            </NextLink>
          ))}
        </NavbarContent>
      </ScrollShadow>
    </Navbar>
  );
}
