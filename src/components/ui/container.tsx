import { cn } from "@/lib/utils";

/**
 * Page width and side gutters, shared with the header so the wordmark lines up
 * with the content. On desktop the gutter is 4% of the viewport (48px
 * minimum): about 77px on a 1920px screen. A fixed 96rem cap left ~230px of
 * empty margin on each side at 1920 (user report, 2026-11-11). Readable line
 * length is held by the type classes' own measure, not by the container.
 */
export const containerClass =
  "mx-auto w-full max-w-[120rem] px-5 sm:px-8 lg:px-[max(3rem,4vw)]";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(containerClass, className)}>{children}</div>;
}
