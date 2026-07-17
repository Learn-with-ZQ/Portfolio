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
        <Stagger className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon] ?? Code2;
            return (
              <StaggerItem
                key={category.id}
                className="card-surface rounded-2xl p-6 sm:p-8"
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
