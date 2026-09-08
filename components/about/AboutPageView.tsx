"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { aboutPage } from "@/lib/about-content";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { AboutCherryBlossom } from "@/components/decorations/AboutCherryBlossom";

export function AboutPageView() {
  return (
    <>
      <Section className="overflow-visible pt-6 md:pt-10">
        <AboutCherryBlossom />
        <Container className="relative z-10">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 md:mb-5">{aboutPage.eyebrow}</p>
            <h1 className="font-display text-[2.4rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[3.25rem] xl:text-[3.75rem]">
              {aboutPage.title}
            </h1>
            <blockquote className="mt-6 font-display text-[1.35rem] font-medium italic leading-[1.35] text-blossom-rose md:mt-8 md:text-[1.75rem]">
              “{aboutPage.quote}”
            </blockquote>
          </motion.div>

          <div className="mx-auto mt-12 max-w-3xl md:mt-16">
            <SectionHeading eyebrow="Who we are" title={aboutPage.whoWeAre.title} />
            {aboutPage.whoWeAre.paragraphs.map((paragraph) => (
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

      <Section className="bg-[#F8F3ED]/60">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Our story"
              title={aboutPage.story.title}
              copy={aboutPage.story.subtitle}
            />
            {aboutPage.story.paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph}
                {...fadeUp}
                className="mt-5 text-[1rem] leading-[1.9] text-[#6F6258] md:mt-6 md:text-[1.0625rem]"
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.div {...fadeUp} className="mt-8">
              <Button href="/about/founder" variant="secondary">
                Read the Founder’s Journey <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            centered
            eyebrow="Our philosophy"
            title={aboutPage.philosophy.title}
            copy={aboutPage.philosophy.subtitle}
          />
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
            {aboutPage.philosophy.principles.map((principle, index) => (
              <motion.article
                key={principle.title}
                {...fadeUp}
                transition={staggerDelay(index)}
                className="rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC] p-5 shadow-[0_8px_24px_rgba(30,20,10,0.04)] md:p-6"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#C69C6D]">
                  0{index + 1}
                </p>
                <h3 className="mt-3 font-display text-[1.2rem] font-medium leading-[1.25] text-[#2E2925]">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-[1.75] text-[#6F6258]">{principle.copy}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F8F3ED]/60">
        <Container>
          <SectionHeading
            centered
            eyebrow="Our reach"
            title="A Practice Built With Love — And Lived Experience"
          />
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
            {aboutPage.reach.map(([value, label], index) => (
              <motion.div
                key={label}
                {...fadeUp}
                transition={staggerDelay(index)}
                className="rounded-[18px] border border-[#EFE5DA] bg-[#FFFDFC] p-4 text-center shadow-[0_6px_20px_rgba(0,0,0,0.04)] md:p-5"
              >
                <div className="font-display text-[1.75rem] font-medium text-[#365A43] md:text-[2rem]">{value}</div>
                <div className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#9A8D82] md:text-[0.72rem]">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-12">
            <Button href="/about/founder">
              Meet Sonia Verma Bhattacharyya <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/#book-session" variant="secondary">
              Book a Healing Session <Leaf className="h-4 w-4" />
            </Button>
          </motion.div>

          <p className="mt-8 text-center text-sm text-[#9A8D82]">
            Looking for a shorter overview?{" "}
            <Link href="/#about" className="font-semibold text-[#365A43] underline underline-offset-4">
              Return to the homepage About section
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
