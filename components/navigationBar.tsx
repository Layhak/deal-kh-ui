'use client';
import {
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
} from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import { ThemeSwitch } from '@/components/ThemeSwitch';

import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { SetStateAction, useState } from 'react';
import { CartIcon, CloseIcon, HeartIcon, SearchIcon } from '@/components/icons';
import CategoryButton from './CategoryButton';

type ValueTypes = {
  email: string;
  password: string;
};

const initialValues: ValueTypes = {
  email: '',
  password: '',
};

export const NavigationBar = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const handleLogin = (values: ValueTypes) => {
    setLoading(true);

    // handle request api via login
    fetch(`http://localhost:3000/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    signOut();
  };

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

  const handleSubmit = () => {
    console.log('Search Value:', searchValue);
    console.log('Second Value:', secondValue);
  };

  const searchInput = (
    <>
      <Input
        aria-label="First Input"
        classNames={{
          inputWrapper: 'bg-default-100 rounded-none rounded-l-xl',
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
          inputWrapper: 'bg-default-100 rounded-none rounded-r-xl',
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

  //
  if (!session) {
    return (
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand className="max-w-fit gap-4">
            <NextLink
              className="flex items-center justify-start gap-1"
              href="/"
            >
              <Image
                src="/logo.png"
                alt="Description of the image"
                width={32}
                height={32}
              />
              <p className="hidden text-sm font-bold text-inherit">DealKH</p>
            </NextLink>
            <NavbarItem className="hidden sm:flex">
              <CategoryButton categories={categories} />
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent
          justify={'start'}
          className={'hidden gap-4 px-16 sm:flex'}
        >
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} isActive={item.href === pathname}>
              <NextLink
                className={`${
                  item.href === pathname
                    ? ' bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent'
                    : 'text-foreground'
                } transition-all ease-linear hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-600 hover:bg-clip-text hover:font-normal hover:text-transparent`}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <NextLink href="/wishlist">
              <HeartIcon />
            </NextLink>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <NextLink href="/cart">
              <CartIcon />
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink href="/login">
              <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-2 text-sm font-medium text-white hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                Login
              </button>
            </NextLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {/* Search bar */}
            <NavbarItem>{searchInput}</NavbarItem>
            {/* Login button */}
            {!isAuthenticated && (
              <NavbarItem>
                <NextLink href="/login">
                  <button className="rouneded-md bg-warning px-2 text-white">
                    Login
                  </button>
                </NextLink>
              </NavbarItem>
            )}
            {/* Nav items */}
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href} isActive={item.href === pathname}>
                <NextLink
                  className={
                    item.href === pathname
                      ? ' bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent'
                      : 'text-foreground'
                  }
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </div>
        </NavbarMenu>
        <NavbarContent className="basis-1 sm:hidden" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>
      </NextUINavbar>
    );
  }
  // when have session
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* logo with search bar */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Image
              src="/logo.png"
              alt="Description of the image"
              width={75}
              height={75}
            />
            {/* <p className="font-bold text-warning">DealKH</p> */}
          </NextLink>

          <NavbarItem className="hidden sm:flex">
            <CategoryButton categories={categories} />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex md:flex lg:flex">
            {searchInput}
          </NavbarItem>
        </NavbarBrand>
      </NavbarContent>
      {/* List of nav bar */}
      <NavbarContent justify={'end'} className={'hidden lg:flex'}>
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href} isActive={item.href === pathname}>
            <NextLink
              className={`${
                item.href === pathname
                  ? ' bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent'
                  : 'text-foreground'
              }  transition-all ease-in-out`}
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent
        className="enter hidden basis-1/5 sm:flex sm:basis-full lg:flex"
        justify="end"
      >
        <NavbarItem className="hidden justify-center gap-4 lg:flex">
          <ThemeSwitch />
          <NextLink href="/wishlist">
            <HeartIcon />
          </NextLink>
          <NextLink href="/cart">
            <CartIcon />
          </NextLink>
        </NavbarItem>

        {isAuthenticated ? (
          <NavbarItem className="">
            <Dropdown placement="bottom-end" shadow={'md'}>
              <DropdownTrigger>
                {/* profile authentication */}
                {/* <Avatar
                  isBordered
                  src={session.user?.image as string}
                  color="warning"
                  className="w-8 h-8  mb-2"
                /> */}
                <Image
                  src={session.user?.image as string}
                  alt="Profile Image"
                  className="mb-2 h-8 w-8 rounded-full border-2 border-warning"
                ></Image>

                {/*  */}
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="shadow">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  isDisabled={false}
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session.user?.name}</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="warning"
                  className={'font-semibold'}
                  href="/profile"
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="warning"
                  className={'font-semibold'}
                  href="/login"
                >
                  Switch
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className={'text-danger'}
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <NextLink href="/login">
              <button className="rouneded-md bg-warning px-2 text-white">
                Login
              </button>
            </NextLink>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {/* Search bar */}
          <NavbarItem>{searchInput}</NavbarItem>
          {/* Login button */}
          {!isAuthenticated && (
            <NavbarItem>
              <NextLink href="/login">
                <button className="rouneded-md bg-warning px-2 text-white">
                  Login
                </button>
              </NextLink>
            </NavbarItem>
          )}
          {/* Nav items */}
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} isActive={item.href === pathname}>
              <NextLink
                className={
                  item.href === pathname ? 'text-[#EAB308]' : 'text-foreground'
                }
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarMenu>

      <NavbarContent className="basis-1 pl-4 lg:hidden" justify="end">
        <ThemeSwitch />
        <HeartIcon />
        <CartIcon />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
