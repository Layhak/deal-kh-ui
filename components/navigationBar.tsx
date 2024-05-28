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
} from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from '@/components/icons';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

// Utility function to get a specific cookie
// Utility function to get a specific cookie

export const NavigationBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // const users = useSelector(selectUsers);
  const pathname = usePathname();
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
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
        {/*<NavbarItem>*/}
        {/*  <NextLink*/}
        {/*    href={'/users'}*/}
        {/*  >*/}
        {/*    Users ({users.length})*/}
        {/*  </NextLink>*/}
        {/*</NavbarItem>*/}
      </NavbarContent>
      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 lg:flex">
          <ThemeSwitch />
        </NavbarItem>
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
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
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
        <ThemeSwitch />
        <Avatar
          isBordered
          color="secondary"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          size={'sm'}
        />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
