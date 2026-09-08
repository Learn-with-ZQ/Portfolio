import { stats } from "@/data/profile";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Stats() {
  return (
    <Section className="py-4 sm:py-6 lg:py-8">
      <Stagger className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem
            key={stat.label}
            className="rounded-[1.15rem] border border-border/70 bg-card/70 px-5 py-4 text-left"
          >
            <p className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.22em] text-muted">
              {stat.label}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
