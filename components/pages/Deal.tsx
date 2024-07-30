'use client';
import { Image, Link } from '@nextui-org/react';
import 'aos/dist/aos.css';
import React, { useState } from 'react';
import { useGetProductScrapeQuery } from '@/redux/service/productScrape';
import { useGetDiscountTypesQuery } from '@/redux/service/discountTypes';
import { DiscountType } from '@/types/DiscountType';
import SectionHome from '@/components/card/SectionHome';
import CardCouponComponent from '@/components/card/coupon-detail/CardCouponComponent';
import ClearanceSaleSlideComponentProps from '@/components/slider/ClearanceSaleSlide';
import BuyMoreGetMoreSlideComponent from '../slider/BuyMoreGetMoreSlide';
import EvenSlideComponent from '@/components/slider/EvenSlide';
export default function Deal() {
  const [page] = useState(1);
  const size = 4;

  const { data } = useGetProductScrapeQuery({ page, size });
  const {
    data: discountTypes,
    isLoading: isLoadingDiscountTypes,
    error: errorDiscountTypes,
  } = useGetDiscountTypesQuery();
  if (errorDiscountTypes) {
    console.error('Error fetching discount types:', errorDiscountTypes);
    return <div>Error loading discount types</div>;
  }

  return (
    <>
      {isLoadingDiscountTypes
        ? 'Loading'
        : discountTypes.payload.map((discountType: DiscountType) => {
          const [firstPart, ...restParts] = discountType.name.split(' ');
          const secondPart = restParts.join(' ');

          return (
            !['top-sales', 'flash-sales', 'no-discount'].includes(
              discountType.slug
            ) && (
              <>
                <div className="mx-6 my-4 flex h-[50px] items-center justify-between md:my-8 lg:mx-0 lg:my-8">
                  <div className="flex-1">
                    <p className="md:text-xl text-md relative w-fit from-pink-500 to-yellow-500 font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r  lg:text-2xl">
                      {firstPart}
                      <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                        {' ' + secondPart}
                      </span>
                    </p>
                  </div>
                  <Link href={`/discount/${discountType.slug}`}>
                    <div className="flex items-center pt-2">
                      <p className="mr-2 pb-1 text-[15px] font-normal text-foreground-700 lg:text-[17px]">
                        See More
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        color="black"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="none"
                          stroke="#6b7280"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M42 24H6m24-12l12 12-12 12"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
                <section>
                  {(() => {
                    switch (discountType.slug) {
                      case 'clearance-sales':
                        return (
                          <section
                            className={
                              'my-auto flex h-full w-full max-w-7xl flex-col gap-2 px-4 lg:px-0'
                            }
                          >
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 ">
                              <SectionHome
                                size={3}
                                discountType={discountType.name}
                                name={discountType.name}
                              />
                            </div>
                            <div className="mx-auto mt-5 w-[88%] md:w-[94%] lg:mx-0 lg:w-full">
                              <ClearanceSaleSlideComponentProps bannerType="home-clearance" />
                            </div>
                          </section>
                        );
                      case 'buy-more-get-more':
                        return (
                          <>
                            <div className="flex flex-col gap-8 lg:flex-row ">
                              <div className="mx-auto  md:mx-0  ">
                                <Link href="/buy-more-get-more">
                                  <BuyMoreGetMoreSlideComponent bannerType='home-buy-more-get-more' />                                  </Link>
                              </div>
                              <div
                                className={
                                  'my-auto flex h-full w-full max-w-7xl flex-col gap-2 px-4 lg:px-0'
                                }
                              >

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
                                  <SectionHome
                                    discountType={discountType.name}
                                    name={discountType.name}
                                    size={6}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      case 'shop-coupons':
                        return (
                          <>
                            <CardCouponComponent displayCount={3} />
                            <section
                              className={
                                'my-auto flex h-full w-full max-w-7xl flex-col gap-2 px-4 lg:p-0'
                              }
                            >
                              <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                                <SectionHome
                                  discountType={discountType.name}
                                  name={discountType.name}
                                />
                              </div>
                            </section>
                          </>
                        );
                      case 'event':
                        return (
                          <>
                            <EvenSlideComponent />
                            <section
                              className={
                                'my-auto flex h-full w-full max-w-7xl flex-col gap-2 px-4 lg:p-0'
                              }
                            >
                              <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                <SectionHome
                                  discountType={discountType.name}
                                  name={discountType.name}
                                />
                              </div>
                            </section>
                          </>
                        );
                      default:
                        return (
                          <section
                            className={
                              'my-auto flex h-full w-full max-w-7xl flex-col gap-2 px-4 lg:p-0'
                            }
                          >
                            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                              <SectionHome
                                discountType={discountType.name}
                                name={discountType.name}
                              />
                            </div>
                          </section>
                        );
                    }
                  })()}
                </section>
              </>
            )
          );
        })}
    </>
  );
}
