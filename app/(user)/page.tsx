'use client';
import { Image, Link } from '@nextui-org/react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Category from '@/components/card/Category';
import NormalProductComponent from '@/components/card/NormalProduct';
import ShopCardComponent from '@/components/card/Shop';
import DiscountCardComponent from '@/components/card/DiscountCardComponent';
import ServiceCardComponent from '@/components/card/Service';
import Buy1Get1Component from '@/components/card/Buy1Get1';
import ClearanceCardComponent from '@/components/card/ClearanceCard';
import HeroSlideComponent from '@/components/slider/HeroSlide';
import 'react-toastify/dist/ReactToastify.css';
import CardCouponComponent from '@/components/card/coupon-detail/CardCouponComponent';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import FilterComponent from '@/components/Filter';
import { useGetProductScrapeQuery } from '@/redux/service/productScrape';
import PopularShop from '@/components/card/PopularShop';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const size = 4;

  const { data } = useGetProductScrapeQuery({ page, size });
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const { theme } = useTheme(); // Get the current theme
  useEffect(() => {
    if (localStorage.getItem('token') === 'log in') {
      toast.success('Login successfully.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      localStorage.removeItem('token');
    } else if (localStorage.getItem('token') === 'verified') {
      toast.success('Email verified successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      localStorage.removeItem('token');
    }
  }, [theme]);
  return (
    <>
      <div>
        <HeroSlideComponent />
        {/* Top Sale Section */}
        <div className="mx-6 my-4 flex h-[50px] items-center justify-between md:my-8 lg:mx-0 lg:my-8">
          <div className="flex-1">
            <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
              Top{' '}
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Sales
              </span>
            </p>
          </div>
          <Link href="/discount">
            <div className="flex items-center  pt-2">
              <p
                className="mr-2 pb-1 text-[15px] font-normal text-foreground-700 lg:text-[17px]
              "
              >
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
          <div className="flex flex-wrap justify-center gap-7">
            <DiscountCardComponent
              category={'food'}
              discountType={'discount off'}
              name={'food'}
            />
          </div>
        </section>

        {/* Clearance Sale Section */}
        <div className="mx-6 my-4 flex h-[50px] items-center justify-between md:my-8 lg:mx-0 lg:my-8">
          <div className="flex-1">
            <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
              Clearance{' '}
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Sales
              </span>
            </p>
          </div>
          <Link href="/flash-sale">
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
        <ClearanceCardComponent
          category={'clothes'}
          discountType={'clearance sales'}
        />
        {/* Banner */}
        <div className="mx-auto w-[88%] md:w-[94%]  lg:mx-0 lg:w-full">
          <Image
            src="https://img.freepik.com/free-vector/flash-sale-special-offer-clearance-banner_260559-257.jpg?t=st=1717838807~exp=1717842407~hmac=e590d5944a23efe6832b1099efa74823733c852376d301923a8add2e48ffb16b&w=1060"
            className="mt-[35px] h-[200px] w-[1300px] object-cover lg:h-[310px]"
            alt="image"
          />
        </div>

        {/* Buy1 Get1 Section */}
        <div className="mx-6 my-4 flex h-[50px] items-center justify-between md:my-8 lg:mx-0 lg:my-8">
          <div className="flex-1">
            <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
              Buy More{' '}
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Get More
              </span>
            </p>
          </div>
          <Link href="/buy-more-get-more">
            <div className="flex items-center  pt-2">
              <p className="mr-2 pb-1 text-[15px]  font-normal text-foreground-700 lg:text-[17px]">
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
        <div className="sm: grid md:grid-flow-col  md:justify-between md:px-4 lg:grid-flow-col lg:justify-between lg:px-0">
          {/* image section */}
          <div className="mx-auto w-[88%] md:mx-0 md:w-full lg:mx-0 lg:w-full">
            <Link href="/buy-more-get-more">
              <Image
                src="https://i.pinimg.com/564x/f7/fe/32/f7fe32429482e12537ec90fc27bf6ff5.jpg"
                className="object-cover md:h-[680px] lg:h-[690px]"
                alt="image"
              />
            </Link>
          </div>

          {/* card section */}
          <div className="grid w-full grid-flow-col">
            <Buy1Get1Component
              category={'drink'}
              discountType={'buy more get more'}
            />
          </div>
        </div>

        {/* Service Section */}
        <div className="mx-6 my-4 flex h-[50px] items-center  justify-between md:my-8 lg:mx-0 lg:my-8">
          <div className="flex-1">
            <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
              Service
            </p>
          </div>
          <Link href="/service">
            <div className="flex items-center  pt-2">
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
        {data && <ServiceCardComponent data={data} />}
        {/* Coupon Section */}
        <div className="mx-6 my-4 flex h-[50px] items-center justify-between">
          <div className="flex-1">
            <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
              Shop{' '}
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Coupon
              </span>
            </p>
          </div>
          <Link href="/coupons">
            <div className="flex items-center  pt-2">
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
        {/* Coupon Image */}
        <div>
          <CardCouponComponent displayCount={2} />
        </div>
        <section>
          <div className="flex flex-wrap justify-center gap-7">
            <DiscountCardComponent
              category={'clothes'}
              discountType={'shop coupons'}
            />
          </div>
        </section>

        {/* Event Section */}
        <div className="mx-6 my-4 flex h-[50px] items-center justify-between md:my-8 lg:mx-0 lg:my-8">
          <div className="flex-1">
            <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
              Event
            </p>
          </div>
          <Link href="/event">
            <div className="flex items-center  pt-2">
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
        <Link href="/event">
          <div className="mx-auto w-[88%] md:w-[94%]  lg:mx-0 lg:w-full">
            <Image
              src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
              alt="image"
              className=""
            ></Image>
          </div>
        </Link>

        {/* Feature Section */}
        <div className="mx-6 my-4 flex h-[50px] items-center justify-between">
          <div className="flex-1">
            <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
              Feature{' '}
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Products
              </span>
            </p>
          </div>
          {/* Right section */}
          <Link href="/no-discount">
            <div className="flex items-center  pt-2">
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
        <NormalProductComponent
          category={'electronic'}
          discountType={'no discount'}
        />

        {/* Category */}
        <div className="mx-6 my-4 flex h-[50px] items-center justify-between">
          <div className="flex-1">
            <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
              Category
            </p>
          </div>
          {/* Right section */}
          <Link href="/products">
            <div className="flex items-center  pt-2">
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
        <Category />

        {/* Shop Section */}
        <div className="mx-6 my-4 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="relative w-fit from-pink-500 to-yellow-500 text-[16px] font-bold text-foreground-700 after:absolute after:bottom-[-4px] after:left-0 after:h-[4px] after:w-full after:bg-gradient-to-r md:text-[20px] lg:text-[26px]">
              Popular{' '}
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Shop
              </span>
            </p>
          </div>
          {/* Right section */}
          <Link href="/shop">
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
        <PopularShop />
      </div>
    </>
  );
}
