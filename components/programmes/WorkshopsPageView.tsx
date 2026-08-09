"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { workshopsPage } from "@/lib/programmes-content";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/ui/Section";

export function WorkshopsPageView() {
  return (
    <>
      <Section className="pt-6 md:pt-10">
        <Container>
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">{workshopsPage.eyebrow}</p>
            <h1 className="font-display text-[2.4rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[3.25rem]">
              {workshopsPage.title}
            </h1>
            <blockquote className="mt-6 font-display text-[1.35rem] font-medium italic text-blossom-rose md:text-[1.65rem]">
              “{workshopsPage.quote}”
            </blockquote>
            <p className="mt-5 text-[1rem] leading-[1.85] text-[#6F6258]">{workshopsPage.intro}</p>
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {workshopsPage.events.map((event, index) => (
              <motion.article
                key={event.title}
                {...fadeUp}
                transition={staggerDelay(index)}
                className="rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC] p-5 shadow-[0_8px_24px_rgba(30,20,10,0.04)] md:p-6"
              >
                <h2 className="font-display text-[1.25rem] font-medium text-[#2E2925]">{event.title}</h2>
                <p className="mt-3 text-[0.9rem] leading-[1.75] text-[#6F6258]">{event.copy}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F8F3ED]/60">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              centered
              eyebrow="Training"
              title={workshopsPage.training.title}
              copy={workshopsPage.training.copy}
            />
            <ul className="mt-8 grid gap-3">
              {workshopsPage.training.offerings.map((item) => (
                <li
                  key={item}
                  className="rounded-[14px] border border-[#EFE5DA] bg-[#FFFDFC] px-4 py-3 text-center text-[0.95rem] font-medium text-[#2E2925]"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <Button href="/#book-session">
                Enquire About Workshops & Training <Leaf className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
