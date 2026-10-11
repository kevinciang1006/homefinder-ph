import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeFinder PH — Find Your Home in Metro Manila",
  description:
    "Portfolio demo: property search for Metro Manila with filters, a map view and comparison. Seed data, not real listings.",
  metadataBase: new URL("https://homefinder.kevinciang.com"),
  openGraph: {
    title: "HomeFinder PH — Find Your Home in Metro Manila",
    description:
      "Portfolio demo: property search for Metro Manila with filters, a map view and comparison. Seed data, not real listings.",
    url: "https://homefinder.kevinciang.com",
    siteName: "HomeFinder PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
