'use client';
import React, { useEffect, useState } from 'react';
import { Chip, Navbar, NavbarContent, ScrollShadow } from '@nextui-org/react';
import { useGetCategoryQuery } from '@/redux/service/category';
import { CategoryType } from '@/types/category';
import NextLink from 'next/link';

export default function Filter() {
  const { data, isLoading, error } = useGetCategoryQuery();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <Navbar
      position="sticky"
      maxWidth={'xl'}
      className={`top-16 z-30 transition-all duration-700 ${
        showNavbar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <ScrollShadow
        size={100}
        hideScrollBar
        orientation={'horizontal'}
        className="h-[30px] w-full space-x-5"
      >
        <NavbarContent className="flex items-center gap-1">
          {data?.payload.map((category: CategoryType) => (
            <NextLink
              key={category.slug}
              href={`/${category.name.toLowerCase()}`}
            >
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
