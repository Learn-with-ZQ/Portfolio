import { ArrowRight, Braces, Code2, Database, Layout, Server, Smartphone, Users, Wrench } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

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

const previewCategoryIds = ["backend", "database", "mobile", "concepts"];

export function SkillsPreview() {
  const categories = skillCategories.filter((category) =>
    previewCategoryIds.includes(category.id),
  );

  return (
    <Section className="border-y border-border bg-card/40">
      <Reveal>
        <SectionHeading
          eyebrow="Expertise"
          title="What I Work With"
          description="A backend-heavy toolkit built through years of enterprise delivery — from .NET APIs and SQL Server tuning to cross-platform mobile apps."
        />
      </Reveal>
      <Stagger className="grid gap-6 sm:grid-cols-2">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] ?? Code2;
          return (
            <StaggerItem key={category.id} className="card-surface rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill.name}>{skill.name}</Badge>
                ))}
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
      <Reveal className="mt-10 text-center" delay={0.1}>
        <ButtonLink href="/skills" variant="outline" size="lg">
          See All Skills
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
