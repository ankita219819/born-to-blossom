"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ServiceDetail } from "@/lib/services-data";
import { fadeUp, staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: ServiceDetail;
  index?: number;
  className?: string;
  compact?: boolean;
};

export function ServiceCard({ service, index = 0, className, compact }: ServiceCardProps) {
  return (
    <motion.article
      {...fadeUp}
      transition={staggerDelay(index)}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[16px] border border-[#EFE5DA] bg-[#FFFDFC]/95 shadow-[0_6px_18px_rgba(30,20,10,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <Link
        href={service.slug === "restore" ? "/restore" : `/services/${service.slug}`}
        className="flex h-full flex-col"
      >
        {service.image ? (
          <div className={cn("relative w-full overflow-hidden", compact ? "aspect-[4/5]" : "aspect-[5/4]")}>
            <Image
              src={service.image}
              alt={service.imageAlt ?? service.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ) : (
          <div
            className={cn(
              "flex w-full items-end bg-gradient-to-br from-[#F8F3ED] via-[#FFFDFC] to-[#E8F2EA] p-4",
              compact ? "aspect-[4/5]" : "min-h-[120px]"
            )}
          >
            <p className="font-display text-[1.35rem] font-medium leading-none text-[#365A43]/35 md:text-[1.6rem]">
              {service.shortTitle}
            </p>
          </div>
        )}

        <div className={cn("flex flex-1 flex-col", compact ? "p-3 md:p-3.5" : "p-4 md:p-5")}>
          <h3
            className={cn(
              "font-display font-medium leading-[1.25] text-[#2E2925]",
              compact ? "text-[0.82rem] md:text-[0.9rem]" : "text-[1.05rem] md:text-[1.15rem]"
            )}
          >
            {service.title}
          </h3>
          <p
            className={cn(
              "mt-1.5 leading-[1.6] text-[#6F6258]",
              compact ? "text-[0.62rem] md:text-[0.66rem]" : "text-[0.8rem] md:text-[0.85rem]"
            )}
          >
            {service.summary}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <span className={cn("font-semibold text-[#2E2925]", compact ? "text-[0.65rem]" : "text-xs")}>
              {service.duration}
            </span>
            <span className="grid h-7 w-7 place-items-center rounded-full border border-[#E4CFAF] text-[#C69C6D] transition group-hover:border-[#365A43] group-hover:text-[#365A43]">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
