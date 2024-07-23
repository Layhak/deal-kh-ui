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
        base: 'bg-default-50/50',
        menu: 'bg-default-50/50',
      }}
    >
      <ScrollShadow
        size={20}
        hideScrollBar
        orientation={'horizontal'}
        className="h-[30px] w-full space-x-5"
      >
        <NavbarContent className="flex items-center gap-1">
          {data?.payload.map((category: Category) => (
            <NextLink key={category.slug} href={`/category/${category.slug}`}>
              <Chip
                classNames={{
                  base: 'bg-gradient-to-r from-pink-500 to-yellow-500 cursor-pointer',
                  content: 'drop-shadow text-white',
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
