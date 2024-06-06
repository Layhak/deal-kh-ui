'use client';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Button,
  Link,
} from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import SearchBar from '@/components/SearchBar';
import {
  Logo,
  SearchIcon,
  CartIcon,
  HeartFilledIcon,
} from '@/components/Icons';
import { usePathname } from 'next/navigation';
import { signOut, signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Input, Image } from "@nextui-org/react";
import WishlistComponent from './WishlistComponent';
import CartComponent from './CartComponent';

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
  const isAuthenticated = status === 'authenticated'

  const handleLogin = (values: ValueTypes) => {
    setLoading(true);

    // handle request api via login
    fetch(`http://localhost:3000/api/login`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      labelPlacement="outside"
      placeholder="Search..."
      endContent={
        <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
      }
      type="search"
    />
  );

  // 
  if (!session) {
    return (
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand className="max-w-fit gap-3">
            <NextLink className="flex items-center justify-start gap-1" href="/">
              <Image
                src="/logo.png"
                alt="Description of the image"
                width={50}
                height={500}
              />
              <p className="font-bold text-inherit">DealKH</p>
            </NextLink>
            <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          </NavbarBrand>
        </NavbarContent>
        {/* List of nav bar */}
        <NavbarContent justify={'center'} className={'hidden lg:flex'}>
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
        </NavbarContent>
        <NavbarContent
          className="hidden basis-1/5 sm:flex sm:basis-full justify-center align-center"
          justify="end"
        >
          <NavbarItem className="hidden gap-2 lg:flex ">
            <ThemeSwitch />
            <NextLink href="/wishlist">
              <HeartFilledIcon />
            </NextLink>
            <NextLink href="/cart">
              <CartIcon />
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink href="/login">
            <Button className="bg-orange-500">Login</Button>
            </NextLink>
          </NavbarItem>
          {/* {isAuthenticated ? (
            <NavbarItem className="hidden lg:flex">
              <Dropdown placement="bottom-end" shadow={'md'}>
                <DropdownTrigger>
                  
                  <div className="w-12 h-12 relative mb-2">
                    <Image
                      src={session.user?.image ?? '/default-avatar.png'}
                      alt="User Profile"
                      className="object-cover rounded-full"
                    />
                  </div>
                  
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="shadow">
                  <DropdownItem
                    key="profile"
                    className="h-14 gap-2"
                    isDisabled={false}
                  >
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{session.user?.name ?? 'Unknown'}</p>
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
                <Button className="bg-orange-500">Login</Button>
              </NextLink>
            </NavbarItem>
          )} */}

        </NavbarContent>
        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
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
        </NavbarMenu>

        <NavbarContent className="basis-1 pl-4 lg:hidden" justify="end">
          <HeartFilledIcon />
          <CartIcon />
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>
      </NextUINavbar>

    );
  }
  // when have session   

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Image
              src="/logo.png"
              alt="Description of the image"
              width={50}
              height={500}
            />
            <p className="font-bold text-inherit">DealKH</p>
          </NextLink>
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        </NavbarBrand>
      </NavbarContent>
      {/* List of nav bar */}
      <NavbarContent justify={'center'} className={'hidden lg:flex'}>
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
      </NavbarContent>
      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full align-center"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 lg:flex ">
          <ThemeSwitch />
          <NextLink href="/wishlist">
            <HeartFilledIcon />
          </NextLink>
          <NextLink href="/cart">
            <CartIcon />
          </NextLink>
        </NavbarItem>

        {isAuthenticated ? (
          <NavbarItem className="hidden lg:flex">
            <Dropdown placement="bottom-end" shadow={'md'}>
              <DropdownTrigger>
                {/* profile authentication */}
                <div className="w-12 h-12 relative mb-2">
                  <Image
                    src={session.user?.image as string}
                    alt="User Profile"
                    className="object-cover rounded-full"
                  />
                </div>
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
              <Button className="bg-orange-500">Login</Button>
            </NextLink>

          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
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
      </NavbarMenu>

      <NavbarContent className="basis-1 pl-4 lg:hidden" justify="end">
        <HeartFilledIcon />
        <CartIcon />
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
