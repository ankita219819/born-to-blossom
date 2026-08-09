import type { Metadata } from "next";
import { faqItems } from "@/lib/faq-content";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqPageView } from "@/components/faq/FaqPageView";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, faqPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about energy healing, online sessions, therapy differences, children, cancellation, payment plans, and mental health support at Born to Blossom.",
  path: "/faq",
  keywords: [
    "Born to Blossom FAQ",
    "online energy healing",
    "is Reiki safe",
    "Family Constellation questions"
  ]
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(faqItems)} />
      <Navbar />
      <main className="md:pt-24">
        <Container className="pt-6 md:pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "FAQ", path: "/faq" }
            ]}
          />
        </Container>
        <FaqPageView />
      </main>
      <Footer />
    </>
  );
}
