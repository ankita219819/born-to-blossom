import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WorkshopsPageView } from "@/components/programmes/WorkshopsPageView";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Workshops, Sound Baths & Practitioner Training",
  description:
    "New Moon healing circles, Full Moon Sound Baths, Family Constellation intensives, online retreats, and practitioner certifications in Reiki, Humkaara, Hleem, and more.",
  path: "/workshops",
  keywords: [
    "New Moon healing circle Gurgaon",
    "Sound Bath Delhi NCR",
    "Reiki practitioner training",
    "Humkaara certification"
  ]
});

export default function WorkshopsPage() {
  return (
    <>
      <Navbar />
      <main className="md:pt-24">
        <Container className="pt-6 md:pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Workshops", path: "/workshops" }
            ]}
          />
        </Container>
        <WorkshopsPageView />
      </main>
      <Footer />
    </>
  );
}
