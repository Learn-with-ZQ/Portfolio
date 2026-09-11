import { cn } from "@/lib/utils";

interface SurfaceProps {
  /** elevated = a discrete object on the page; quiet = a secondary panel. */
  tone?: "elevated" | "quiet";
  className?: string;
  children: React.ReactNode;
}

/** The one bordered container. Use it only for things that are objects. */
export function Surface({ tone = "elevated", className, children }: SurfaceProps) {
  return (
    <div className={cn(tone === "quiet" ? "surface-quiet" : "surface", className)}>
      {children}
    </div>
  );
}
