"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SacredMark } from "@/components/ui/SacredMark";
import { petalBranchSway, treeSway } from "@/lib/motion";

export function FooterDecoration() {
  return (
    <>
      {/* Desktop — large trees */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20px] left-[-140px] z-0 hidden w-[430px] select-none opacity-100 xl:block"
        {...treeSway}
      >
        <Image
          src="/left-tree.png"
          alt=""
          width={1040}
          height={1560}
          loading="lazy"
          aria-hidden
          className="h-auto w-full object-contain object-left-bottom"
        />
      </motion.div>

      {/* Desktop right tree lives in FooterRightTree (testimonials + footer wrapper) */}

      {/* Tablet — bottom corner branches */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-40px] z-0 hidden max-h-[25vh] w-[180px] select-none opacity-75 md:block xl:hidden"
        {...petalBranchSway}
      >
        <Image
          src="/images/petal-left.png"
          alt=""
          width={1024}
          height={1536}
          loading="lazy"
          aria-hidden
          className="h-auto max-h-[25vh] w-full object-contain object-left-bottom"
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[-40px] z-0 hidden max-h-[25vh] w-[180px] select-none opacity-75 md:block xl:hidden"
        {...petalBranchSway}
      >
        <Image
          src="/images/petal-right.png"
          alt=""
          width={1024}
          height={1536}
          loading="lazy"
          aria-hidden
          className="h-auto max-h-[25vh] w-full object-contain object-right-bottom"
        />
      </motion.div>

      {/* Mobile — tree top, sacred geometry bottom */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-6 top-0 z-0 w-[140px] select-none opacity-50 md:hidden"
        {...treeSway}
      >
        <Image
          src="/right-tree.png"
          alt=""
          width={920}
          height={1240}
          loading="lazy"
          aria-hidden
          className="h-auto w-full object-contain object-right-top"
        />
      </motion.div>

      <SacredMark
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-1/2 z-0 w-40 -translate-x-1/2 opacity-[0.12] md:hidden"
      />
    </>
  );
}
