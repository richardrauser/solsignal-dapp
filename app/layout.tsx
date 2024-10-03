import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary",
    site: "@volstrate",
    title: "anglez - abstract, angular, on-chain art",
    description:
      "anglez - abract, angular, on-chain, generative NFT art by volstrate.",
    creator: "@volstrate",
    // "og:image": `https://anglez.xyz/anglez-quadrants.png`,
  },
  openGraph: {
    title: "anglez - abstract, angular, on-chain art",
    url: "https://anglez.xyz/",
    description:
      "anglez - abract, angular, on-chain, generative NFT art by volstrate.  ",
    // images: [{ url: `https://anglez.xyz/anglez-quadrants.png` }],
  },
  // other: {
  //   ...frame Metadata,
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <Toaster />
            <main className="container mx-auto max-w-7xl pt-2 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://www.raaza.net"
                title="raaza - web3 tech consultancy"
              >
                <span className="text-default-600">built by</span>
                <p className="text-primary">raaza</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
