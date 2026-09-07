import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SoulAssessment } from "@/components/assessment/SoulAssessment";
import { buildPageMetadata, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Soul Assessment — Free 25-Question Healing Diagnostic",
  description:
    "Take the free Lasoma Soul Family Assessment: 25 questions across body, heart, subconscious mind, ancestral lineage, and soul purpose. Receive an instant personalised Prescription of Soul Journey with your primary soul profile and recommended healing modalities.",
  path: "/soul-assessment",
  keywords: [
    "soul assessment",
    "healing quiz",
    "energy healing assessment India",
    "ancestral trauma test",
    "which healing modality do I need",
    "Born to Blossom soul assessment",
    "Family Constellation assessment",
    "womb healing quiz"
  ]
});

const assessmentJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE_URL}/soul-assessment#assessment`,
  name: "Lasoma Soul Family Assessment",
  url: `${SITE_URL}/soul-assessment`,
  applicationCategory: "HealthApplication",
  operatingSystem: "Any modern web browser",
  browserRequirements: "Requires JavaScript",
  description:
    "A 25-question self-assessment across five dimensions — physical and somatic, emotional and heart, subconscious mind, ancestral lineage, and sacred feminine and soul purpose — that instantly generates a personalised healing modality prescription.",
  inLanguage: "en-IN",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR"
  },
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/images/logo.png")
  }
};

export default function SoulAssessmentPage() {
  return (
    <>
      <JsonLd data={assessmentJsonLd} />
      <Navbar />
      <main className="md:pt-24">
        <Container className="pt-6 md:pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Soul Assessment", path: "/soul-assessment" }
            ]}
          />
        </Container>
        <SoulAssessment />
      </main>
      <Footer />
    </>
  );
}
