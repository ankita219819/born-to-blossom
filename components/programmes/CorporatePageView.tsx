"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { corporatePage } from "@/lib/programmes-content";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/ui/Section";

export function CorporatePageView() {
  return (
    <>
      <Section className="pt-6 md:pt-10">
        <Container>
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">{corporatePage.eyebrow}</p>
            <h1 className="font-display text-[2.4rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[3.25rem]">
              {corporatePage.title}
            </h1>
            <blockquote className="mt-6 font-display text-[1.35rem] font-medium italic text-blossom-rose md:text-[1.65rem]">
              “{corporatePage.quote}”
            </blockquote>
            <p className="mt-5 text-[1rem] leading-[1.85] text-[#6F6258]">{corporatePage.intro}</p>
          </motion.div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {corporatePage.differentiators.map((item, index) => (
              <motion.div
                key={item}
                {...fadeUp}
                transition={staggerDelay(index)}
                className="rounded-[16px] border border-[#EFE5DA] bg-[#FFFDFC] p-4 text-left text-[0.9rem] leading-[1.7] text-[#6F6258]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F8F3ED]/60">
        <Container>
          <SectionHeading centered eyebrow="Programme menu" title="Corporate Wellness Offerings" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {corporatePage.programmes.map((programme, index) => (
              <motion.article
                key={programme.title}
                {...fadeUp}
                transition={staggerDelay(index)}
                className="rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC] p-5 md:p-6"
              >
                <h3 className="font-display text-[1.15rem] font-medium text-[#2E2925]">{programme.title}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-[1.75] text-[#6F6258]">{programme.copy}</p>
              </motion.article>
            ))}
          </div>
          <ul className="mx-auto mt-8 max-w-2xl grid gap-2 text-center text-[0.9rem] text-[#6F6258]">
            {corporatePage.formats.map((format) => (
              <li key={format}>{format}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            centered
            eyebrow="Retreats"
            title="Corporate Retreat Design"
            copy={corporatePage.retreats.intro}
          />
          <blockquote className="mx-auto mt-6 max-w-2xl text-center font-display text-[1.25rem] font-medium italic text-blossom-rose">
            “{corporatePage.retreats.quote}”
          </blockquote>
          <p className="mx-auto mt-4 max-w-3xl text-center text-[0.95rem] leading-[1.8] text-[#6F6258]">
            {corporatePage.retreats.difference}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {corporatePage.retreats.samples.map((sample, index) => (
              <motion.article
                key={sample.title}
                {...fadeUp}
                transition={staggerDelay(index)}
                className="rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC] p-5 md:p-6"
              >
                <h3 className="font-display text-[1.2rem] font-medium text-[#2E2925]">{sample.title}</h3>
                <ul className="mt-4 grid gap-2">
                  {sample.items.map((item) => (
                    <li key={item} className="flex gap-2 text-[0.85rem] leading-[1.6] text-[#6F6258]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C69C6D]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {corporatePage.retreats.sectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-[#EFE5DA] bg-[#FFFDFC] px-3 py-1.5 text-[0.75rem] font-semibold text-[#6F6258]"
              >
                {sector}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[#9A8D82]">{corporatePage.retreats.meta}</p>
        </Container>
      </Section>

      <Section className="bg-[#F8F3ED]/60">
        <Container>
          <SectionHeading centered eyebrow="Proof" title="What Organisations Experience" />
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
            {corporatePage.testimonials.map((item) => (
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
              Enquire for Corporate Programmes <Leaf className="h-4 w-4" />
            </Button>
            <Button href="/services/corporate-wellness" variant="secondary">
              Wellness service detail <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
