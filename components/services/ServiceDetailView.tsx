"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import {
  getServicesByCategory,
  serviceCategories,
  type ServiceDetail
} from "@/lib/services-data";
import { fadeUp } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/services/ServiceCard";

export function ServiceDetailView({ service }: { service: ServiceDetail }) {
  const category = serviceCategories.find((c) => c.id === service.categoryId);
  const related = getServicesByCategory(service.categoryId)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <Section className="overflow-visible pt-4 md:pt-6">
        <Container>
          <motion.div {...fadeUp} className="mx-auto max-w-3xl">
            <p
              className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
              style={{ color: category?.accent ?? "#C69C6D" }}
            >
              {category?.title ?? "Healing modality"}
            </p>
            <h1 className="mt-3 font-display text-[2.35rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[3.1rem]">
              {service.title}
            </h1>
            <p className="mt-4 font-display text-[1.25rem] font-medium italic leading-[1.35] text-blossom-rose md:text-[1.45rem]">
              {service.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-[0.8rem] md:mt-8">
              <span className="rounded-full border border-[#EFE5DA] bg-[#FFFDFC] px-3.5 py-1.5 font-semibold text-[#2E2925]">
                {service.duration}
              </span>
              <span className="rounded-full border border-[#EFE5DA] bg-[#FFFDFC] px-3.5 py-1.5 font-semibold text-[#2E2925]">
                {service.format}
              </span>
            </div>
          </motion.div>

          {service.image ? (
            <motion.div
              {...fadeUp}
              className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-[24px] md:mt-12"
            >
              <Image
                src={service.image}
                alt={service.imageAlt ?? service.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </motion.div>
          ) : null}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-14">
            <div>
              <h2 className="font-display text-[1.65rem] font-medium text-[#2E2925] md:text-[1.85rem]">
                What is {service.shortTitle}?
              </h2>
              {service.whatIs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[1rem] leading-[1.9] text-[#6F6258]">
                  {paragraph}
                </p>
              ))}

              <h2 className="mt-10 font-display text-[1.65rem] font-medium text-[#2E2925] md:text-[1.85rem]">
                What happens in a session
              </h2>
              {service.whatHappens.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[1rem] leading-[1.9] text-[#6F6258]">
                  {paragraph}
                </p>
              ))}

              <h2 className="mt-10 font-display text-[1.65rem] font-medium text-[#2E2925] md:text-[1.85rem]">
                Who it&apos;s for
              </h2>
              <p className="mt-4 text-[1rem] leading-[1.9] text-[#6F6258]">{service.whoFor}</p>

              {service.notes ? (
                <p className="mt-6 rounded-[16px] border border-[#EFE5DA] bg-[#F8F3ED]/80 p-4 text-[0.9rem] leading-[1.75] text-[#6F6258]">
                  {service.notes}
                </p>
              ) : null}
            </div>

            <aside className="lg:pt-1">
              <div className="rounded-[22px] border border-[#EFE5DA] bg-[#FFFDFC] p-6 shadow-[0_8px_24px_rgba(30,20,10,0.04)] lg:sticky lg:top-28">
                <h2 className="font-display text-[1.35rem] font-medium text-[#2E2925]">Benefits</h2>
                <ul className="mt-4 grid gap-2.5">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2.5 text-[0.875rem] leading-[1.6] text-[#6F6258]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C69C6D]" aria-hidden />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-[#EFE5DA] pt-5">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#9A8D82]">
                    Duration
                  </p>
                  <p className="mt-1 text-[0.95rem] font-semibold text-[#2E2925]">{service.duration}</p>
                  <p className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#9A8D82]">
                    Format
                  </p>
                  <p className="mt-1 text-[0.95rem] font-semibold text-[#2E2925]">{service.format}</p>
                </div>

                <Button href="/#book-session" className="mt-6 w-full">
                  Book This Session <Leaf className="h-4 w-4" />
                </Button>
                <Button href="/services" variant="secondary" className="mt-3 w-full">
                  View All Services <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {related.length ? (
        <Section className="bg-[#F8F3ED]/60">
          <Container>
            <h2 className="font-display text-[1.75rem] font-medium text-[#2E2925] md:text-[2rem]">
              Related in {category?.shortTitle}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <ServiceCard key={item.slug} service={item} index={index} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
