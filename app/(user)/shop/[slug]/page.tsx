"use client"
import CategoryCardComponent from '@/components/card/CategoryCardComponent';
import NormalProductComponent from '@/components/card/NormalProduct';
import ShopProfileComponent from '@/components/shop-profile/ShopProfileComponent';
import { useGetShopBySlugQuery } from '@/redux/service/shop';
import React from 'react';
import Loading from '@/app/(user)/loading';
import NotFoundPage from '../../not-found';

type ShopPageProps = {
          params: {
            slug: string;
          };
        };

const Page = ( { params }: ShopPageProps ) => {
  const { slug } = params;
  const {
    data: shop,
    error,
    isLoading,
  }: any = useGetShopBySlugQuery(slug);
  console.log(shop);
  // console.log(error);
  // console.log(isLoading);
  if (isLoading) return <Loading/>;
  if (error) {
    return <NotFoundPage />;
  }
          return (
                    <div>
                        {/* shop profile section */}
                              <ShopProfileComponent />
                              {/* card category section */}
                              <CategoryCardComponent/>
                              {/* normal card section */}
                              <NormalProductComponent/>
                              {/* about us section */}
                                        
                    </div>
          );
}

export default Page;
