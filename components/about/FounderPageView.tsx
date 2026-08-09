"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { founderPage } from "@/lib/about-content";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PractitionerPortrait, PractitionerSplitLayout } from "@/components/ui/PractitionerPortrait";
import { Section, SectionHeading } from "@/components/ui/Section";
import { AboutCherryBlossom } from "@/components/decorations/Decorations";

export function FounderPageView() {
  return (
    <>
      <Section className="overflow-visible pt-6 md:pt-10">
        <AboutCherryBlossom />
        <Container className="relative z-10">
          <PractitionerSplitLayout portrait={<PractitionerPortrait />}>
            <div className="text-center md:text-left">
              <motion.div {...fadeUp}>
                <p className="eyebrow mb-4 md:mb-5">{founderPage.eyebrow}</p>
                <h1 className="font-display text-[2.2rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[2.85rem] xl:text-[3.25rem]">
                  {founderPage.title}
                </h1>
                <p className="mt-3 text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#9A8D82]">
                  Founder &amp; Practitioner · Gurgaon, India
                </p>
              </motion.div>

              <motion.blockquote
                {...fadeUp}
                className="mx-auto mt-6 max-w-3xl font-display text-[1.35rem] font-medium italic leading-[1.35] text-blossom-rose md:mt-8 md:text-[1.65rem] min-[1200px]:mx-0"
              >
                “{founderPage.quote}”
              </motion.blockquote>

              {founderPage.intro.map((paragraph) => (
                <motion.p
                  key={paragraph}
                  {...fadeUp}
                  className="mx-auto mt-5 max-w-3xl text-[1rem] leading-[1.9] text-[#6F6258] md:mt-6 md:text-[1.0625rem] min-[1200px]:mx-0"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </PractitionerSplitLayout>
        </Container>
      </Section>

      <Section className="bg-[#F8F3ED]/60">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="The path" title={founderPage.awakening.title} />
            {founderPage.awakening.paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph}
                {...fadeUp}
                className="mt-5 text-[1rem] leading-[1.9] text-[#6F6258] md:mt-6 md:text-[1.0625rem]"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            centered
            eyebrow="Original contributions"
            title="Humkaara & Hleem"
            copy="Two original modalities developed by Sonia — born from lived practice, not textbooks — and now taught to practitioners across India."
          />
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
            {founderPage.modalities.map((modality, index) => (
              <motion.article
                key={modality.title}
                {...fadeUp}
                transition={staggerDelay(index)}
                className="rounded-[22px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_8px_24px_rgba(30,20,10,0.04)] md:p-8"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#C69C6D]">
                  Original modality
                </p>
                <h3 className="mt-3 font-display text-[1.45rem] font-medium leading-[1.2] text-[#2E2925] md:text-[1.65rem]">
                  {modality.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-[1.85] text-[#6F6258]">{modality.copy}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F8F3ED]/60">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="Shakta path" title={founderPage.devotion.title} />
            {founderPage.devotion.paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph}
                {...fadeUp}
                className="mt-5 text-[1rem] leading-[1.9] text-[#6F6258] md:mt-6 md:text-[1.0625rem]"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="Looking ahead" title={founderPage.vision.title} />
            {founderPage.vision.paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph}
                {...fadeUp}
                className="mt-5 text-[1rem] leading-[1.9] text-[#6F6258] md:mt-6 md:text-[1.0625rem]"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div {...fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/#book-session">
                Book a Healing Session <Leaf className="h-4 w-4" />
              </Button>
              <Button href="/about" variant="secondary">
                Back to About <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            <p className="mt-8 text-sm text-[#9A8D82]">
              Explore the practice story on the{" "}
              <Link href="/about" className="font-semibold text-[#365A43] underline underline-offset-4">
                About page
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
