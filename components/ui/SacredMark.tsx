import { Flower2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SacredMark({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative aspect-square w-12 rounded-full border border-blossom-rose/35", className)}
      aria-hidden
    >
      <div className="absolute inset-2 rounded-full border border-blossom-gold/60" />
      <div className="absolute left-1/2 top-1/2 h-[72%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-blossom-rose/45" />
      <div className="absolute left-1/2 top-1/2 h-[72%] w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-blossom-rose/45" />
      <Flower2 className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-blossom-rose" />
    </div>
  );
}
