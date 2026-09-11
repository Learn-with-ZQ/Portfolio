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
      aria-label={`Theme: ${current}. Change theme.`}
      title={`Theme: ${current}`}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-md border border-rule text-ink-muted transition-colors hover:border-rule-strong hover:text-ink",
        className,
      )}
    >
      {/* Same-size placeholder before mount, so nothing shifts or flashes. */}
      {mounted ? <Icon className="h-[18px] w-[18px]" aria-hidden="true" /> : <span className="h-[18px] w-[18px]" />}
    </button>
  );
}
