"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { useAuth } from "@/context/AuthUserContext";
import { logout } from "@/lib/auth";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  console.log("pathName: ", pathName);

  const { authUser, authLoading: loading } = useAuth();

  const logoutPressed = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <NextUINavbar
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 md:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">SolSignal</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({
                    color: pathName == item.href ? "primary" : "foreground",
                  }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarContent className="pl-4" justify="end">
          <ThemeSwitch />
        </NavbarContent>
        {loading ? (
          <Spinner />
        ) : authUser ? (
          <Button
            as={Link}
            color="primary"
            variant="flat"
            onPress={logoutPressed}
          >
            Logout
          </Button>
        ) : (
          <Button as={Link} color="primary" href="/login" variant="flat">
            Login
          </Button>
        )}
      </NavbarContent>

      <NavbarContent className="md:hidden" justify="end">
        <NavbarContent className="pl-4" justify="end">
          <ThemeSwitch />
        </NavbarContent>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathName == item.href ? "primary" : "foreground"}
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {loading ? (
            <Spinner />
          ) : authUser ? (
            <Button
              as={Link}
              color="primary"
              variant="flat"
              onPress={logoutPressed}
            >
              Logout
            </Button>
          ) : (
            <Button
              as={Link}
              color="primary"
              href="/login"
              variant="flat"
              onPress={() => setIsMenuOpen(false)}
            >
              Login
            </Button>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
