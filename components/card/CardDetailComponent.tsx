'use client';
import { Button, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Key, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import '@/styles/swiper.css';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import {
  useGetProductFeedbackQuery,
  useGetProductRatingsByProductSlugQuery,
} from '@/redux/service/ratingAndFeedback';
import Loading from '@/app/(user)/loading';
import { StarIcon } from '@/components/review/StarIcon';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/feature/cart/cartSlice';

export default function CardDetailComponent({
  slug,
  name,
  category,
  description,
  images,
  shop,
  shopSlug,
  discountType,
  discountTypeSlug,
  price,
  discountPrice,
  createdAt,
  expiredAt,
  address,
  openAt,
  closeAt,
  seller,
  ratingAvg,
  discountValue,
  updatedAt,
  updatedBy,
  createdBy,
  isPercentage,
  ratingCount,
  location,
  quantity = 0,
}: any) {
  const router = useRouter();
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const dispatch = useDispatch();

  const {
    data: ratingsData,
    error: ratingError,
    isLoading: ratingLoading,
  } = useGetProductRatingsByProductSlugQuery({ productSlug: slug });
  const {
    data: feedbackData,
    error: feedbackError,
    isLoading: feedbackLoading,
  } = useGetProductFeedbackQuery({ productSlug: slug });

  useEffect(() => {
    if (ratingsData) {
      const totalRating = ratingsData.reduce(
        (sum, rating) => sum + rating.ratingValue,
        0
      );
      const average = totalRating / ratingsData.length;
      setAverageRating(average);
      setTotalReviews(ratingsData.length);
    }
  }, [ratingsData]);

  const roundedRating =
    averageRating > 4.5 && averageRating < 5
      ? 4.5
      : Math.round(averageRating * 2) / 2;

  if (ratingLoading || feedbackLoading) return <Loading />;
  if (ratingError || feedbackError)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">Error loading data</div>
      </div>
    );

  const navigateToShop = () => {
    router.push(`/shop/${shopSlug}`);
  };

  return (
    <div className="container w-full lg:py-8">
      <div className="grid grid-cols-1 content-center gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          slidesPerView={1}
          modules={[Pagination, Autoplay, EffectFade, Navigation]}
          className="w-full"
          loop={true}
          effect={'fade'}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {images.map(
            (
              image: { url: string | undefined },
              index: Key | null | undefined
            ) => (
              <SwiperSlide key={index} className={'rounded-2xl'}>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    isZoomed
                    src={image.url}
                    alt={name}
                    radius={'lg'}
                    className="h-[500px] w-[600px] object-cover"
                  />
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
        {/* Product Details */}
        <div className="mx-auto w-full md:flex md:flex-col md:gap-4 lg:w-[80%]">
          {/* Star section */}
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
              const isHalf = roundedRating - index === 0.5;
              return (
                <StarIcon
                  key={index}
                  filled={index < Math.floor(roundedRating)}
                  half={isHalf}
                  className="h-5 w-5 text-yellow-400"
                />
              );
            })}
            <span className="ml-2 text-[16px] font-medium text-foreground-600">
              ({totalReviews}) Reviews
            </span>
          </div>
          {/* Product information */}
          <div>
            <h1 className="text-2xl font-semibold text-foreground-800 dark:text-white md:text-3xl md:font-semibold">
              {name}
            </h1>
            <p className="mt-3 h-[150px] text-lg text-foreground-600">
              {description.length > 300
                ? `${description.substring(0, 300)}...`
                : description || 'Description'}
            </p>
            {/* Price */}
            <div className="mt-4 flex text-foreground-500 md:flex-row">
              <p className="mt-2 text-xl font-bold text-foreground-500 line-through dark:text-white">
                ${price}
              </p>
              <p className="ml-3 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-3xl font-bold text-transparent">
                ${(price - discountPrice).toFixed(2)}
              </p>
            </div>
            {/* Shop and other details */}
            <div className="mt-4 space-y-2">
              <p className="text-base font-medium text-foreground-600">
                Expired Date :{' '}
                <span className="font-semibold text-red-500">{expiredAt}</span>
              </p>
              <p className="text-base font-medium text-foreground-600">
                Shop :{' '}
                <span
                  className="cursor-pointer font-semibold text-blue-800"
                  onClick={navigateToShop}
                >
                  {shop}
                </span>
              </p>
              <p className="text-base font-medium text-foreground-600">
                Open : {openAt.slice(0, 5)} AM - {closeAt.slice(0, 5)} PM
              </p>
              <p className="text-base font-medium text-foreground-600">
                Location : <span className="font-semibold">{address}</span>
              </p>
            </div>
          </div>
          {/* Buttons */}
          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Button
              onClick={() =>
                dispatch(
                  addToCart({
                    discountTypeSlug,
                    closeAt,
                    openAt,
                    seller,
                    slug,
                    name,
                    price,
                    discountPrice,
                    ratingAvg,
                    description,
                    images,
                    shop,
                    discountValue,
                    discountType,
                    expiredAt,
                    category,
                    createdAt,
                    updatedAt,
                    createdBy,
                    updatedBy,
                    address,
                    ratingCount,
                    isPercentage,
                    location,
                    quantity,
                  })
                )
              }
              variant={'solid'}
              radius={'lg'}
              className="cursor-pointer border-2 border-warning-500 bg-foreground-50 text-base font-medium text-foreground-600  hover:bg-foreground-100"
            >
              Add to Cart
            </Button>
            <Button
              radius={'lg'}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 text-base font-medium text-gray-50 "
            >
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
