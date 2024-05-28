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
} from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import { ThemeSwitch } from '@/components/theme-switch';
import { Logo, SearchIcon, CartIcon, HeartFilledIcon } from '@/components/icons';
import { usePathname } from 'next/navigation';
import { signOut, signIn } from 'next-auth/react';
import { useState } from 'react';
import { Input } from "@nextui-org/input";

type ValueTypes = {
  email: string;
  password: string;
}

const initialValues: ValueTypes = {
  email: "",
  password: "",
}

export const NavigationBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: ValueTypes) => {
    setLoading(true);

    // handle request to api via login
    fetch(`http://localhost:3000/api/login`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(values),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setLoading(false);
    })
    .catch((error)=>{
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
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      endContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
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
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 lg:flex">
          <ThemeSwitch />
        </NavbarItem>
        {isAuthenticated ? (
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
                  <p className="font-semibold">Hello</p>
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
            <div className="h-full pt-2 pr-4">
              <NextLink href="/wishlist">
                <HeartFilledIcon />
              </NextLink>
            </div>
            <div className="h-full pt-2 pr-4">
              <NextLink href="/cart">
                <CartIcon className="w-[28px] h-[28px]"/>
              </NextLink>
            </div>
            <NextLink href="/login">
              <Button>Login</Button>
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
