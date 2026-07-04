import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Born To Blossom | Heal, Reconnect & Blossom",
  description:
    "Luxury integrative wellness, psychiatry, family constellation therapy, spiritual healing, tarot guidance, meditation and energy work.",
  openGraph: {
    title: "Born To Blossom",
    description: "A premium sanctuary for healing, growth and awakening.",
    images: ["/images/practitioner-about.webp"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
