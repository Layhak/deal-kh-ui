'use client';
import {
  Avatar,
  Button,
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
import { signOut } from 'next-auth/react';
import { SetStateAction, useEffect, useState } from 'react';
import { CartIcon, CloseIcon, HeartIcon, SearchIcon } from '@/components/icons';
import CategoryButton from './categoryButton';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { selectToken } from '@/redux/feature/auth/authSlice';
import { usePathname } from 'next/navigation';

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

  // const { data: session } = useSession()
  // console.log('Session', session);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  console.log('Token', token);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // const users = useSelector(selectUsers);
  const pathname = usePathname();
  // useEffect(() => {
  //   const authToken = token || session;
  //   setIsAuthenticated(!!authToken);
  // }, [session, token]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Retrieve the dummy text from localStorage
    // Compare the dummy text
    if (localStorage.getItem('loggedIn') === 'loggedIn') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseUrl}logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.status === 200) {
        localStorage.removeItem('loggedIn');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
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
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="max-w-fit gap-4">
          <NextLink className="flex items-center justify-start gap-1" href="/">
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
      <NavbarContent justify={'start'} className={'hidden gap-4 px-16 sm:flex'}>
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
            <HeartIcon size={28} />
          </NextLink>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <NextLink href="/cart">
            <CartIcon size={28} />
          </NextLink>
        </NavbarItem>
        <NavbarItem>
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
            <NextLink href="/login">
              <div className="st-current group relative flex min-w-[120px] items-center gap-2 overflow-hidden rounded-full border-0 p-[2px] font-semibold text-gray-50 outline-0 dark:text-gray-100 ">
                <span
                  className="absolute inset-[-100%] animate-[spin_3s_linear_infinite]
                 bg-[conic-gradient(from_90deg_at_50%_50%,#EAB318_0%,#EC4950_50%,#EAB408_100%)]
                 dark:bg-[conic-gradient(from_90deg_at_50%_50%,#EAB308_0%,#EC4899_50%,#EAB308_100%)]"
                ></span>
                <Button
                  size="md"
                  variant={'solid'}
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-transparent/0 text-sm  font-medium text-gray-50 backdrop-blur-3xl transition-all ease-linear group-hover:bg-transparent/20 dark:bg-transparent dark:text-gray-100"
                >
                  Login
                </Button>
              </div>
            </NextLink>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {/* Search bar */}
          <NavbarItem>{searchInput}</NavbarItem>
          {/* Login button */}
          {!isLoggedIn ? (
            <>
              <NavbarItem>
                <NextLink href="/login">
                  <button className="rouneded-md bg-warning px-2 text-white">
                    Login
                  </button>
                </NextLink>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem className="hidden lg:flex">
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
                    onClick={() => signOut()}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
};
