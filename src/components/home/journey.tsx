import { Briefcase, GraduationCap, Rocket, Users2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";

const storyCards = [
  {
    icon: Briefcase,
    title: "Current Role",
    body: "Software Developer at E-Creatorz, deployed as Resident Engineer at IoBM — owning delivery and production support for enterprise systems.",
  },
  {
    icon: GraduationCap,
    title: "Current Studies",
    body: "Pursuing an MS in Data Science at NED University, building on a BS in Computer Science from PAF-KIET.",
  },
  {
    icon: Users2,
    title: "Leadership & Speaking",
    body: "Active in community leadership, organizing committees and public speaking — delivering events and mentoring peers.",
  },
  {
    icon: Rocket,
    title: "Career Goals",
    body: "Growing toward solution architecture — combining backend engineering depth with data science to deliver measurable business value.",
  },
];

export function Journey() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="The story"
          title="A practice shaped by delivery and curiosity"
          description="The milestones, roles, and ambitions that continue to define how I build."
        />
      </Reveal>
      <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {storyCards.map((card) => (
          <StaggerItem key={card.title} className="section-shell rounded-[1.7rem] p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <card.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
