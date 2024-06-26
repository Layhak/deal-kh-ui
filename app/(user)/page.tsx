'use client';

import { Image, Link } from '@nextui-org/react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { toast } from 'react-toastify';
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

export default function HomePage() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    if (localStorage.getItem('showSuccessLoginToast') === 'true') {
      toast.success('Successfully logged in!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      localStorage.removeItem('showSuccessLoginToast'); // Clear the flag
    } else if (localStorage.getItem('showSuccessRegisterToast') === 'true') {
      toast.success('Successfully registered!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      localStorage.removeItem('showSuccessRegisterToast'); // Clear the flag
    }
  }, [theme]);
  return (
    <>
      <main>
        {/* Slide Section */}
        <HeroSlideComponent />
        {/* Top Sale Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="text-foreground-700 relative w-fit text-[20px] font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308]  lg:text-[26px]">
              Top <span className="text-[#eb7d52]">Sales</span>
            </p>
          </div>
          {/* Right section */}
          <Link href="/discount">
            <div className="flex items-center  pt-2">
              <p
                className="text-foreground-500 mr-2 pb-1 text-[17px] font-normal
              "
              >
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
                  stroke="#6b7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <DiscountCardComponent />
        {/* Clearance Sale Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          <div className="flex-1">
            <p className="text-foreground-700 relative w-fit text-[20px]  font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308] lg:text-[26px]">
              Clearance <span className="text-[#eb7d52]">Sales</span>
            </p>
          </div>
          <Link href="/flash-sale">
            <div className="flex items-center pt-2">
              <p className="text-foreground-500 mr-2 pb-1 text-[17px] font-normal">
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
                  stroke="#6b7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <ClearanceCardComponent />
        <div>
          <Image
            src="https://img.freepik.com/free-vector/flash-sale-special-offer-clearance-banner_260559-257.jpg?t=st=1717838807~exp=1717842407~hmac=e590d5944a23efe6832b1099efa74823733c852376d301923a8add2e48ffb16b&w=1060"
            className="mt-[35px] h-[200px] w-[1300px] object-cover lg:h-[310px]"
            alt="image"
          />
        </div>
        {/* Buy1 Get1 Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          <div className="flex-1">
            <p className="text-foreground-700 relative w-fit text-[20px]  font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308] lg:text-[26px]">
              Buy More <span className="text-[#eb7d52]">Get More</span>
            </p>
          </div>
          <Link href="/buy-more-get-more">
            <div className="flex items-center  pt-2">
              <p className="text-foreground-500 mr-2 pb-1 text-[17px] font-normal">
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
                  stroke="#6b7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap justify-between">
          <div>
            <Link href="/buy-more-get-more">
              <Image
                src="https://i.pinimg.com/564x/f7/fe/32/f7fe32429482e12537ec90fc27bf6ff5.jpg"
                className="h-[690px] object-cover"
                alt="image"
              />
            </Link>
          </div>
          <div className="w-[800px]">
            <Buy1Get1Component />
          </div>
        </div>
        {/* Service Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="text-foreground-700 relative w-fit text-[20px]  font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308] lg:text-[26px]">
              Service
            </p>
          </div>
          {/* Right section */}
          <Link href="/service">
            <div className="flex items-center  pt-2">
              <p className="text-foreground-500 mr-2 pb-1 text-[17px] font-normal">
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
                  stroke="#6b7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <ServiceCardComponent />
        {/* Coupon Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="text-foreground-700 relative w-fit text-[20px]  font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308] lg:text-[26px]">
              Shop <span className="text-[#eb7d52]">Coupons</span>
            </p>
          </div>
          {/* Right section */}
          <Link href="/coupons">
            <div className="flex items-center  pt-2">
              <p className="text-foreground-500 mr-2 pb-1 text-[17px] font-normal">
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
                  stroke="#6b7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div >
          <CardCouponComponent displayCount={2}/>
        </div>
        <DiscountCardComponent />
        {/* Event Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="text-foreground-700 relative w-fit text-[20px]  font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308] lg:text-[26px]">
              Event
            </p>
          </div>
          {/* Right section */}
          <Link href="/event">
            <div className="flex items-center  pt-2">
              <p className="text-foreground-500 mr-2 pb-1 text-[17px] font-normal">
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
                  stroke="#6b7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>

        <Link href="/event">
          <Image
            src="https://romand.us/cdn/shop/files/PC_1.png?v=1717143214&width=1728"
            alt="image"
            className=""
          ></Image>
        </Link>
        {/* Shop Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="text-foreground-700 relative w-fit text-[20px]  font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308] lg:text-[26px]">
              Popular <span className="text-[#eb7d52]">Shop</span>
            </p>
          </div>
          {/* Right section */}
          <Link href="#">
            <div className="flex items-center  pt-2">
              <p className="text-foreground-500 mr-2 pb-1 text-[17px] font-normal">
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
                  stroke="#6b7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <ShopCardComponent />
        {/* Feature Section */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="text-foreground-700 relative w-fit text-[20px]  font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308] lg:text-[26px]">
              Feature <span className="text-[#eb7d52]">Products</span>
            </p>
          </div>
          {/* Right section */}
          <Link href="/all-product">
            <div className="flex items-center  pt-2">
              <p className="text-foreground-500 mr-2 pb-1 text-[17px] font-normal">
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
                  stroke="#6b7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <NormalProductComponent />
        {/* Category */}
        <div className="my-8 flex h-[50px] items-center justify-between">
          {/* Left section */}
          <div className="flex-1">
            <p className="text-foreground-700 relative w-fit text-[20px]  font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-[#eab308] lg:text-[26px]">
              Category
            </p>
          </div>
          {/* Right section */}
          <Link href="/all-product">
            <div className="flex items-center  pt-2">
              <p className="text-foreground-500 mr-2 pb-1 text-[17px] font-normal">
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
                  stroke="#6b7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M42 24H6m24-12l12 12l-12 12"
                />
              </svg>
            </div>
          </Link>
        </div>
        <Category />
      </main>
    </>
  );
}
