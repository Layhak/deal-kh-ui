import React from 'react';
import { AiOutlineException } from "react-icons/ai";
import { VscRequestChanges } from "react-icons/vsc";
import { FaRegHeart } from "react-icons/fa6";
import { RiPassExpiredLine } from "react-icons/ri";

const CardWishlistPromotion = () => { 
  return (
   <div className="flex gap-8">
     <div className="bg-white w-72 dark:bg-zinc-900 rounded-lg flex items-center p-4 ">
      <div className="mr-6 border-2 p-2 rounded-full border-warning">
        <FaRegHeart className="w-7 h-7 dark:text-gray-200" />
      </div>
      <div>
        <h3 className="text-lg pb-1 font-medium dark:text-gray-200 text-black">All Wishlists</h3>
        <p className="text-lg text-black dark:text-gray-200">354</p>
      </div>
    </div>
    <div className="bg-white rounded-lg dark:bg-zinc-900  flex items-center p-4 w-72 ">
      <div className="mr-6 border-2 p-2 rounded-full border-warning">
      <AiOutlineException  className="w-7 h-7 dark:text-gray-200" />
      </div>
      <div>
        <h3 className="text-lg pb-1 font-medium dark:text-gray-200 text-black">Total accepted</h3>
        <p className="text-lg text-black dark:text-gray-200">24</p>
      </div>
    </div>
    <div className="bg-white rounded-lg dark:bg-zinc-900 flex items-center p-4 w-72 ">
      <div className="mr-6 border-2 border-warning p-2 rounded-full">
      <RiPassExpiredLine   className="w-7 h-7 dark:text-gray-200" />
      </div>
      <div>
        <h3 className="text-lg pb-1 font-medium dark:text-gray-200 text-black">Total expired</h3>
        <p className="text-lg text-black dark:text-gray-200">04</p>
      </div> 
    </div>
    <div className="bg-white rounded-lg dark:bg-zinc-900 flex items-center p-4 w-72 ">
      <div className="mr-6 border-2 border-warning p-2 rounded-full">
      <VscRequestChanges className="w-7 h-7 dark:text-gray-200" />
      </div>
      <div>
        <h3 className="text-lg pb-1 font-medium dark:text-gray-200 text-black">Total request</h3>
        <p className="text-lg text-black dark:text-gray-200">50</p>
      </div> 
    </div>
   </div>
    
  );
};

export default CardWishlistPromotion;
