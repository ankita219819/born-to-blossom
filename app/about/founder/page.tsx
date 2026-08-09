import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FounderPageView } from "@/components/about/FounderPageView";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, founderPersonJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Founder’s Journey | Sonia Verma Bhattacharyya",
  description:
    "Meet Sonia Verma Bhattacharyya, founder of Born to Blossom Soul Awakening in Gurgaon — Humkaara, Hleem, Shakta Tantra, and a guide who walks beside you.",
  path: "/about/founder",
  keywords: [
    "Sonia Verma Bhattacharyya",
    "Born to Blossom founder",
    "Humkaara",
    "Hleem",
    "energy healer Gurgaon"
  ]
});

export default function FounderPage() {
  return (
    <>
      <JsonLd data={founderPersonJsonLd()} />
      <Navbar />
      <main className="md:pt-24">
        <Container className="pt-6 md:pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Founder", path: "/about/founder" }
            ]}
          />
        </Container>
        <FounderPageView />
      </main>
      <Footer />
    </>
  );
}
