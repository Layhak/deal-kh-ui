// "use client";

// import React, { useEffect, useState } from 'react'
// import { Link, Image } from '@nextui-org/react';
// import DiscountCardComponent from '@/components/card/DiscountCardComponent';
// import CustomPagination from '../pagination/CustomPagination';

// export default function Discount() {

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0); // Store the total number of items
//   const itemsPerPage = 6;

//   useEffect(() => {
//     // Fetch the total number of items
//     const fetchTotalItems = async () => {
//       try {
//         // Replace with your actual data fetching logic to get the total count
//         const response = await fetch(`/api/discounts/count`);
//         const result = await response.json();
//         setTotalItems(result.total); // Ensure this matches your data structure
//       } catch (error) {
//         console.error("Error fetching total items:", error);
//       }
//     };

//     fetchTotalItems();
//   }, []);

//   const total = Math.ceil(totalItems / itemsPerPage); // Calculate the total number of pages

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <main>
//         {/* Banner */}
//         <div className="">
//           <Image
//             src="https://img.freepik.com/free-vector/shopping-sales-banner-design_23-2150265643.jpg?t=st=1717932785~exp=1717936385~hmac=9692ef3ba41783f08b8a94da65432a222162e78bc68aed265cef853a4eb2cb06&w=1060"
//             className="h-[320px] w-[1300px] object-cover"
//           ></Image>
//         </div>
//         {/* Food */}
//         <div className="my-8 flex h-[50px] items-center justify-between">
//           {/* Left section */}
//           <div className="flex-1">
//             <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//               Food 
//             </p>
//           </div>
//           {/* Right section */}
//           <Link href="/food">
//             <div className="flex items-center  pt-1">
//               <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
//                 See More
//               </p>
//               {/* Icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 color="black"
//                 viewBox="0 0 48 48"
//               >
//                 <path
//                   fill="none"
//                   stroke="#545c6a"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="4"
//                   d="M42 24H6m24-12l12 12l-12 12"
//                 />
//               </svg>
//             </div>
//           </Link>
//         </div>
//         <DiscountCardComponent onPageChange={function (page: number): void {
       
//       } } />
        
//         {/* Drink */}
//         <div className="my-8 flex h-[50px] items-center justify-between">
//           {/* Left section */}
//           <div className="flex-1">
//             <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//               Drink 
//             </p>
//           </div>
//           {/* Right section */}
//           <Link href="/drink">
//             <div className="flex items-center  pt-1">
//               <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
//                 See More
//               </p>
//               {/* Icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 color="black"
//                 viewBox="0 0 48 48"
//               >
//                 <path
//                   fill="none"
//                   stroke="#545c6a"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="4"
//                   d="M42 24H6m24-12l12 12l-12 12"
//                 />
//               </svg>
//             </div>
//           </Link>
//         </div>
//         <DiscountCardComponent onPageChange={function (page: number): void {
       
//       } } />
//         {/* Clothes */}
//         <div className="my-8 flex h-[50px] items-center justify-between">
//           {/* Left section */}
//           <div className="flex-1">
//             <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//               Clothes
//             </p>
//           </div>
//           {/* Right section */}
//           <Link href="/cloth">
//             <div className="flex items-center  pt-1">
//               <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
//                 See More
//               </p>
//               {/* Icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 color="black"
//                 viewBox="0 0 48 48"
//               >
//                 <path
//                   fill="none"
//                   stroke="#545c6a"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="4"
//                   d="M42 24H6m24-12l12 12l-12 12"
//                 />
//               </svg>
//             </div>
//           </Link>
//         </div>
//         <DiscountCardComponent onPageChange={function (page: number): void {
       
//       } }/>
//         {/* Accessories */}
//         <div className="my-8 flex h-[50px] items-center justify-between">
//           {/* Left section */}
//           <div className="flex-1">
//             <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//               Accessories 
//             </p>
//           </div>
//           {/* Right section */}
//           <Link href="/accessory">
//             <div className="flex items-center  pt-1">
//               <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
//                 See More
//               </p>
//               {/* Icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 color="black"
//                 viewBox="0 0 48 48"
//               >
//                 <path
//                   fill="none"
//                   stroke="#545c6a"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="4"
//                   d="M42 24H6m24-12l12 12l-12 12"
//                 />
//               </svg>
//             </div>
//           </Link>
//         </div>
//         <DiscountCardComponent onPageChange={function (page: number): void {
       
