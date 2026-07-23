import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="bg-grid relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12">
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-72 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "linear-gradient(120deg, var(--primary), var(--accent))" }}
      />
      <Container className="relative">
        <Reveal>
          <p className="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </div>
  );
}
