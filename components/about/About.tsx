"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  aboutParagraphs,
  aboutQuote,
  aboutStats,
  aboutTitle,
  healingPillars
} from "@/lib/content";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { PractitionerPortrait, PractitionerSplitLayout } from "@/components/ui/PractitionerPortrait";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";
import { AboutCherryBlossom } from "@/components/decorations/AboutCherryBlossom";

export function About() {
  return (
    <Section id="about">
      <AboutCherryBlossom />
      <Container>
        <PractitionerSplitLayout portrait={<PractitionerPortrait />}>
          <div className="text-center md:text-left">
            <SectionHeading
              eyebrow="Meet your healer"
              title={aboutTitle}
              className="mx-auto min-[768px]:mx-0"
            />
            <p className="mt-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#9A8D82] md:mt-4">
              Sonia Verma Bhattacharyya · Gurgaon, India
            </p>
            <motion.blockquote
              {...fadeUp}
              className="mx-auto mt-6 max-w-3xl font-display text-[1.5rem] font-medium italic leading-[1.35] text-blossom-rose md:mt-8 md:text-[1.75rem] min-[1200px]:mx-0 min-[1200px]:text-[2rem]"
            >
              “{aboutQuote}”
            </motion.blockquote>
            {aboutParagraphs.map((paragraph) => (
              <motion.p
                key={paragraph}
                {...fadeUp}
                className="mx-auto mt-6 max-w-3xl text-[1rem] leading-[1.9] text-[#6F6258] md:mt-8 md:text-[1.0625rem] min-[1200px]:mx-0"
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.div
              {...fadeUp}
              className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 md:mt-10 md:gap-4 min-[1200px]:mx-0 min-[1200px]:max-w-none"
            >
              {aboutStats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[18px] border border-[#EFE5DA] bg-[#FFFDFC] p-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] md:rounded-[20px] md:p-5"
                >
                  <div className="font-display text-[1.75rem] font-medium text-[#365A43] md:text-[2.2rem]">{value}</div>
                  <div className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#9A8D82] md:text-[0.72rem]">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              {...fadeUp}
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center md:mt-10 min-[1200px]:mx-0 min-[1200px]:max-w-none min-[1200px]:justify-start"
            >
              <Button href="/about" className="w-full sm:w-auto">
                Who We Are <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/about/founder" variant="secondary" className="w-full sm:w-auto">
                Founder’s Journey <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </PractitionerSplitLayout>

        <div className="mt-14 md:mt-16 xl:mt-20">
          <SectionHeading
            centered
            eyebrow="Our healing pillars"
            title="Release. Reconnect. Recalibrate."
            copy="Healing that touches only the mind will not hold. We work across body, emotion, energy, and soul — so transformation is deep, durable, and real."
          />
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
            {healingPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                {...fadeUp}
                transition={staggerDelay(index)}
                className="rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC]/92 p-5 shadow-[0_8px_24px_rgba(30,20,10,0.04)] md:p-6"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#C69C6D]">
                  0{index + 1}
                </p>
                <h3 className="mt-3 font-display text-[1.15rem] font-medium leading-[1.25] text-[#2E2925] md:text-[1.25rem]">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-[1.75] text-[#6F6258]">{pillar.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
