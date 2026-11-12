"use client";

import { useEffect, useState } from "react";
import { Layers3, Orbit, Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

type PortfolioTheme = "minimal" | "creative" | "futuristic" | "hybrid";

const themes: Array<{
  id: PortfolioTheme;
  label: string;
  icon: typeof Sparkles;
}> = [
  { id: "minimal", label: "Minimal", icon: Sparkles },
  { id: "creative", label: "Creative", icon: Wand2 },
  { id: "futuristic", label: "Futuristic", icon: Orbit },
  { id: "hybrid", label: "Hybrid", icon: Layers3 },
];

function getInitialTheme(): PortfolioTheme {
  if (typeof window === "undefined") {
    return "hybrid";
  }

  const saved = window.localStorage.getItem("portfolio-theme") as PortfolioTheme | null;
  if (saved && themes.some((theme) => theme.id === saved)) {
    return saved;
  }

  return "hybrid";
}

export function DesignThemeSwitcher({ className }: { className?: string }) {
  const [theme, setTheme] = useState<PortfolioTheme>("hybrid");

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-portfolio-theme", initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-portfolio-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {themes.map((item) => {
        const Icon = item.icon;
        const isActive = theme === item.id;

        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => setTheme(item.id)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold tracking-wide transition-all duration-300",
              isActive
                ? "border-primary/40 bg-primary/12 text-primary shadow-[0_0_0_1px_var(--primary-soft)]"
                : "border-border/70 bg-card/60 text-muted hover:border-primary/30 hover:text-foreground",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
