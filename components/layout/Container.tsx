import { cn } from "@/lib/utils";

export function Container({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("container-xl relative z-10", className)} {...props}>
      {children}
    </div>
  );
}
