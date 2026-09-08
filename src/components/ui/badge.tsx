import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "accent" | "outline";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-card-hover/80 text-muted border border-border/70",
  primary: "bg-primary-soft text-primary border border-primary/20",
  accent: "bg-accent-soft text-accent border border-accent/20",
  outline: "border border-border-strong text-muted bg-background/40",
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
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap shadow-sm",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
