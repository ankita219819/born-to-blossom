"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { SacredMark } from "@/components/ui/SacredMark";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";
import { FamilyBloomDecor } from "@/components/decorations/Decorations";

export function FamilyConstellation() {
  return (
    <Section id="healing-journey">
      <FamilyBloomDecor />
      <Container>
        <motion.div
          {...fadeUp}
          className="grid overflow-hidden rounded-[24px] border border-[#EFE5DA] bg-[#FFFDFC] shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:rounded-[30px] xl:grid-cols-[1.28fr_0.72fr]"
        >
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px] md:min-h-[320px] xl:min-h-[356px]">
            <Image
              src="/images/family-constellation.png"
              alt="Family constellation therapy represented by connected family nodes"
              fill
              loading="lazy"
              className="object-cover transition duration-700 hover:scale-[1.03]"
              sizes="(min-width: 1280px) 60vw, 100vw"
            />
          </div>
          <div className="relative p-7 md:p-9 xl:p-14">
            <SacredMark className="absolute right-6 top-6 hidden w-24 opacity-25 md:block xl:w-28" />
            <p className="eyebrow">Featured therapy</p>
            <h2 className="mt-4 font-display text-[1.85rem] font-medium leading-[1.08] text-[#2E2925] md:mt-5 md:text-[2.25rem] xl:text-[2.85rem]">
              Healing Begins With Understanding Your Family System
            </h2>
            <p className="mt-4 text-[0.9rem] leading-[1.8] text-[#6F6258] md:mt-5 md:text-[0.95rem]">
              Family Constellation Therapy helps uncover hidden dynamics, heal ancestral wounds and bring love,
              belonging and harmony back into your life.
            </p>
            <Button className="mt-6 h-11 px-6 text-xs md:mt-7">
              Book Constellation Session <Leaf className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
