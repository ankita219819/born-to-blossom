"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";
import { ServicesBranchDecor } from "@/components/decorations/Decorations";

export function Services() {
  return (
    <Section id="services" className="overflow-visible">
      <ServicesBranchDecor />
      <Container className="relative z-10">
        <SectionHeading centered eyebrow="Services" title="How I Can Support You" />
        <div className="relative z-10 mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 xl:grid-cols-6">
          {services.map(({ title, copy, time, Icon }, index) => (
            <motion.article
              key={title}
              {...fadeUp}
              transition={staggerDelay(index)}
              className="group flex min-h-[240px] flex-col rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC]/92 p-5 shadow-[0_10px_30px_rgba(30,20,10,0.045)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] md:min-h-[260px] md:p-6 xl:min-h-[276px]"
            >
              <Icon className="h-10 w-10 text-blossom-rose transition duration-300 group-hover:scale-110 md:h-12 md:w-12" />
              <h3 className="mt-6 font-display text-[1.25rem] font-medium leading-[1.15] text-[#2E2925] md:mt-8 md:text-[1.45rem]">
                {title}
              </h3>
              <p className="mt-2.5 text-[0.75rem] leading-[1.7] text-[#6F6258] md:mt-3 md:text-[0.78rem]">{copy}</p>
              <div className="mt-auto flex items-center justify-between pt-5 md:pt-7">
                <span className="text-sm font-semibold">{time}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[#E4CFAF] text-[#C69C6D]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
