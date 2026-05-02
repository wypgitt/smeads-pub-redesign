import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Smeads Pub — Washougal’s Ultimate Upper End Dive Bar",
    template: "%s | Smeads Pub",
  },
  description:
    "Neighborhood bar since 1931: twenty taps, daily specials, karaoke, live music, beer garden. 3395 Evergreen Way, Washougal, WA.",
  openGraph: {
    title: "Smeads Pub — Washougal’s Ultimate Upper End Dive Bar",
    description:
      "Full bar, twenty taps, happy hour, karaoke, live bands, and a beer garden on the Columbia.",
    url: "https://smeadspub.com",
    siteName: "Smeads Pub",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
