import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "accent" | "outline";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-card-hover text-muted border border-border",
  primary: "bg-primary-soft text-primary border border-transparent",
  accent: "bg-accent-soft text-accent border border-transparent",
  outline: "border border-border-strong text-muted",
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
