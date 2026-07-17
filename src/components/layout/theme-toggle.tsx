"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const themeOrder = ["light", "dark", "system"] as const;

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = (mounted ? theme : "system") as (typeof themeOrder)[number];
  const Icon = icons[current] ?? Monitor;

  const cycleTheme = () => {
    const index = themeOrder.indexOf(current);
    setTheme(themeOrder[(index + 1) % themeOrder.length]);
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Theme: ${current}. Click to change.`}
      title={`Theme: ${current}`}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary",
        className,
      )}
    >
      {mounted ? <Icon className="h-[18px] w-[18px]" /> : <span className="h-[18px] w-[18px]" />}
    </button>
  );
}
