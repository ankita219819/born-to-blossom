import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

const SoulAssessment = dynamic(
  () => import("@/components/assessment/SoulAssessment").then((m) => m.SoulAssessment),
  {
    loading: () => (
      <div className="mx-auto h-[420px] max-w-3xl animate-pulse rounded-[28px] border border-[#EFE5DA] bg-[#FFFDFC]" />
    )
  }
);

export const metadata: Metadata = buildPageMetadata({
  title: "Soul Assessment — Free 37-Question Healing Diagnostic",
  description:
    "Take the free Lasoma Soul Family Assessment: 37 questions across mind, body, money, relationships, ancestry, career, spirit and your chakra map. Receive an instant personalised Prescription of Soul Journey with your soul profile, healing timeline, personal letter and recommended next step.",
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
    "A 37-question self-assessment across seven life areas — mind and emotions, body and nervous system, money, relationships, ancestry, career and spirit — plus a seven-chakra body map, that instantly generates a personalised Prescription of Soul Journey.",
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
    logo: absoluteUrl("/images/logo.webp")
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
