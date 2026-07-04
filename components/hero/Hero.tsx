"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { heroFeatures } from "@/lib/content";
import { heroFade } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { FloatingPetals, SideBotanicalBranch } from "@/components/decorations/Decorations";

const HERO_IMAGE = {
  src: "/images/hero-main.webp",
  width: 1122,
  height: 1402,
  alt: "Born To Blossom practitioner seated in a warm therapy room with cherry blossoms outside the window"
} as const;

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-2 md:pt-28">
      <FloatingPetals count={10} />
      <SideBotanicalBranch />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blossom-background via-blossom-pink-light/30 to-blossom-background" />

      <Container
        className="
          grid grid-cols-1 gap-8 pb-10
          md:grid-cols-2 md:items-end md:gap-8 md:pb-12
          min-[1200px]:min-h-[calc(100vh-7rem)] min-[1200px]:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] min-[1200px]:gap-12 min-[1200px]:pb-16
        "
      >
        {/* Copy column: text → CTAs → feature icons */}
        <motion.div
          {...heroFade}
          className="
            relative z-10 flex flex-col
            pt-2 text-center
            md:pt-4 md:text-left
            min-[1200px]:max-w-none min-[1200px]:justify-center min-[1200px]:pt-10
          "
        >
          <p className="eyebrow mb-4 md:mb-5">
            <span className="flex items-center justify-center gap-3 md:hidden">
              <Image
                src="/images/leaf-1.webp"
                alt=""
                width={160}
                height={200}
                aria-hidden
                className="h-[4.75rem] w-[3.25rem] shrink-0 object-contain object-left"
              />
              <span className="max-w-[11.5rem] text-center text-[0.68rem] leading-[1.55] tracking-[0.12em]">
                A space for healing, growth and awakening
              </span>
              <Image
                src="/images/leaf-2.webp"
                alt=""
                width={160}
                height={200}
                aria-hidden
                className="h-[4.75rem] w-[3.25rem] shrink-0 object-contain object-right opacity-90"
              />
            </span>
            <span className="hidden items-center gap-3 md:flex">
              <Sparkles className="h-4 w-4" /> A space for healing, growth and awakening
            </span>
          </p>

          <h1
            className="
              font-display font-medium leading-[1.05] tracking-[-0.03em] text-[#2E2925]
              text-[2.5rem] sm:text-[3rem]
              md:text-[3.25rem]
              min-[1200px]:text-[4.5rem] xl:text-[5rem]
            "
          >
            Helping You Heal,
            <br />
            Grow &amp;
            <br />
            <span className="text-blossom-rose">Blossom</span>
          </h1>

          <p
            className="
              mx-auto mt-4 max-w-2xl text-[0.975rem] leading-[1.88] text-[#6F6258]
              md:mx-0 md:mt-6 md:text-[1.0625rem]
              min-[1200px]:mt-7 min-[1200px]:text-[1.125rem]
            "
          >
            Where Psychiatry Meets Spiritual Wisdom
          </p>

          <div
            className="
              mt-7 flex w-full flex-col gap-3
              sm:flex-row sm:flex-wrap sm:justify-center
              md:mt-8 md:justify-start
              min-[1200px]:mt-10
            "
          >
            <Button className="w-full sm:w-auto">
              Book Your Session <Leaf className="h-4 w-4" />
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto">
              Explore Services <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div
            className="
              mx-auto mt-8 grid w-full max-w-3xl grid-cols-2 gap-2.5
              md:mx-0 md:mt-10 md:gap-3
              min-[1200px]:mt-14
            "
          >
            {heroFeatures.map(([label, Icon]) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-[14px] border border-[#EFE5DA] bg-white/80 px-3 py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] backdrop-blur-sm md:gap-3 md:px-4 md:py-3"
              >
                <Icon className="h-4 w-4 shrink-0 text-blossom-rose md:h-5 md:w-5" />
                <span className="text-[0.65rem] font-bold leading-4 md:text-xs">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Editorial photograph — after copy on mobile; right column on tablet+ */}
        <motion.div
          initial={heroFade.initial}
          animate={heroFade.animate}
          transition={{ ...heroFade.transition, delay: 0.12 }}
          className="
            relative z-10 w-full
            md:col-start-2 md:self-end
            min-[1200px]:h-full min-[1200px]:min-h-[min(84vh,900px)]
          "
        >
          <div
            className="
              relative w-full overflow-hidden shadow-hero-img
              md:h-[min(72vh,720px)] md:rounded-[32px]
              min-[1200px]:h-full min-[1200px]:min-h-[min(84vh,900px)] min-[1200px]:rounded-[36px]
            "
          >
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              priority
              fetchPriority="high"
              sizes="(min-width: 1200px) 45vw, (min-width: 768px) 48vw, 100vw"
              className="
                h-auto w-full rounded-[24px] object-contain
                md:absolute md:inset-0 md:h-full md:w-full md:rounded-[32px] md:object-cover md:object-bottom
                min-[1200px]:rounded-[36px]
              "
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
