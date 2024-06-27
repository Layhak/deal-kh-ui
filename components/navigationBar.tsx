'use client';
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
} from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { CartIcon, CloseIcon, HeartIcon, SearchIcon } from '@/components/icons';
import CategoryButton from './categoryButton';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { selectToken } from '@/redux/feature/auth/authSlice';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import AuthLink from '@/components/auth/AuthLink';
import { useSubmitFormMutation } from '@/redux/api';
import { useLogoutUserMutation } from '@/redux/service/auth';

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'loggedIn') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
          <NavbarItem className="hidden sm:flex ">
            <CategoryButton categories={categories} />
          </NavbarItem>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent>
        <div className="flex gap-4">
          <NavbarItem className="hidden md:flex">{searchInput}</NavbarItem>
        </div>
      </NavbarContent>
      <NavbarContent justify={'start'} className={'hidden gap-4 px-16 lg:flex'}>
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href} isActive={item.href === pathname}>
            <Tooltip
              content={
                <p
                  className={
                    'bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent'
                  }
                >
                  {item.tooltip}
                </p>
              }
              offset={10}
              showArrow
              className={'hidden lg:block'}
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
          <NextLink href="/wishlist">
            <HeartIcon size={28} />
          </NextLink>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <NextLink href="/cart">
            <CartIcon size={28} />
          </NextLink>
        </NavbarItem>
        <NavbarItem className={'hidden lg:flex'}>
          {isLoggedIn ? (
            <Dropdown placement="bottom-end" shadow={'md'}>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="warning"
                  size="sm"
                  src={`https://i.pravatar.cc/150?u=a042581f4e29026704d`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="shadow">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  isDisabled={true}
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{'test@gmail.com'}</p>
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
      <NavbarContent className=" basis-3 pl-4 lg:hidden" justify="end">
        <ThemeSwitch />
        <NextLink href="/wishlist">
          <HeartIcon size={32} />
        </NextLink>
        <NextLink href="/cart">
          <CartIcon size={32} />
        </NextLink>
        {/*<ThemeSwitch />*/}
        <Avatar
          isBordered
          color="warning"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          size={'sm'}
        />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
