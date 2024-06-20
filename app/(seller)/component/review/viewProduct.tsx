import React from 'react';
import { AiOutlineProduct } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { TbRosetteDiscount } from "react-icons/tb";

const CardViewProduct = () => { 
  return (
   <div className="flex gap-8">
    <div className="bg-white rounded-lg dark:bg-zinc-900 flex items-center p-4 w-64 ">
      <div className="mr-4 border-2 p-2 rounded-full border-warning">
      <AiOutlineProduct className="w-7 h-7 dark:text-gray-200" />
      </div>
      <div>
        <h3 className="text-lg font-medium dark:text-gray-200 text-black">All Products</h3>
        <p className="text-lg text-black dark:text-gray-200">345</p>
      </div>
    </div>
    <div className="bg-white rounded-lg dark:bg-zinc-900 flex items-center p-4 w-64 ">
      <div className="mr-4 border-2 p-2 rounded-full border-warning">
      <BiCategory className="w-7 h-7 dark:text-gray-200" />
      </div>
      <div>
        <h3 className="text-lg font-medium dark:text-gray-200 text-black">All Categorys</h3>
        <p className="text-lg text-black dark:text-gray-200">234</p>
      </div>
    </div>
    <div className="bg-white rounded-lg dark:bg-zinc-900 flex items-center p-4 w-64 ">
      <div className="mr-4 border-2 border-warning p-2 rounded-full">
      <TbRosetteDiscount   className="w-7 h-7 dark:text-gray-200" />
      </div>
      <div>
        <h3 className="text-lg font-medium dark:text-gray-200 text-black">All Promotions</h3>
        <p className="text-lg text-black dark:text-gray-200">123</p>
      </div>
    </div>
   </div>
    
  );
};

export default CardViewProduct;
