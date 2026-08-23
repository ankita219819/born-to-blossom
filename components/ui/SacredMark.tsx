import Image from "next/image";
import { cn } from "@/lib/utils";

export const SITE_LOGO = {
  src: "/images/logo.png",
  width: 1024,
  height: 1024,
  alt: "Born to Blossom logo — a safe and nurturing space for healing emotions"
} as const;

type BrandLogoProps = {
  className?: string;
  /** Decorative mark (watermark); hides from assistive tech */
  decorative?: boolean;
  priority?: boolean;
};

export function BrandLogo({ className, decorative = false, priority = false }: BrandLogoProps) {
  return (
    <Image
      src={SITE_LOGO.src}
      alt={decorative ? "" : SITE_LOGO.alt}
      width={SITE_LOGO.width}
      height={SITE_LOGO.height}
      priority={priority}
      className={cn("h-auto w-full object-contain", className)}
      aria-hidden={decorative || undefined}
    />
  );
}

/** @deprecated Prefer BrandLogo — kept so decorative call sites keep working */
export function SacredMark({ className }: { className?: string }) {
  return <BrandLogo className={className} decorative />;
}
