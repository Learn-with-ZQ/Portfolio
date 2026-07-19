"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function StarRating({ value, onChange, disabled = false }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          role="radio"
          aria-checked={value === rating}
          aria-label={`${rating} ${rating === 1 ? "star" : "stars"}`}
          disabled={disabled}
          onClick={() => onChange(rating)}
          className="text-muted focus-visible:outline-primary rounded p-1 transition-colors hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Star
            className={cn("h-6 w-6", rating <= value && "fill-amber-400 text-amber-400")}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
