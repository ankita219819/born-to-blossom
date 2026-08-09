import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestorePageView } from "@/components/programmes/RestorePageView";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "RESTORE — 8-Session Flagship Healing Journey",
  description:
    "RESTORE is Born to Blossom’s flagship 8-session multi-modality healing programme — Recalibrate, Excavate, Surrender, Transform, Open, Rebirth & Emerge.",
  path: "/restore",
  keywords: [
    "RESTORE healing programme",
    "8 session healing journey",
    "Born to Blossom RESTORE",
    "multi-modality healing India"
  ]
});

export default function RestorePage() {
  return (
    <>
      <Navbar />
      <main className="md:pt-24">
        <Container className="pt-6 md:pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "RESTORE", path: "/restore" }
            ]}
          />
        </Container>
        <RestorePageView />
      </main>
      <Footer />
    </>
  );
}
