"use client";

import { useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/lib/content";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";
import { ServicesBranchDecor } from "@/components/decorations/Decorations";

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

function ServiceCard({
  title,
  copy,
  time,
  image,
  imageAlt,
  index,
  className
}: {
  title: string;
  copy: string;
  time: string;
  image?: string;
  imageAlt?: string;
  index: number;
  className?: string;
}) {
  return (
    <motion.article
      {...fadeUp}
      transition={staggerDelay(index)}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[14px] border border-[#EFE5DA] bg-[#FFFDFC]/92 shadow-[0_6px_18px_rgba(30,20,10,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={image!}
          alt={imageAlt ?? title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 45vw, 200px"
        />
      </div>

      <div className="flex flex-1 flex-col p-3 md:p-3.5">
        <h3 className="font-display text-[0.82rem] font-medium leading-[1.25] text-[#2E2925] md:text-[0.9rem]">{title}</h3>
        <p className="mt-1 text-[0.62rem] leading-[1.55] text-[#6F6258] md:mt-1.5 md:text-[0.66rem]">{copy}</p>
        <div className="mt-auto flex items-center justify-between pt-2.5 md:pt-3">
          <span className="text-[0.65rem] font-semibold md:text-[0.7rem]">{time}</span>
          <span className="grid h-6 w-6 place-items-center rounded-full border border-[#E4CFAF] text-[#C69C6D]">
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function Services() {
  const [carouselRef, carouselApi] = useEmblaCarousel({ align: "center", dragFree: true });
  const scrollPrev = useCallback((api: ReturnType<typeof useEmblaCarousel>[1]) => api?.scrollPrev(), []);
  const scrollNext = useCallback((api: ReturnType<typeof useEmblaCarousel>[1]) => api?.scrollNext(), []);

  return (
    <Section id="services" className="overflow-visible">
      <ServicesBranchDecor />
      <Container className="relative z-10">
        <SectionHeading centered eyebrow="Services" title="How I Can Support You" />

        <div className="mt-6 flex items-center justify-end md:hidden">
          <CarouselNav onPrev={() => scrollPrev(carouselApi)} onNext={() => scrollNext(carouselApi)} />
        </div>

        <div ref={carouselRef} className="mt-3 overflow-hidden md:hidden">
          <div className="flex justify-center gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                index={index}
                className="w-[160px] shrink-0 sm:w-[175px]"
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-6 hidden max-w-[840px] grid-cols-2 gap-2.5 sm:max-w-[920px] md:mt-8 md:grid md:grid-cols-4 md:gap-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
