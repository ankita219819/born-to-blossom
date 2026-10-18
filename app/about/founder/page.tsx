import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FounderPageView } from "@/components/about/FounderPageView";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, founderPersonJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  // Keep name out of the <title> so homepage can win "Sonia …" / brand name searches.
  title: "Founder’s Journey",
  description:
    "The story behind Born to Blossom Soul Awakening in Gurgaon — original modalities Humkaara and Hleem, Shakta Tantra roots, and a guide who walks beside you.",
  path: "/about/founder",
  keywords: [
    "Born to Blossom founder",
    "Humkaara",
    "Hleem",
    "energy healer Gurgaon",
    "Soul Awakening journey"
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
