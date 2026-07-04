"use client";

import { cn } from "@/lib/utils";

type FloatingPetalsProps = {
  count?: number;
  className?: string;
};

export function FloatingPetals({ count = 8, className }: FloatingPetalsProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={cn("petal hidden md:block", className)}
          style={{
            left: `${8 + index * 9}%`,
            animationDelay: `${index * -1.45}s`,
            animationDuration: `${13 + (index % 5)}s`
          }}
        />
      ))}
    </>
  );
}
