"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function NavArrow({
  direction,
  onClick,
  label
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E8F2EA] text-[#365A43] transition hover:bg-[#DCEBE0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#365A43] sm:h-12 sm:w-12"
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
    </button>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const quote = testimonials[index];

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % total);
  }, [total]);

  return (
    <Section id="testimonials" endPad className="overflow-visible">
      <Container className="relative z-10">
        <SectionHeading centered eyebrow="Testimonials" title="Held With Warmth, Care & Clarity" />

        <div className="relative z-10 mt-10 flex items-center justify-center gap-3 sm:mt-14 sm:gap-6 md:gap-10 lg:gap-14">
          <NavArrow direction="prev" onClick={goPrev} label="Previous testimonial" />

          <div className="w-full max-w-[22rem] sm:max-w-[26rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={quote.name}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex w-full flex-col items-center"
              >
                <div
                  className="grid h-20 w-20 place-items-center rounded-full bg-[#E8F2EA] text-[1.25rem] font-semibold tracking-[0.04em] text-[#365A43] sm:h-24 sm:w-24 sm:text-[1.375rem]"
                  aria-hidden
                >
                  {getInitials(quote.name)}
                </div>

                <div className="mt-5 flex justify-center gap-1 sm:mt-6" aria-label={`${quote.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const filled = i < quote.rating;
                    return (
                      <Star
                        key={i}
                        className={
                          filled
                            ? "h-5 w-5 fill-[#C69C6D] text-[#C69C6D]"
                            : "h-5 w-5 fill-transparent text-[#E8CFAE]"
                        }
                        strokeWidth={1.5}
                      />
                    );
                  })}
                </div>

                <figcaption className="mt-5 w-full text-left sm:mt-6">
                  <p className="text-[1.125rem] font-semibold tracking-[-0.01em] text-[#2E2925] sm:text-[1.25rem]">
                    {quote.name}
                  </p>
                  <p className="mt-1 text-[0.9375rem] text-[#2E2925]">{quote.role}</p>
                </figcaption>

                <blockquote className="mt-4 w-full text-left text-[0.9375rem] leading-[1.75] text-[#2E2925] sm:mt-5 sm:text-[1rem] sm:leading-[1.8]">
                  {quote.quote}
                </blockquote>
              </motion.figure>
            </AnimatePresence>
          </div>

          <NavArrow direction="next" onClick={goNext} label="Next testimonial" />
        </div>
      </Container>
    </Section>
  );
}
