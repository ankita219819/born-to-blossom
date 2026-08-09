import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CorporatePageView } from "@/components/programmes/CorporatePageView";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Corporate Wellness & Retreats",
  description:
    "Custom corporate wellness programmes and 1–3 day leadership retreats in Delhi NCR and across India — mindfulness, sound healing, Business Constellation, and more.",
  path: "/corporate",
  keywords: [
    "corporate wellness Gurgaon",
    "leadership retreat Delhi NCR",
    "corporate sound bath",
    "Business Constellation"
  ]
});

export default function CorporatePage() {
  return (
    <>
      <Navbar />
      <main className="md:pt-24">
        <Container className="pt-6 md:pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Corporate", path: "/corporate" }
            ]}
          />
        </Container>
        <CorporatePageView />
      </main>
      <Footer />
    </>
  );
}