//       } }/>
//         {/* Skin Care */}
//         <div className="my-8 flex h-[50px] items-center justify-between">
//           {/* Left section */}
//           <div className="flex-1">
//             <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//               Skin <span className="text-[#eb7d52]">Care</span>
//             </p>
//           </div>
//           {/* Right section */}
//           <Link href="/skincare">
//             <div className="flex items-center  pt-1">
//               <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
//                 See More
//               </p>
//               {/* Icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 color="black"
//                 viewBox="0 0 48 48"
//               >
//                 <path
//                   fill="none"
//                   stroke="#545c6a"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="4"
//                   d="M42 24H6m24-12l12 12l-12 12"
//                 />
//               </svg>
//             </div>
//           </Link>
//         </div>
//         <DiscountCardComponent onPageChange={function (page: number): void {
       
//       } }/>
//         {/* Electronic */}
//         <div className="my-8 flex h-[50px] items-center justify-between">
//           {/* Left section */}
//           <div className="flex-1">
//             <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//               Electronic
//             </p>
//           </div>
//           {/* Right section */}
//           <Link href="/electronic">
//             <div className="flex items-center  pt-1">
//               <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
//                 See More
//               </p>
//               {/* Icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 color="black"
//                 viewBox="0 0 48 48"
//               >
//                 <path
//                   fill="none"
//                   stroke="#545c6a"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="4"
//                   d="M42 24H6m24-12l12 12l-12 12"
//                 />
//               </svg>
//             </div>
//           </Link>
//         </div>
//         <DiscountCardComponent onPageChange={function (page: number): void {
       
//       } }/>
//     </main>
//   )
// }




"use client";

import React, { useEffect, useState } from 'react'
import { Link, Image } from '@nextui-org/react';
import DiscountCardComponent from '@/components/card/DiscountCardComponent';

export default function Discount() {

  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [totalItems, setTotalItems] = useState(0);   // Total number of items
  const itemsPerPage = 6;     

  useEffect(() => {
    // Fetch the total number of items
    const fetchTotalItems = async () => {
      try {
        // Replace with your actual data fetching logic to get the total count
        const response = await fetch(`/api/discounts/count`);
        const result = await response.json();
        setTotalItems(result.total); // Ensure this matches your data structure
      } catch (error) {
        console.error("Error fetching total items:", error);
      }
    };

    fetchTotalItems();
  }, []);

  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total number of pages

  useEffect(() => {
    // Fetch items for the current page and update state
    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/discounts?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        setItems(data.items); // Update items state with fetched data from API
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [currentPage]); 

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update currentPage state when page changes
  };

  useEffect(() => {
    // Fetch items for the current page and update state
    const fetchItems = async () => {
      const items = await fetchItemsForPage(currentPage);
      // Handle updating state with fetched items
    };

    fetchItems();
  }, [currentPage]);


  return (
    <main>
        {/* Banner */}
        <div className="">
          <Image
            src="https://img.freepik.com/free-vector/shopping-sales-banner-design_23-2150265643.jpg?t=st=1717932785~exp=1717936385~hmac=9692ef3ba41783f08b8a94da65432a222162e78bc68aed265cef853a4eb2cb06&w=1060"
            className="h-[320px] w-[1300px] object-cover"
          ></Image>
        </div>
        {/* Food */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Food 
            </p>
          </div>
          {/* Right section */}
          <Link href="/food">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <DiscountCardComponent currentPage={0} />
        
        {/* Drink */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Drink 
            </p>
          </div>
          {/* Right section */}
          <Link href="/drink">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <DiscountCardComponent currentPage={0} />
        {/* Clothes */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Clothes
            </p>
          </div>
          {/* Right section */}
          <Link href="/cloth">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <DiscountCardComponent currentPage={0} />
        {/* Accessories */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Accessories 
            </p>
          </div>
          {/* Right section */}
          <Link href="/accessory">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <DiscountCardComponent currentPage={0} />
        {/* Skin Care */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Skin <span className="text-[#eb7d52]">Care</span>
            </p>
          </div>
          {/* Right section */}
          <Link href="/skincare">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <DiscountCardComponent currentPage={0} />
        {/* Electronic */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
              Electronic
            </p>
          </div>
          {/* Right section */}
          <Link href="/electronic">
            <div className="flex items-center  pt-1">
              <p className="mr-2 pb-1 text-[17px] font-normal text-gray-800">
                See More
              </p>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="black"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#545c6a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <DiscountCardComponent currentPage={0} />
    </main>
  )
}

function setItems(items: any) {
  throw new Error('Function not implemented.');
}

function fetchItemsForPage(currentPage: number) {
  throw new Error('Function not implemented.');
}

