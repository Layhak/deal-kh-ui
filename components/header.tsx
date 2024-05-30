"use client";
import NextLink from 'next/link';
import { BackIcon } from './icons';
import { NavbarContent } from '@nextui-org/react';
import { ThemeSwitch } from './theme-switch';

const Header = () => {
    return (
        <div className="header pl-4 text-lg text-orange-500">
            <div className="flex gap-4">
                <NextLink href="/">
                    <BackIcon />
                </NextLink>
                <h1>Overview</h1>
            </div>
            
            
                <ThemeSwitch />

            
            <style jsx>{`
          .header {
            background-color: bg-gray-100 ;
            padding-left: 12px;
            padding-top: 2px;
          }
          h1 {
            margin: 0;
          }
        `}</style>
        </div>
    );
};

export default Header;
