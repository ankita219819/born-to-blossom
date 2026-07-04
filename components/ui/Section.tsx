"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  endPad?: boolean;
};

export function Section({ id, endPad, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("section-pad relative overflow-hidden", endPad && "section-pad-end", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  centered = false,
  className
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      {...fadeUp}
      className={cn("max-w-3xl", centered && "mx-auto text-center", className)}
    >
      <p className="eyebrow mb-4 md:mb-5">{eyebrow}</p>
      <h2 className="font-display text-[2rem] font-medium leading-[1.12] tracking-[-0.04em] text-[#2E2925] md:text-[2.5rem] xl:text-[3.375rem]">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 text-[1rem] leading-[1.85] text-[#6F6258] md:mt-6 md:text-[1.0625rem] xl:text-[1.125rem]">
          {copy}
        </p>
      ) : null}
    </motion.div>
  );
}
