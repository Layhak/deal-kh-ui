'use client';
import { Image, Link } from '@nextui-org/react';
import 'aos/dist/aos.css';
import { useState } from 'react';
import { useGetProductScrapeQuery } from '@/redux/service/productScrape';
import { useGetDiscountTypesQuery } from '@/redux/service/discountTypes';
import { DiscountType } from '@/types/DiscountType';
import SectionHome from '@/components/card/SectionHome';
import CardCouponComponent from '@/components/card/coupon-detail/CardCouponComponent';

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
                      <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
                        {firstPart}
                        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                          {' ' + secondPart}
                        </span>
                      </p>
                    </div>
                    <Link href="/discount">
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
                            <>
                              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                <SectionHome
                                  size={3}
                                  discountType={discountType.name}
                                  name={discountType.name}
                                />
                              </div>
                              <div className="mx-auto w-[88%] md:w-[94%] lg:mx-0 lg:w-full">
                                <Image
                                  src="https://img.freepik.com/free-vector/flash-sale-special-offer-clearance-banner_260559-257.jpg?t=st=1717838807~exp=1717842407~hmac=e590d5944a23efe6832b1099efa74823733c852376d301923a8add2e48ffb16b&w=1060"
                                  className="mt-[35px] h-[200px] w-[1300px] object-cover lg:h-[310px]"
                                  alt="image"
                                />
                              </div>
                            </>
                          );
                        case 'buy-more-get-more':
                          return (
                            <>
                              <div className="flex flex-col gap-5 lg:flex-row ">
                                <div className="mx-auto  md:mx-0  ">
                                  <Link href="/buy-more-get-more">
                                    <Image
                                      width="800"
                                      src="https://i.pinimg.com/564x/f7/fe/32/f7fe32429482e12537ec90fc27bf6ff5.jpg"
                                      className="h-[500px] object-cover object-center sm:h-[700px] lg:h-[800px]"
                                      alt="image"
                                    />
                                  </Link>
                                </div>
                                <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                                  <SectionHome
                                    discountType={discountType.name}
                                    name={discountType.name}
                                    size={6}
                                  />
                                </div>
                              </div>
                            </>
                          );
                        case 'shop-coupons':
                          return (
                            <>
                              <CardCouponComponent displayCount={3} />
                              <section>
                                <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
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
                              <Image
                                src="https://romand.us/cdn/shop/files/PC_1.png?v=1719967761&width=1728"
                                className="h-[500px] w-[1300px] object-cover"
                                alt="Event"
                              />
                              <section>
                                <div className="my-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
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
                            <section>
                              <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
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
