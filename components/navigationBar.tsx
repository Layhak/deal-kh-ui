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
  NavbarMenuToggle, Tooltip,
} from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { CartIcon, CloseIcon, HeartIcon, SearchIcon } from '@/components/icons';
import CategoryButton from './categoryButton';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { selectToken } from '@/redux/feature/auth/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import AuthLink from '@/components/auth/AuthLink';
import { useSubmitFormMutation } from '@/redux/api';
import { signOut } from '@/app/Auth/auth';
import { useLogoutUserMutation } from '@/redux/service/auth';
import SearchProductDropDown from './search/SearchProduct';
import SearchLocation from './search/SearchLocation';
import SearchProduct from './search/SearchProduct';
import { productSearchList } from '@/types/productSearch';
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'loggedIn') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
const [uniqueWishlistProducts, setUniqueWishlistProducts] = useState<CartProductType[]>([]);

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
  ]

  const searchInput = (
    <>
      {/* for searching product */}
      <SearchProduct products={productSearchList}/>

      {/* for searching location */}
      <SearchLocation />
    </>
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <div className="flex">
        {/* logo section */}
        <NavbarContent>
          <NavbarBrand>
            <NextLink href="/" className="h-12 w-12">
              <Image src="/logo.png" alt="logo" className="h-12 w-12" />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/* category */}
        <NavbarContent>
          <div className="flex gap-4">
            <NavbarItem className="hidden sm:flex ">
              <CategoryButton categories={categories} />
            </NavbarItem>
            {/* search input */}
            <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          </div>
        </NavbarContent>
      </div>

      {/* section menu home, policy, deal, and about */}
      <NavbarContent justify={'start'} className={'hidden gap-4 px-16 sm:flex'}>
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
    <div className={'relative'} onClick={() => router.push(`/wishlist`)}>
      <HeartIcon size={28} />
      <div className="bg-yellow-10 absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
        {uniqueWishlistProducts.length}
      </div>
    </div>
  </NextLink>
</NavbarItem>

<NavbarItem className="hidden lg:flex">
  <div className={'relative'} onClick={() => router.push(`/cart`)}>
    <CartIcon size={28} />
    <div className="bg-yellow-10 absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
      {uniqueProducts.length}
    </div>
  </div>
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
            <AuthLink />
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
                  <button className="rouneded-md bg-warning text-white">
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
