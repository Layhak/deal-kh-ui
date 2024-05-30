"use client";
import NextLink from 'next/link';
import { BackIcon } from './icons';

const Header = () => {
    return (
        <div className="header pl-4 text-lg text-orange-500">
            <div className="flex gap-4">
                <NextLink href="/">
                    <BackIcon />
                </NextLink>
                <h1>Overview</h1>
            </div>
            <style jsx>{`
          .header {
            background-color: ;
            padding: 20px;
          }
          h1 {
            margin: 0;
          }
        `}</style>
        </div>
    );
};

export default Header;
