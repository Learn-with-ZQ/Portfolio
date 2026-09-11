import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

/** Read-only star rating. Stars are neutral ink — rating isn't a status. */
export function Rating({ value, max = 5, size = "sm", className }: RatingProps) {
  return (
    <span
      role="img"
      aria-label={`${value} out of ${max} stars`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            size === "md" ? "h-5 w-5" : "h-4 w-4",
            index < value ? "fill-ink text-ink" : "text-rule-strong",
          )}
        />
      ))}
    </span>
  );
}
