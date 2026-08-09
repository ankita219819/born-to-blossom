"use client";

import { useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getFeaturedServices } from "@/lib/services-data";
import { fadeUp } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";
import { ServicesBranchDecor } from "@/components/decorations/Decorations";
import { ServiceCard } from "@/components/services/ServiceCard";

function CarouselNav({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full border border-blossom-rose/25 transition hover:border-blossom-rose/45"
        onClick={onPrev}
        aria-label="Previous"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full border border-blossom-rose/25 transition hover:border-blossom-rose/45"
        onClick={onNext}
        aria-label="Next"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Services() {
  const featured = getFeaturedServices();
  const [carouselRef, carouselApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true
  });
  const scrollPrev = useCallback((api: ReturnType<typeof useEmblaCarousel>[1]) => api?.scrollPrev(), []);
  const scrollNext = useCallback((api: ReturnType<typeof useEmblaCarousel>[1]) => api?.scrollNext(), []);

  return (
    <Section id="services" className="overflow-visible">
      <ServicesBranchDecor />
      <Container className="relative z-10">
        <SectionHeading
          centered
          eyebrow="Services"
          title="How We Can Support You"
          copy="Featured offerings from our full spectrum of 20+ healing modalities — in person in Gurgaon, and online across India and the world."
        />

        <div className="mt-6 flex items-center justify-end md:hidden">
          <CarouselNav onPrev={() => scrollPrev(carouselApi)} onNext={() => scrollNext(carouselApi)} />
        </div>

        <div ref={carouselRef} className="mt-3 overflow-hidden md:hidden">
          <div className="flex gap-4">
            {featured.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                compact
                className="w-[160px] shrink-0 sm:w-[175px]"
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-6 hidden max-w-[980px] grid-cols-2 gap-3 sm:max-w-[1040px] md:mt-8 md:grid md:grid-cols-4 md:gap-3.5">
          {featured.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} compact />
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-8 flex justify-center md:mt-10">
          <Button href="/services" variant="secondary">
            View All 20+ Services <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        <p className="mt-4 text-center text-[0.8rem] text-[#9A8D82]">
          Or{" "}
          <Link href="/services#energy" className="font-semibold text-[#365A43] underline underline-offset-4">
            browse by category
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
