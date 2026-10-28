import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/instrument-sans/index.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { SITE } from "@/lib/site";

const description =
  "Sell the data center hardware you're retiring and source the parts OEMs can't ship. Instant value estimates, NIST 800-88 data destruction and on-site de-installation from an independent hardware desk, since 2011.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "SUR Technology | Enterprise hardware buyback and sourcing",
    template: "%s | SUR Technology",
  },
  description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Sell what you're retiring. Buy what you can't get.",
    description,
    url: SITE.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUR Technology | Enterprise hardware buyback and sourcing",
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#121719",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
