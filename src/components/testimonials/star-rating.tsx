"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

/** Rating input — 44px targets, neutral ink stars. */
export function StarRating({ value, onChange, disabled = false }: StarRatingProps) {
  return (
    <div className="flex items-center" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          role="radio"
          aria-checked={value === rating}
          aria-label={`${rating} ${rating === 1 ? "star" : "stars"}`}
          disabled={disabled}
          onClick={() => onChange(rating)}
          className="flex h-11 w-11 items-center justify-center rounded-md text-rule-strong transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Star
            className={cn("h-6 w-6", rating <= value && "fill-ink text-ink")}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
