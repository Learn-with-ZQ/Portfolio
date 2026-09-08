import { createPageMetadata } from "@/lib/metadata";
import {
  Braces,
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Users,
  Wrench,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { SkillBar } from "@/components/skills/skill-bar";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata = createPageMetadata({
  title: "Skills",
  description:
    "Technical proficiency of Muhammad Zaid Qasim across backend, database, mobile, frontend, tooling, and soft skills — from .NET Core to SQL Server optimization.",
  path: "/skills",
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  server: Server,
  code: Code2,
  database: Database,
  smartphone: Smartphone,
  layout: Layout,
  braces: Braces,
  wrench: Wrench,
  users: Users,
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Expertise"
        title="Skills"
        description="Technical proficiency across backend, database, mobile, frontend, and tooling — built through years of enterprise delivery."
      />
      <Section className="pt-0 sm:pt-0">
        <div className="section-shell rounded-[2rem] p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.28em] text-primary uppercase">
              Capability map
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              A practical stack shaped by enterprise delivery, product thinking, and production support.
            </h2>
          </div>
        </div>
        <Stagger className="mt-8 grid gap-6 md:grid-cols-2">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon] ?? Code2;
            return (
              <StaggerItem
                key={category.id}
                className="surface-panel rounded-[1.6rem] p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-semibold">{category.title}</h2>
                </div>
                <div className="mt-6 space-y-5">
                  {category.skills.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>
    </>
  );
}
