'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { link as linkStyles } from '@nextui-org/theme'
import NextLink from 'next/link'
import clsx from 'clsx'
import { Spinner } from '@nextui-org/spinner'
import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { Logo } from '@/components/icons'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useReducer, useState } from 'react'
import { getFirebaseAuth } from '@/libs/firebase'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  // const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loadingUser, setLoadingUser] = useState(true)
  const [user, setUser] = useState<User | null | undefined>(null)
  const pathName = usePathname()
  console.log('pathName: ', pathName)

  const auth = getFirebaseAuth()

  onAuthStateChanged(auth, (user: User | null) => {
    console.log('[onAuthStateChanged] User: ', user)
    setUser(user)
    setLoadingUser(false)
  })

  const logoutPressed = async () => {
    setLoadingUser(true)
    await auth.signOut()
  }

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
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
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color="foreground"
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

      <NavbarContent className="pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        {loadingUser ? (
          <Spinner />
        ) : user ? (
          <Button as={Link} color="primary" onPress={logoutPressed} variant="flat">
            Logout
          </Button>
        ) : (
          <Button as={Link} color="primary" href="/login" variant="flat">
            Login
          </Button>
        )}
      </NavbarContent>

      <NavbarContent className="md:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathName == item.href ? 'primary' : 'foreground'}
                href={item.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}
