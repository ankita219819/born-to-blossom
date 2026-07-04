import Image from "next/image";
import { cn } from "@/lib/utils";

export const PRACTITIONER_PORTRAIT = {
  src: "/images/practitioner-about.webp",
  width: 1024,
  height: 1536,
  alt: "Born To Blossom practitioner — warm, professional portrait"
} as const;

type PractitionerPortraitProps = {
  className?: string;
  wrapperClassName?: string;
};

export function PractitionerPortrait({
  className,
  wrapperClassName
}: PractitionerPortraitProps) {
  return (
    <div
      className={cn(
        "mx-auto mt-6 w-full max-w-[380px] md:mt-0 md:max-w-[420px] min-[1200px]:max-w-[520px]",
        wrapperClassName
      )}
    >
      <Image
        src={PRACTITIONER_PORTRAIT.src}
        alt={PRACTITIONER_PORTRAIT.alt}
        width={PRACTITIONER_PORTRAIT.width}
        height={PRACTITIONER_PORTRAIT.height}
        loading="lazy"
        decoding="async"
        sizes="(min-width: 1200px) 520px, (min-width: 768px) 420px, 380px"
        className={cn(
          "h-auto w-full object-contain",
          "rounded-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.08)]",
          "md:rounded-[24px]",
          "min-[1200px]:rounded-[28px]",
          className
        )}
      />
    </div>
  );
}

type PractitionerSplitLayoutProps = {
  children: React.ReactNode;
  portrait?: React.ReactNode;
  /** Portrait column on the left from tablet up (default About layout). */
  portraitSide?: "left" | "right";
  className?: string;
};

export function PractitionerSplitLayout({
  children,
  portrait = <PractitionerPortrait />,
  portraitSide = "left",
  className
}: PractitionerSplitLayoutProps) {
  const portraitOrder =
    portraitSide === "left"
      ? "order-2 md:order-1"
      : "order-2 md:order-2";
  const contentOrder =
    portraitSide === "left"
      ? "order-1 md:order-2"
      : "order-1 md:order-1";

  const portraitCol =
    portraitSide === "left" ? "md:col-start-1" : "md:col-start-2";
  const contentCol =
    portraitSide === "left" ? "md:col-start-2" : "md:col-start-1";

  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-6",
        "md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] md:gap-8",
        "min-[1200px]:gap-12",
        className
      )}
    >
      <div className={cn("flex justify-center md:justify-start", portraitOrder, portraitCol)}>
        {portrait}
      </div>
      <div className={cn(contentOrder, contentCol)}>{children}</div>
    </div>
  );
}
