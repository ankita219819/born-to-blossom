import Image from "next/image";
import { cn } from "@/lib/utils";

export function AboutCherryBlossom({ className }: { className?: string }) {
  return (
    <Image
      src="/images/about-right-cherry-blossom.webp"
      alt=""
      width={840}
      height={960}
      aria-hidden
      loading="lazy"
      className={cn(
        "pointer-events-none absolute right-0 top-0 z-0 hidden h-auto select-none object-contain object-right-top",
        "w-[200px] opacity-50 md:block md:w-[280px] md:opacity-75 xl:w-[420px] xl:opacity-100",
        className
      )}
    />
  );
}
