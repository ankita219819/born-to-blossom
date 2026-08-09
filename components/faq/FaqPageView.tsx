"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { confidentialityNote, faqItems } from "@/lib/faq-content";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";

export function FaqPageView() {
  return (
    <Section className="pt-6 md:pt-10" endPad>
      <Container>
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">FAQ</p>
          <h1 className="font-display text-[2.4rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[3.25rem]">
            Your Questions, Answered
          </h1>
          <p className="mt-4 font-display text-[1.2rem] font-medium italic text-blossom-rose">
            “Ask everything. Healing begins with honest inquiry.”
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl grid gap-3">
          {faqItems.map((item, index) => (
            <motion.details
              key={item.question}
              {...fadeUp}
              transition={staggerDelay(Math.min(index, 6))}
              className="group rounded-[18px] border border-[#EFE5DA] bg-[#FFFDFC] px-5 py-4 open:shadow-[0_8px_24px_rgba(30,20,10,0.04)] md:px-6"
            >
              <summary className="cursor-pointer list-none font-display text-[1.05rem] font-medium leading-[1.35] text-[#2E2925] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span className="mt-0.5 text-[#C69C6D] transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-[0.95rem] leading-[1.8] text-[#6F6258]">{item.answer}</p>
            </motion.details>
          ))}
        </div>

        <motion.div
          {...fadeUp}
          className="mx-auto mt-12 max-w-3xl rounded-[20px] border border-[#EFE5DA] bg-[#F8F3ED]/80 p-6 text-center"
        >
          <h2 className="font-display text-[1.35rem] font-medium text-[#2E2925]">A note on confidentiality</h2>
          <p className="mt-3 text-[0.9rem] leading-[1.8] text-[#6F6258]">{confidentialityNote}</p>
          <Button href="/#book-session" className="mt-6">
            Book a Discovery Conversation <Leaf className="h-4 w-4" />
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
