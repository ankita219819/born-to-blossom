import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "figure";
};

export function Card({ as: Tag = "div", className, children, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC] shadow-[0_10px_30px_rgba(30,20,10,0.05)]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
