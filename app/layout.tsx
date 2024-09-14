import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { Link } from '@nextui-org/link'
import clsx from 'clsx'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  twitter: {
    card: 'summary',
    site: '@volstrate',
    title: 'anglez - abstract, angular, on-chain art',
    description: 'anglez - abract, angular, on-chain, generative NFT art by volstrate.',
    creator: '@volstrate',
    // "og:image": `https://anglez.xyz/anglez-quadrants.png`,
  },
  openGraph: {
    title: 'anglez - abstract, angular, on-chain art',
    url: 'https://anglez.xyz/',
    description: 'anglez - abract, angular, on-chain, generative NFT art by volstrate.  ',
    // images: [{ url: `https://anglez.xyz/anglez-quadrants.png` }],
  },
  // other: {
  //   ...frame Metadata,
  // },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <Toaster />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://www.raaza.net"
                title="raaza - web3 tech consultancy"
              >
                <span className="text-default-600">created by</span>
                <p className="text-primary">raaza</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
