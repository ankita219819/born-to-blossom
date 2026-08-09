import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { BackgroundMusic } from "@/components/audio/BackgroundMusic";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildPageMetadata,
  localBusinessJsonLd,
  SITE_NAME,
  websiteJsonLd
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant"
});

const homeDescription =
  "Multi-modality healing sanctuary in Gurgaon — Family Constellation, Reiki, Sound Healing, Humkaara, Hleem, and 20+ modalities. In-person and online across India and the world.";

export const metadata: Metadata = {
  metadataBase: new URL("https://borntoblossom.in"),
  ...buildPageMetadata({
    title: `${SITE_NAME} | Heal. Release. Reclaim. Blossom.`,
    description: homeDescription,
    path: "/",
    keywords: [
      "Born to Blossom",
      "Soul Awakening",
      "energy healing Gurgaon",
      "Family Constellation Therapy",
      "Reiki Gurgaon",
      "Humkaara",
      "Hleem"
    ]
  }),
  applicationName: SITE_NAME,
  authors: [{ name: "Sonia Verma Bhattacharyya", url: "https://borntoblossom.in/about/founder" }],
  creator: "Sonia Verma Bhattacharyya",
  publisher: SITE_NAME,
  category: "health",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning className={inter.className}>
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
