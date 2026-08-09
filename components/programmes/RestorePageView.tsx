"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { restorePage } from "@/lib/programmes-content";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/ui/Section";

export function RestorePageView() {
  return (
    <>
      <Section className="pt-6 md:pt-10">
        <Container>
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">{restorePage.eyebrow}</p>
            <h1 className="font-display text-[2.4rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[3.25rem]">
              {restorePage.title}
            </h1>
            <p className="mt-4 font-display text-[1.2rem] font-medium italic text-blossom-rose md:text-[1.4rem]">
              {restorePage.acronym}
            </p>
            <p className="mt-5 text-[1rem] leading-[1.85] text-[#6F6258]">{restorePage.intro}</p>
            <p className="mt-4 text-sm font-semibold text-[#365A43]">{restorePage.meta}</p>
          </motion.div>
        </Container>
      </Section>

      <Section className="bg-[#F8F3ED]/60">
        <Container>
          <SectionHeading centered eyebrow="The arc" title="Eight Sessions. One Homecoming." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {restorePage.phases.map((phase, index) => (
              <motion.article
                key={phase.title}
                {...fadeUp}
                transition={staggerDelay(index)}
                className="rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC] p-5 md:p-6"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#C69C6D]">
                  {phase.session}
                </p>
                <h3 className="mt-2 font-display text-[1.25rem] font-medium text-[#2E2925]">{phase.title}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-[1.75] text-[#6F6258]">{phase.copy}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-[1.75rem] font-medium text-[#2E2925]">Who RESTORE is for</h2>
              <ul className="mt-5 grid gap-3">
                {restorePage.whoFor.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.95rem] leading-[1.7] text-[#6F6258]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#365A43]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-[1.75rem] font-medium text-[#2E2925]">What&apos;s included</h2>
              <ul className="mt-5 grid gap-3">
                {restorePage.included.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.95rem] leading-[1.7] text-[#6F6258]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C69C6D]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
            {restorePage.testimonials.map((item) => (
              <figure key={item.name} className="rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC] p-6">
                <blockquote className="text-[0.95rem] leading-[1.8] text-[#6F6258]">“{item.quote}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-[#2E2925]">
                  {item.name} · {item.role}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/#book-session">
              Begin RESTORE <Leaf className="h-4 w-4" />
            </Button>
            <Button href="/services/restore" variant="secondary">
              Service overview <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-6 text-center text-sm text-[#9A8D82]">
            Explore all modalities on the{" "}
            <Link href="/services" className="font-semibold text-[#365A43] underline underline-offset-4">
              Services page
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
