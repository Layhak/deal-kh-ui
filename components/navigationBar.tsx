'use client';
import * as React from 'react';
import { SetStateAction, useEffect, useState } from 'react';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Tooltip,
  Link,
} from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { CartIcon, CloseIcon, HeartIcon, SearchIcon } from '@/components/icons';
import CategoryButton from './categoryButton';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { removeAccessToken, selectToken } from '@/redux/feature/auth/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import AuthLink from '@/components/auth/AuthLink';
import { useSubmitFormMutation } from '@/redux/api';
import { useLogoutUserMutation } from '@/redux/service/auth';
import { useGetProfileQuery } from '@/redux/service/user';
import { selectProducts } from '@/redux/feature/cart/cartSlice';
import { CartProductType } from '@/libs/difinition';
import { selectWishlistProducts } from '@/redux/feature/wishList/wishListSlice';

type ValueTypes = {
  email: string;
  password: string;
};

const initialValues: ValueTypes = {
  email: '',
  password: '',
};

export const NavigationBar = () => {
  const [submitForm, { isLoading, isError, error }] = useSubmitFormMutation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileQuery();

  // const avatarUrl = useAppSelector(selectAvatar);
  // const email = useAppSelector(selectEmail);
  // console.log('Profile:', avatarUrl);
  // console.log('Email:', email);
  // useEffect(() => {
  //   dispatch(fetchUserProfile());
  // }, [dispatch]);
  //
  // useEffect(() => {
  //   if (email) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [email]);
  console.log(userProfile);
  useEffect(() => {
    if (userProfile) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userProfile]);

  //For Carts
  const products = useAppSelector(selectProducts);
  //display number of product that only unique select
  const [uniqueProducts, setUniqueProducts] = useState<CartProductType[]>([]);

  useEffect(() => {
    // Filter unique products based on their slugs
    const unique = products.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.slug === product.slug)
    );

    // Update the state with the unique products
    setUniqueProducts(unique);
  }, [products]);

  // For Wishlist
  const wishlistProducts = useAppSelector(selectWishlistProducts);
  const [uniqueWishlistProducts, setUniqueWishlistProducts] = useState<
    CartProductType[]
  >([]);

  useEffect(() => {
    // Filter unique products based on their slugs
    const uniqueWishlist = wishlistProducts.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.slug === product.slug)
    );

    // Update the state with the unique wishlist products
    setUniqueWishlistProducts(uniqueWishlist);
  }, [wishlistProducts]);

  const [searchValue, setSearchValue] = useState('');
  const [secondValue, setSecondValue] = useState('');

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchValue(event.target.value);
  };

  const handleSecondChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSecondValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleClearSecond = () => {
    setSecondValue('');
  };

  const handleSubmit = async () => {
    try {
      await submitForm({ searchValue, secondValue }).unwrap();
      toast.success('Form submitted successfully.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    } catch (error) {
      toast.error('Failed to submit form.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      console.error('Failed to submit form:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      toast.success('Logout successfully.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      setIsLoggedIn(false);
      dispatch(removeAccessToken());
    } catch (error) {
      toast.error('Failed to logout.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      console.error('Failed to logout:', error);
    }
  };

  const searchInput = (
    <>
      <Input
        aria-label="First Input"
        classNames={{
          inputWrapper:
            'bg-default-100 rounded-none rounded-l-xl w-[150px] lg:w-[200px] mt-1',
          input: 'text-sm',
        }}
        labelPlacement="outside"
        placeholder="Search Deal-KH"
        endContent={
          searchValue ? (
            <CloseIcon
              onClick={handleClearSearch}
              className="flex-shrink-0 cursor-pointer text-base text-default-400"
            />
          ) : (
            <SearchIcon
              onClick={handleSubmit}
              className="pointer-events-none flex-shrink-0 text-base text-default-400"
            />
          )
        }
        type="se"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <Input
        aria-label="Second Input"
        classNames={{
          inputWrapper:
            'bg-default-100 rounded-none rounded-r-xl w-[150px] lg:w-[200px] mt-1',
          input: 'text-sm',
        }}
        labelPlacement="outside"
        placeholder="Toul Kork"
        endContent={
          secondValue ? (
            <CloseIcon
              onClick={handleClearSecond}
              className="flex-shrink-0 cursor-pointer text-base text-default-400"
            />
          ) : (
            <SearchIcon
              onClick={handleSubmit}
              className="pointer-events-none flex-shrink-0 text-base text-default-400"
            />
          )
        }
        type="se"
        value={secondValue}
        onChange={handleSecondChange}
      />
    </>
  );

  const categories = [
    'Accessory',
    'All-product',
    'Clothes',
    'Coupon',
    'Discount-Off',
    'Drink',
    'Electronic',
    'Event',
    'Flash-Sale',
    'Food',
    'Shoe',
    'Skincare',
  ];

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent>
        <NavbarBrand>
          <NextLink href="/" className="h-12 w-12">
            <Image src="/logo.png" alt="logo" className="h-12 w-12" />
          </NextLink>
          <NavbarItem className="hidden sm:flex">
            <CategoryButton categories={categories} />
          </NavbarItem>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent>
        <div className="flex gap-4">
          <NavbarItem className="hidden md:flex">{searchInput}</NavbarItem>
        </div>
      </NavbarContent>
      <NavbarContent justify="start" className="hidden gap-4 px-16 lg:flex">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href} isActive={item.href === pathname}>
            <Tooltip
              content={
                <p className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                  {item.tooltip}
                </p>
              }
              offset={10}
              showArrow
              className="hidden lg:block"
            >
              <NextLink
                className={`${
                  item.href === pathname
                    ? 'bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent'
                    : 'text-foreground'
                } transition-all ease-linear hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-600 hover:bg-clip-text hover:font-normal hover:text-transparent`}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </Tooltip>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className="hidden gap-4 lg:flex" justify="center">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <NextLink className={'relative'} href="/wishlist">
            <HeartIcon size={28} />
            <div className="bg-yellow-10 absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
              {uniqueWishlistProducts.length}
            </div>
          </NextLink>
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <NextLink href="/cart" className={'relative'}>
            <CartIcon size={28} />
            <div className="bg-yellow-10 absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
              {uniqueProducts.length}
            </div>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          {isLoggedIn ? (
            <Dropdown placement="bottom-end" shadow="md">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  size="sm"
                  isBordered
                  color={'default'}
                  src={
                    userProfile?.payload?.profile?.url ??
                    `https://i.pravatar.cc/150?u=a042581`
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="shadow">
                <DropdownItem key="profile" className="h-14 gap-2" isDisabled>
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userProfile.payload?.email}</p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" className="text-danger" >
                  <Link href="/profile"> 
                    <p className="text-red-500 hover:text-white">Profile</p>
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <AuthLink />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex h-full flex-col justify-between gap-2">
          <div>
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href} isActive={item.href === pathname}>
                <NextLink
                  className={
                    item.href === pathname ? 'text-warning' : 'text-foreground'
                  }
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </div>
          <AuthLink />
        </div>
      </NavbarMenu>
      <NavbarContent className="basis-1  pl-4 lg:hidden">
        <ThemeSwitch />
        <NextLink className={'relative'} href="/wishlist">
          <HeartIcon size={28} />
          <div className="bg-yellow-10 absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
            {uniqueWishlistProducts.length}
          </div>
        </NextLink>
        <NextLink className={'relative'} href="/cart">
          <CartIcon size={28} />
          <div className="bg-yellow-10 absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
            {uniqueProducts.length}
          </div>
        </NextLink>
        <Avatar
          isBordered
          color="warning"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          size="sm"
        />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
