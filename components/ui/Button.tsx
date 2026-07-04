import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "button-ripple inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold transition-all duration-[350ms] focus:outline-none focus:ring-2 focus:ring-[#365A43] focus:ring-offset-2 md:h-[56px] md:px-8 md:text-[1rem] xl:h-[60px] xl:px-9",
        variant === "primary"
          ? "bg-[#365A43] text-white shadow-[0_12px_28px_rgba(54,90,67,0.22)] hover:-translate-y-0.5 hover:bg-[#2D4B37]"
          : "border border-[#DCCDBE] bg-white text-[#365A43] hover:-translate-y-0.5 hover:border-[#365A43]",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
