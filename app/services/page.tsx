import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesOverview } from "@/components/services/ServicesOverview";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Healing Services | 20+ Modalities",
  description:
    "Explore 20+ healing modalities in Gurgaon and online — Reiki, Family Constellation, Humkaara, Hleem, QBR, Sound Healing, RESTORE, corporate wellness, and more.",
  path: "/services",
  image: "/images/spiritual_healing.png",
  keywords: [
    "healing services Gurgaon",
    "Reiki",
    "Family Constellation",
    "energy healing India",
    "Born to Blossom services"
  ]
});

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="md:pt-24">
        <Container className="relative z-10 pt-6 md:pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" }
            ]}
          />
        </Container>
        <ServicesOverview />
      </main>
      <Footer />
    </>
  );
}
