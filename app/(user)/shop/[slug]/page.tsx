'use client';
import ShopProfileComponent from '@/components/shop-profile/ShopProfileComponent';
import React, { useEffect } from 'react';
import { useGetShopBySlugQuery } from '@/redux/service/shop';
import Loading from '@/app/(user)/loading';
import { useGetDiscountTypesQuery } from '@/redux/service/discountTypes';
import Aos from 'aos';
import NotFoundPage from '@/app/(auth)/[...slug]/page';
import { Image, Link } from '@nextui-org/react';
import SkeletonCard from '@/components/card/SkeletonCard';
import { DiscountType } from '@/types/DiscountType';
import CardCouponComponent from '@/components/card/coupon-detail/CardCouponComponent';
import SectionProfileShop from '@/components/card/SectionProfileShop';

type Props = {
  params: {
    slug: string;
  };
};

const ShopProfile = ({ params }: Props) => {
  const slug = params.slug;
  const { data, isLoading, error } = useGetShopBySlugQuery(slug);
  const { data: discountTypes, isLoading: isLoadingDiscountTypes } =
    useGetDiscountTypesQuery();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <NotFoundPage />;

  return (
    <div>
      <ShopProfileComponent shopProfile={data.payload} shopSlug={slug}/>
      <main>
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
                  </div>
                  <section>
                    {(() => {
                      switch (discountType.slug) {
                        case 'clearance-sales':
                          return (
                            <>
                              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                <SectionProfileShop
                                  shopSlug={slug}
                                  shopName={data.payload.name}
                                  size={3}
                                  discountType={discountType.name}
                                  name={discountType.name}
                                  category={slug}
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
                              <div className="flex flex-col gap-5 lg:flex-row">
                                <div className="mx-auto md:mx-0">
                                  <Link href="/buy-more-get-more">
                                    <Image
                                      width="800"
                                      src="https://i.pinimg.com/564x/f7/fe/32/f7fe32429482e12537ec90fc27bf6ff5.jpg"
                                      className="h-[500px] object-cover object-center sm:h-[700px] lg:h-[900px]"
                                      alt="image"
                                    />
                                  </Link>
                                </div>
                                <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                                  <SectionProfileShop
                                    shopSlug={slug}
                                    shopName={data.payload.name}
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
                                  <SectionProfileShop
                                    shopSlug={slug}
                                    shopName={data.payload.name}
                                    discountType={discountType.name}
                                    name={discountType.name}
                                    category={slug}
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
                                  <SectionProfileShop
                                    shopSlug={slug}
                                    shopName={data.payload.name}
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
                                <SectionProfileShop
                                  shopSlug={slug}
                                  shopName={data.payload.name}
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
    </div>
  );
};

export default ShopProfile;
