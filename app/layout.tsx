import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HOME_URL, SITE_URL, routeMetadata } from "@/content/site-copy";
import "@fontsource-variable/newsreader";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  ...routeMetadata.home,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: `${HOME_URL}favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
