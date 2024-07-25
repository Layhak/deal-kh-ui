'use client';
import React, { useEffect } from 'react';
import { Image, Link } from '@nextui-org/react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import { useGetCategoryBySlugQuery } from '@/redux/service/category';
import { useGetDiscountTypesQuery } from '@/redux/service/discountTypes';
import Loading from '@/app/(user)/loading';
import NotFoundPage from '@/app/(user)/not-found';
import CardCouponComponent from '@/components/card/coupon-detail/CardCouponComponent';
import SkeletonCard from '@/components/card/SkeletonCard';
import SectionCategory from '@/components/card/SectionCategory';
import { DiscountType } from '@/types/DiscountType';
import ClearanceSaleSlideComponentProps from '@/components/slider/ClearanceSaleSlide';

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { slug } = params;
  const { data: category, error, isLoading } = useGetCategoryBySlugQuery(slug);

  const { data: discountTypes, isLoading: isLoadingDiscountTypes } =
    useGetDiscountTypesQuery();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <NotFoundPage />;

  return (
    <main>
      <div className="">
        <Image
          src={
            category.payload?.banner ||
            'https://img.freepik.com/free-vector/hand-drawn-fast-food-sale-banner_23-2150970567.jpg?t=st=1717934947~exp=1717938547~hmac=58c8ea86733d88849707b728b3db59c8fea2a3eb7f0c83aafb02112d07442ad8&w=1060'
          }
          className="h-[320px] w-[1300px] object-cover"
          alt={category.payload.name}
        />
      </div>
      {isLoadingDiscountTypes ? (
        <SkeletonCard />
      ) : (
        discountTypes.payload.map((discountType: DiscountType) => {
          const [firstPart, ...restParts] = discountType.name.split(' ');
          const secondPart = restParts.join(' ');

          return (
            !['top-sales', 'flash-sales'].includes(discountType.slug) && (
              <React.Fragment key={discountType.slug}>
                <div className="mx-6 my-4 flex h-[50px] items-center justify-between md:my-8 lg:mx-0 lg:my-8">
                  <div className="flex-1">
                    <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
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
                          <>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                              <SectionCategory
                                size={3}
                                discountType={discountType.name}
                                name={discountType.name}
                                category={slug}
                              />
                            </div>
                            <div className="mx-auto mt-5 w-[88%] md:w-[94%] lg:mx-0 lg:w-full">
                              <ClearanceSaleSlideComponentProps
                                bannerType={slug}
                              />
                            </div>
                          </>
                        );
                      case 'buy-more-get-more':
                        return (
                          <>
                            <div className="flex flex-col gap-5 lg:flex-row">
                              <div className="mx-auto md:mx-0">
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
                                <SectionCategory
                                  discountType={discountType.name}
                                  name={discountType.name}
                                  category={slug}
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
                                <SectionCategory
                                  discountType={discountType.name}
                                  name={discountType.name}
                                  category={slug}
                                />
                              </div>
                            </section>
                          </>
                        );
                      default:
                        return (
                          <section>
                            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                              <SectionCategory
                                discountType={discountType.name}
                                name={discountType.name}
                                category={slug}
                              />
                            </div>
                          </section>
                        );
                    }
                  })()}
                </section>
              </React.Fragment>
            )
          );
        })
      )}
    </main>
  );
};

export default CategoryPage;
