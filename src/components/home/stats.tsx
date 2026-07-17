import { stats } from "@/data/profile";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Stats() {
  return (
    <Section className="py-10 sm:py-12 lg:py-14">
      <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem
            key={stat.label}
            className="card-surface rounded-2xl p-6 text-center"
          >
            <p className="text-gradient text-3xl font-bold sm:text-4xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
