"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { branchSway, petalBranchSway } from "@/lib/motion";

export function SideBotanicalBranch({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-0 hidden select-none overflow-hidden md:block",
        /* Anchor to viewport-left corner; shift most of the art off-screen */
        "left-0 top-[30px] w-[110px] -translate-x-[45%] opacity-50",
        "md:top-[50px] md:w-[170px] md:-translate-x-[50%] md:opacity-75",
        "xl:top-10 xl:w-[230px] xl:-translate-x-[62%] xl:opacity-100",
        className
      )}
      {...branchSway}
    >
      <Image
        src="/images/decorations/side-botanical-branch.webp"
        alt=""
        width={1024}
        height={1536}
        priority={false}
        aria-hidden
        className="h-auto max-h-[7.5rem] w-full object-contain object-left-top md:max-h-[min(38vh,320px)] xl:max-h-[min(42vh,340px)]"
      />
    </motion.div>
  );
}

export function ServicesBranchDecor() {
  return (
    <>
      {/* Bottom-left — main branch grows up over first cards */}
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-0 left-[-3.5rem] z-0 hidden w-[13rem] select-none opacity-75 md:block",
          "md:left-[-4.5rem] md:w-[17rem] md:opacity-90",
          "xl:left-[-5.5rem] xl:w-[21rem] xl:opacity-100"
        )}
        {...petalBranchSway}
      >
        <Image
          src="/images/petal-left.png"
          alt=""
          width={1024}
          height={1536}
          loading="lazy"
          aria-hidden
          className="h-auto w-full object-contain object-left-bottom"
        />
      </motion.div>

      {/* Bottom-right — smaller branch with stray petals above */}
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-0 right-[-2rem] z-0 hidden w-[9rem] select-none opacity-75 md:block",
          "md:right-[-2.5rem] md:w-[11rem] md:opacity-90",
          "xl:right-[-3.5rem] xl:w-[13.5rem] xl:opacity-100"
        )}
        {...petalBranchSway}
      >
        <Image
          src="/images/petal-right.png"
          alt=""
          width={1024}
          height={1536}
          loading="lazy"
          aria-hidden
          className="h-auto w-full object-contain object-right-bottom"
        />
      </motion.div>

      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          aria-hidden
          className="services-petal pointer-events-none absolute z-0 hidden md:block"
          style={{
            right: `${8 + index * 5}%`,
            bottom: `${22 + index * 9}%`,
            animationDelay: `${index * -2.4}s`
          }}
        />
      ))}
    </>
  );
}

export function VideosPetalDecor() {
  return (
    <>
      <Image
        src="/images/petals.png"
        alt=""
        width={480}
        height={960}
        loading="lazy"
        aria-hidden
        className="pointer-events-none absolute -left-2 top-[58%] z-0 hidden h-auto w-[7.5rem] -translate-y-1/2 select-none opacity-90 md:block md:-left-6 md:w-[10rem] xl:-left-12 xl:w-[12.5rem] xl:opacity-100"
      />
      <Image
        src="/images/petals.png"
        alt=""
        width={480}
        height={960}
        loading="lazy"
        aria-hidden
        className="pointer-events-none absolute -right-2 top-[58%] z-0 hidden h-auto w-[7.5rem] -translate-y-1/2 scale-x-[-1] select-none opacity-90 md:block md:-right-6 md:w-[10rem] xl:-right-12 xl:w-[12.5rem] xl:opacity-100"
      />
    </>
  );
}

export function FamilyBloomDecor() {
  return (
    <Image
      src="/images/petal-right.png"
      alt=""
      width={100}
      height={85}
      loading="lazy"
      aria-hidden
      className="pointer-events-none absolute right-4 top-0 z-0 w-16 select-none object-contain opacity-50 md:hidden"
    />
  );
}
