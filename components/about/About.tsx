"use client";

import { motion } from "framer-motion";
import { aboutParagraphs, aboutQuote, aboutStats, aboutTitle } from "@/lib/content";
import { fadeUp } from "@/lib/motion";
import { PractitionerPortrait, PractitionerSplitLayout } from "@/components/ui/PractitionerPortrait";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";
import { AboutCherryBlossom } from "@/components/decorations/Decorations";

export function About() {
  return (
    <Section id="about">
      <AboutCherryBlossom />
      <Container>
        <PractitionerSplitLayout portrait={<PractitionerPortrait />}>
          <div className="text-center md:text-left">
            <SectionHeading
              eyebrow="About me"
              title={aboutTitle}
              className="mx-auto min-[768px]:mx-0"
            />
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
          </div>
        </PractitionerSplitLayout>
      </Container>
    </Section>
  );
}
