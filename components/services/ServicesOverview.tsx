"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import {
  getFeaturedServices,
  getServicesByCategory,
  serviceCategories
} from "@/lib/services-data";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServicesBranchDecor } from "@/components/decorations/SideBotanicalBranch";
import { ServiceCard } from "@/components/services/ServiceCard";

export function ServicesOverview() {
  return (
    <>
      <Section className="overflow-visible pt-6 md:pt-10">
        <ServicesBranchDecor />
        <Container className="relative z-10">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 md:mb-5">Services</p>
            <h1 className="font-display text-[2.4rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[3.25rem] xl:text-[3.75rem]">
              Our Complete Healing Menu
            </h1>
            <p className="mt-5 text-[1rem] leading-[1.85] text-[#6F6258] md:mt-6 md:text-[1.0625rem]">
              Choose what calls to you. Trust the call. Twenty specialist modalities, signature
              programmes, and corporate offerings — held by one deeply trained practitioner in
              Gurgaon and online worldwide.
            </p>
          </motion.div>
        </Container>
      </Section>

      {serviceCategories.map((category) => {
        const services = getServicesByCategory(category.id);
        return (
          <Section key={category.id} id={category.id} className="pt-8 md:pt-10">
            <Container>
              <div className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p
                    className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: category.accent }}
                  >
                    {category.shortTitle}
                  </p>
                  <h2 className="mt-2 font-display text-[1.75rem] font-medium leading-[1.15] text-[#2E2925] md:text-[2.15rem]">
                    {category.title}
                  </h2>
                  <p className="mt-2 text-[0.9rem] leading-[1.75] text-[#6F6258] md:text-[0.95rem]">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {services.map((service, index) => (
                  <ServiceCard key={service.slug} service={service} index={index} />
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      <Section className="bg-[#F8F3ED]/60">
        <Container>
          <SectionHeading
            centered
            eyebrow="Featured"
            title="Start Where You’re Called"
            copy="Not sure where to begin? These eight offerings are among the most requested — or book a discovery conversation and we’ll guide you."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-4 md:gap-4">
            {getFeaturedServices().map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} compact />
            ))}
          </div>
          <motion.div
            {...fadeUp}
            transition={staggerDelay(2)}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="/#book-session">
              Book a Healing Session <Leaf className="h-4 w-4" />
            </Button>
            <Button href="/about/founder" variant="secondary">
              Meet Your Practitioner <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
          <p className="mt-8 text-center text-sm text-[#9A8D82]">
            Prefer the homepage overview?{" "}
            <Link href="/#services" className="font-semibold text-[#365A43] underline underline-offset-4">
              Jump to featured services
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
