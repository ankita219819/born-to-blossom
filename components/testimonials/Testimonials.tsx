"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";

export function Testimonials() {
  return (
    <Section id="testimonials" endPad className="overflow-visible">
      <Container className="relative z-10">
        <SectionHeading centered eyebrow="Testimonials" title="Held With Warmth, Care & Clarity" />
        <div className="relative z-10 mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((quote, index) => (
            <motion.figure
              key={quote}
              {...fadeUp}
              transition={staggerDelay(index, 0.06)}
              className="h-full rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_10px_30px_rgba(30,20,10,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] md:rounded-[28px] md:p-8"
            >
                <div className="flex gap-1 text-blossom-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-2xl leading-tight md:mt-8 md:text-3xl">“{quote}”</blockquote>
                <figcaption className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#9A8D82] md:mt-6">
                  Private client
                </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
