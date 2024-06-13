// components/CategoryButton.tsx
import React from 'react';
import { CategoryIcon } from './icons';
import Link from 'next/link';

interface CategoryButtonProps {
    categories: string[];
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ categories }) => {
    
    const half = Math.ceil(categories.length / 2);
    const firstColumn = categories.slice(0, half);
    const secondColumn = categories.slice(half);

    return (
        <div className="relative inline-block text-left group">
            <button className="inline-flex justify-center w-full rounded-md border border-gray px-4 py-2 dark:bg-black dark:border-gray-100 dark:text-white bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warning transition-all duration-300 ease-in-out">
                <CategoryIcon />
            </button>
            <div className="mt-1 origin-top-left absolute left-0 w-[600px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:grid grid-cols-2 gap-4 ">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <h1 className="text-center text-gray text-warning py-2">Product</h1>
                    {firstColumn.map((category, index) => (
                        <Link key={index} href={`/category/${encodeURIComponent(category.toLowerCase())}`} passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-warning hover:text-white transition-all ease-in-out" role="menuitem">
                            
                                {category}
                            
                        </Link>
                    ))}
                </div>
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <h1 className="text-center text-gray text-warning py-2">Promotion</h1>
                    {secondColumn.map((category, index) => (
                        <Link key={index} href={`/category/${encodeURIComponent(category.toLowerCase())}`} passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-warning hover:text-white transition-all duration-300 ease-in-out" role="menuitem">
                        
                                {category}
                            
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryButton;
