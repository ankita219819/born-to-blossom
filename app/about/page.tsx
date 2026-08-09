import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutPageView } from "@/components/about/AboutPageView";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Born to Blossom Soul Awakening is a multi-modality healing sanctuary in Gurgaon — Who We Are, our story, five healing principles, and our reach across India and the world.",
  path: "/about",
  keywords: ["Born to Blossom about", "healing sanctuary Gurgaon", "Soul Awakening"]
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="md:pt-24">
        <Container className="pt-6 md:pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" }
            ]}
          />
        </Container>
        <AboutPageView />
      </main>
      <Footer />
    </>
  );
}
