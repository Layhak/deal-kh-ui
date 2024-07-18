'use client';
import React, { useEffect, useState } from 'react';
import Loading from '@/app/(user)/loading';
import NotFoundPage from '@/app/(user)/not-found';
import DiscountCardComponent from '@/components/card/DiscountCardComponent';
import ClearanceCardComponent from '@/components/card/ClearanceCard';
import BuyMoreGetMoreComponent from '@/components/card/BuyMoreGetMore';
import NormalProductComponent from '@/components/card/NormalProduct';
import { Image } from '@nextui-org/react';
import { useGetCategoryBySlugQuery } from '@/redux/service/category';
import Pagination from '@/components/pagination/Pagination';

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

const CategoryPage = ({ params }: CategoryPageProps) => {

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { slug } = params;
  const { data: category, error, isLoading } = useGetCategoryBySlugQuery(slug);

  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8; // Adjust as per your requirement

  useEffect(() => {
    const fetchTotalItems = async () => {
      try {
        setTotalItems(40); // Example: Set total items count received from API
      } catch (error) {
        console.error("Error fetching total items:", error);
      }
    };

    fetchTotalItems();
  }, []);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (isLoading) return <Loading />;
  if (error) {
    return <NotFoundPage />;
  }
  
  return (
    <main>
      <div className="">
        <Image
          src={
            category.payload?.bannerUrl ||
            'https://img.freepik.com/free-vector/hand-drawn-fast-food-sale-banner_23-2150970567.jpg?t=st=1717934947~exp=1717938547~hmac=58c8ea86733d88849707b728b3db59c8fea2a3eb7f0c83aafb02112d07442ad8&w=1060'
          }
          className="h-[320px] w-[1300px] object-cover"
          alt={category.payload.name}
        />
      </div>
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Top{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Sales
            </span>
          </p>
        </div>
      </div>
      <DiscountCardComponent currentPage={currentPage} category={slug} onPageChange={handlePageChange} discountType="discount off" />
       {/* Pagination */}

        <div className="flex justify-center mt-4">
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        </div>

      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Clearance{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Sales
            </span>
          </p>
        </div>
      </div>
      <ClearanceCardComponent category={slug} discountType="clearance sales" />
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Buy More{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Get More
            </span>
          </p>
        </div>
      </div>
      <BuyMoreGetMoreComponent
        category={slug}
        discountType="buy more get more"
      />
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Shop{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Coupon
            </span>
          </p>
        </div>
      </div>
      <DiscountCardComponent currentPage={0} category={slug} discountType="shop coupons" onPageChange={function (totalPages: number): void {
        
      } } />
      <div className="my-8 flex h-[50px] items-center justify-between">
        <div className="flex-1">
          <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
            Event
          </p>
        </div>
      </div>
      <NormalProductComponent category={slug} discountType="event" />
    </main>
  );
};

export default CategoryPage;





// "use client"
// import React, { useState, useEffect } from 'react';
// import Loading from '@/app/(user)/loading';
// import NotFoundPage from '@/app/(user)/not-found';
// import DiscountCardComponent from '@/components/card/DiscountCardComponent';
// import ClearanceCardComponent from '@/components/card/ClearanceCard';
// import BuyMoreGetMoreComponent from '@/components/card/BuyMoreGetMore';
// import NormalProductComponent from '@/components/card/NormalProduct';
// import { Image } from '@nextui-org/react';
// import { useGetCategoryBySlugQuery } from '@/redux/service/category';
// import Pagination from '@/components/pagination/Pagination';
// import { Product } from '@/types/product';
// import { useGetProductsQuery } from '@/redux/service/product';

// interface CategoryPageProps {
//   params: {
//     slug: string;
//   };
// }

// const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {

//   const router = useRouter();
//   const { slug } = params;

//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [category, setCategory] = useState<any>(null);

//   // Fetch category data
//   const { data: categoryData, error: categoryError, isLoading: categoryLoading } = useGetCategoryBySlugQuery(slug);

//   // Fetch products based on category and pagination
//   const { data: productsData, error: productsError, isLoading: productsLoading } = useGetProductsQuery({
//     filters: {
//       category: slug,
//     },
//     page: currentPage,
//     size: 10,
//   });

//   useEffect(() => {
//     if (categoryData?.payload) {
//       setCategory(categoryData.payload);
//     }
//   }, [categoryData]);

//   useEffect(() => {
//     if (productsData?.payload) {
//       setProducts(productsData.payload.list);
//       setTotalPages(productsData.payload.pagination.totalPages);
//     }
//   }, [productsData, currentPage]);

//   // Handle pagination change
//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   if (categoryLoading || productsLoading) return <Loading />;
//   if (categoryError || productsError) return <NotFoundPage />;  

//   return (
//     <main>
//       <div className="">
//         <Image
//           src={
//             category?.payload?.bannerUrl ||
//             'https://img.freepik.com/free-vector/hand-drawn-fast-food-sale-banner_23-2150970567.jpg?t=st=1717934947~exp=1717938547~hmac=58c8ea86733d88849707b728b3db59c8fea2a3eb7f0c83aafb02112d07442ad8&w=1060'
//           }
//           className="h-[320px] w-[1300px] object-cover"
//           alt={category?.payload?.name}
//         />
//       </div>
//       <div className="my-8 flex h-[50px] items-center justify-between">
//         <div className="flex-1">
//           <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//             Top{' '}
//             <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
//               Sales
//             </span>
//           </p>
//         </div>
//       </div>
//       <DiscountCardComponent
//         currentPage={currentPage}
//         category={slug} 
//         onPageChange={setCurrentPage}
//         discountType="discount off"
//               />

//       {/* Pagination */}
//       {/* <div className="flex justify-center mt-4">
//         <Pagination
//           page={currentPage}
//           total={totalPages}
//           onChange={handlePageChange}
//         />
//       </div> */}

//        {products.length > 0 && totalPages > 1 && ( 
//         <div className="flex justify-center mt-4">
//           <Pagination
//             page={currentPage}
//             total={totalPages}
//             onChange={setCurrentPage}
//           />
//         </div>
//       )}

//       <div className="my-8 flex h-[50px] items-center justify-between">
//         <div className="flex-1">
//           <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//             Clearance{' '}
//             <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
//               Sales
//             </span>
//           </p>
//         </div>
//       </div>
//       <ClearanceCardComponent category={slug} discountType="clearance sales" />
//       <div className="my-8 flex h-[50px] items-center justify-between">
//         <div className="flex-1">
//           <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//             Buy More{' '}
//             <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
//               Get More
//             </span>
//           </p>
//         </div>
//       </div>
//       <BuyMoreGetMoreComponent category={slug} discountType="buy more get more" />
//       <div className="my-8 flex h-[50px] items-center justify-between">
//         <div className="flex-1">
//           <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//             Shop{' '}
//             <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
//               Coupon
//             </span>
//           </p>
//         </div>
//       </div>
//       <DiscountCardComponent currentPage={0} category={slug}  discountType="discount off" onPageChange={function (totalPages: number): void {
       
//       } } />
//       <div className="my-8 flex h-[50px] items-center justify-between">
//         <div className="flex-1">
//           <p className="relative w-fit text-[26px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]">
//             Event
//           </p>
//         </div>
//       </div>
//       <NormalProductComponent category={slug} discountType="event" />
//     </main>
//   );
// };

// export default CategoryPage;
