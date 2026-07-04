import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FooterRightTree } from "@/components/decorations/FooterRightTree";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Services } from "@/components/services/Services";
import { FamilyConstellation } from "@/components/family/FamilyConstellation";
import { SmoothScroll } from "@/components/smooth-scroll";

const Videos = dynamic(() => import("@/components/videos/Videos").then((m) => m.Videos), {
  loading: () => <section className="section-pad" aria-hidden />
});

const Booking = dynamic(() => import("@/components/booking/Booking").then((m) => m.Booking), {
  loading: () => <section className="section-pad" aria-hidden />
});

const Testimonials = dynamic(() => import("@/components/testimonials/Testimonials").then((m) => m.Testimonials), {
  loading: () => <section className="section-pad" aria-hidden />
});

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <FamilyConstellation />
        <div className="relative overflow-x-hidden">
          <Videos />
          <Booking />
          <div className="relative">
            <Testimonials />
            <Footer />
            <FooterRightTree />
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
