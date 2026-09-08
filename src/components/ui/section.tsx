import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-4 sm:py-6 lg:py-8", className)}>
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-5 max-w-2xl sm:mb-6",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold tracking-[0.28em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
