'use client';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  ScrollShadow,
  Tooltip,
} from '@nextui-org/react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import SearchProduct from './search/SearchProduct';
import SearchLocation from './search/SearchLocation';
import { BiUserCircle } from 'react-icons/bi';

import { useGetAllShopsByOwnerQuery } from '../redux/service/shop';
import { CartIcon, HeartIcon, MapIcon } from './icons';
import { ThemeSwitch } from './ThemeSwitch';
import { siteConfig } from '../config/site';
import AuthLink from './auth/AuthLink';
import HeaderCreateShop from './header/HeaderCreateShop';
import { useGetAllUserWishListQuery } from '../redux/service/wishList';
import { Product } from '../libs/difinition';
import { selectProducts } from '../redux/feature/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import {
  removeAccessToken,
  setLogoutSuccess,
} from '../redux/feature/auth/authSlice';
import { useLogoutUserMutation } from '../redux/service/auth';
import { useGetProfileQuery } from '../redux/service/user';
import Loading from '../app/(user)/loading';
import { Icon } from '@iconify/react';

export const NavigationBar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const router = useRouter();

  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useAppDispatch();
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      dispatch(removeAccessToken());
      dispatch(setLogoutSuccess(true));
      setIsLoggedIn(false);
      toast.success('Logout successfully.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      localStorage.removeItem('loggedIn');
      router.push('/');
    } catch (error) {
      toast.error('Failed to logout.', {
        position: 'top-right',
        autoClose: 2000,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const products = useAppSelector(selectProducts);
  const [uniqueProducts, setUniqueProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unique = products.filter(
      (product: { slug: any }, index: any, self: any[]) =>
        index === self.findIndex((t) => t.slug === product.slug)
    );
    setUniqueProducts(unique);
  }, [products]);

  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const [wishlistItemUuid, setWishlistItemUuid] = useState<string | null>(null);

  // Initial fetch with limited size
  const {
    data: initialWishListData,
    error: initialError,
    isLoading: initialLoading,
  } = useGetAllUserWishListQuery({ page: 1, size: 1 });

  useEffect(() => {
    if (
      initialWishListData &&
      initialWishListData.payload &&
      initialWishListData.payload.pagination
    ) {
      setTotalElements(initialWishListData.payload.pagination.totalElements);
      setPageSize(initialWishListData.payload.pagination.totalElements);
    }
  }, [initialWishListData]);

  // Subsequent fetch with the correct page size
  const {
    data: wishListData,
    error,
    isLoading,
    refetch: refetchWishList,
  } = useGetAllUserWishListQuery({
    page: 1,
    size: pageSize,
  });

  useEffect(() => {
    if (userProfile && !initialLoading) {
      setIsLoggedIn(true);
      refetchWishList();
    }
  }, [userProfile, refetchWishList, initialLoading]);

  const wishlistCount = wishListData?.payload?.pagination?.totalElements || 0;

  const { data: userShops, isLoading: isLoadingUserShops } =
    useGetAllShopsByOwnerQuery({});

  useEffect(() => {
    console.log('User Shops:', userShops);
  }, [userShops]);

  const hasShop: any = userShops?.payload?.pagination?.totalElements > 0;

  console.log('Has Shop:', hasShop);
  const searchInput = (
    <>
      <SearchProduct />
      <SearchLocation />
    </>
  );

  return (
    <>
      <HeaderCreateShop isMenuOpen={isMenuOpen} hasShop={hasShop} />
      <Navbar
        isBlurred
        position="sticky"
        maxWidth={'xl'}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
          base: 'bg-default-50 md:bg-default-50/80 backdrop-blur-md	',
          menu: 'bg-default-50 md:bg-default-50/80 backdrop-blur-md	',
          item: [
            'relative',
            'h-1/2',
            "data-[active=true]:after:content-['']",
            'data-[active=true]:after:absolute',
            'data-[active=true]:after:bottom-0',
            'data-[active=true]:after:left-0',
            'data-[active=true]:after:right-0',
            'data-[active=true]:after:h-[2px]',
            'data-[active=true]:after:rounded-[2px]',
            'data-[active=true]:after:bg-gradient-to-r',
            'data-[active=true]:after:from-pink-500',
            'data-[active=true]:after:to-yellow-500',
            'data-[active=true]:after:transition-colors',
            'data-[active=true]:after:transition-colors',
            'hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent',
            'data-[active=true]:after:duration-300',
          ],
          menuItem: [
            'rounded-md',
            'px-4',
            'py-2',
            'hover:bg-default-900/10',
            'data-[active=true]:bg-default-900/10',
          ],
        }}
      >
        <NavbarContent justify={'center'} className={'flex items-center gap-4'}>
          <NextLink href="/">
            <NavbarBrand>
              <Image src="/logo.png" alt="logo" width={50} height={50} />
            </NavbarBrand>
          </NextLink>
          <NavbarItem className="hidden w-full items-center sm:flex">
            <SearchProduct />
            <Tooltip
              content={
                <p className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                  Search Nearby Shop
                </p>
              }
              showArrow
              offset={10}
            >
              <Button
                isIconOnly
                as={NextLink}
                size={'lg'}
                href={'/search-nearby'}
                variant={'light'}
                radius={'full'}
              >
                <MapIcon size={28} />
              </Button>
            </Tooltip>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent
          justify={'center'}
          className={'hidden gap-4 pe-16 lg:flex'}
        >
          {siteConfig.navItems.map((item: any) => (
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
                      ? 'bg-gradient-to-r from-pink-500 to-warning-500 bg-clip-text text-transparent '
                      : 'text-foreground hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent'
                  } relative`}
                  href={item.href}
                  aria-current={item.href === pathname ? 'page' : undefined}
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
          <NavbarItem className="sm:flex">
            <NextLink
              className={'relative'}
              href={isLoggedIn ? '/wishlist' : '/login'}
            >
              <Badge
                color="danger"
                className={'bg-gradient-to-r from-pink-500 to-yellow-500'}
                content={wishlistCount}
                isInvisible={wishlistCount <= 0}
                variant="solid"
                shape="circle"
                size="sm"
              >
                <HeartIcon className="fill-current" size={30} />
              </Badge>
            </NextLink>
          </NavbarItem>
          <NavbarItem className="sm:flex">
            <NextLink
              href={isLoggedIn ? '/cart' : '/login'}
              className={'relative'}
            >
              <Badge
                color="danger"
                className={'bg-gradient-to-r from-pink-500 to-yellow-500'}
                content={uniqueProducts.length}
                isInvisible={uniqueProducts.length <= 0}
                variant="solid"
                shape="circle"
                size="sm"
              >
                <CartIcon className="fill-current" size={30} />
              </Badge>
            </NextLink>
          </NavbarItem>

          <NavbarItem>
            {isLoggedIn ? (
              <Dropdown size={'lg'} placement="bottom-start" shadow="md">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform"
                    size="sm"
                    isBordered
                    color={'default'}
                    src={
                      userProfile?.payload?.profile ||
                      `https://i.pravatar.cc/150?u=a042581`
                    }
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="shadow">
                  <DropdownItem
                    key="profile"
                    className="h-14 w-full gap-2"
                    isDisabled
                  >
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">
                      {userProfile?.payload?.email}
                    </p>
                  </DropdownItem>
                  <DropdownItem
                    href={'/profile'}
                    key="profile"
                    className=" w-full gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        icon={'bi:person-circle'}
                        width={22}
                        className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                      />
                      <p className="font-semibold">Profile</p>
                    </div>
                  </DropdownItem>
                  {hasShop && (
                    <DropdownItem
                      href={'https://dealkh-admin.istad.co'}
                      key="my-shop"
                      className=" w-full gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                          icon="weui:shop-filled"
                          width={24}
                        />
                        <p className="font-semibold">My Shop</p>
                      </div>
                    </DropdownItem>
                  )}
                  <DropdownItem
                    key="logout"
                    color="danger"
                    className="text-danger"
                    onClick={handleLogout}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                        icon="memory:logout"
                        width={24}
                      />
                      <p className="font-semibold">Log out</p>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <AuthLink />
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className={'z-50'}>
          {!isLoggedIn && (
            <>
              <NavbarMenuItem>
                <Link href={'/login'} className={' group w-full'}>
                  <p
                    className={
                      'text-foreground group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent'
                    }
                  >
                    Log In
                  </p>
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href={'/register'} className={' group w-full'}>
                  <p
                    className={
                      'text-foreground group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent'
                    }
                  >
                    Register
                  </p>
                </Link>
              </NavbarMenuItem>
            </>
          )}
          {siteConfig.navItems.map((item: any) => (
            <NavbarMenuItem key={item.href} isActive={item.href === pathname}>
              <Link
                className={` group w-full`}
                href={item.href}
                aria-current={item.href === pathname ? 'page' : undefined}
              >
                <p
                  className={`${
                    item.href === pathname
                      ? 'bg-gradient-to-r from-pink-500 to-warning-500 bg-clip-text text-transparent'
                      : 'text-foreground group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent'
                  }`}
                >
                  {item.label}
                </p>
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
        <NavbarContent className="basis-3  lg:hidden" justify="center">
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={'relative'}
              href={isLoggedIn ? '/wishlist' : '/login'}
            >
              <Badge
                color="danger"
                className={'bg-gradient-to-r from-pink-500 to-yellow-500'}
                content={wishlistCount}
                isInvisible={wishlistCount <= 0}
                variant="solid"
                shape="circle"
                size="sm"
              >
                <HeartIcon className="fill-current" size={32} />
              </Badge>
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              href={isLoggedIn ? '/cart' : '/login'}
              className={'relative'}
            >
              <Badge
                color="danger"
                className={'bg-gradient-to-r from-pink-500 to-yellow-500'}
                content={uniqueProducts.length}
                isInvisible={uniqueProducts.length <= 0}
                variant="solid"
                shape="circle"
                size="sm"
              >
                <CartIcon className="fill-current" size={32} />
              </Badge>
            </NextLink>
          </NavbarItem>
          {isLoggedIn && (
            <Dropdown size={'lg'} placement="bottom-start" shadow="md">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  size="sm"
                  isBordered
                  color={'default'}
                  src={
                    userProfile?.payload?.profile ||
                    `https://i.pravatar.cc/150?u=a042581`
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="shadow">
                <DropdownItem
                  key="profile"
                  className="h-14 w-full gap-2"
                  isDisabled
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userProfile?.payload?.email}</p>
                </DropdownItem>
                <DropdownItem
                  href={'/profile'}
                  key="profile"
                  className=" w-full gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={'bi:person-circle'}
                      width={22}
                      className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                    />
                    <p className="font-semibold">Profile</p>
                  </div>
                </DropdownItem>
                {hasShop && (
                  <DropdownItem
                    href={'https://dealkh-admin.istad.co'}
                    key="my-shop"
                    className=" w-full gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                        icon="weui:shop-filled"
                        width={24}
                      />
                      <p className="font-semibold">My Shop</p>
                    </div>
                  </DropdownItem>
                )}
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  onClick={handleLogout}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                      icon="memory:logout"
                      width={24}
                    />
                    <p className="font-semibold">Log out</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>
      </Navbar>
      {!isMenuOpen && (
        <Navbar
          position="sticky"
          className={'top-14 sm:hidden'}
          maxWidth={'xl'}
          classNames={{
            base: 'bg-default-50/80 backdrop-blur-md	',
            menu: ['bg-default-50/80 backdrop-blur-md	'],
          }}
        >
          <ScrollShadow
            hideScrollBar
            orientation={'horizontal'}
            size={20}
            className={'w-300px h-50px items-center'}
          >
            <NavbarContent>
              <NavbarItem>
                <SearchProduct />
                <Button
                  isIconOnly
                  as={NextLink}
                  size={'lg'}
                  href={'/search-nearby'}
                  variant={'light'}
                  radius={'full'}
                >
                  <MapIcon size={28} />
                </Button>
              </NavbarItem>
            </NavbarContent>
          </ScrollShadow>
        </Navbar>
      )}
    </>
  );
};
