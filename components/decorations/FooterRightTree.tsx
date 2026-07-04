"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { treeSway } from "@/lib/motion";

/** Desktop right tree — anchored to footer bottom, grows up through testimonials. */
export function FooterRightTree() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute bottom-0 right-[-100px] z-[1] hidden w-[min(42vw,580px)] select-none xl:block"
      {...treeSway}
    >
      <Image
        src="/right-tree.png"
        alt=""
        width={920}
        height={1240}
        loading="lazy"
        aria-hidden
        className="h-auto w-full max-w-none object-contain object-right-bottom"
      />
    </motion.div>
  );
}
