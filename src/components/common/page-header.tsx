import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-grid pt-24 pb-10 sm:pt-28 sm:pb-12">
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-72 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "linear-gradient(120deg, var(--primary), var(--accent))" }}
      />
      <Container className="relative">
        <Reveal>
          <div className="section-shell rounded-[2rem] border border-border/70 p-8 sm:p-10 lg:p-14">
            <p className="mb-3 text-sm font-semibold tracking-[0.28em] text-primary uppercase">
              {eyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
