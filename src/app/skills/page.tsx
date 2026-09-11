import type { SkillLevel } from "@/types";
import { createPageMetadata } from "@/lib/metadata";
import { skillCategories } from "@/data/skills";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { RecordRow } from "@/components/ui/record-row";

export const metadata = createPageMetadata({
  title: "Skills",
  description:
    "Technical proficiency of Muhammad Zaid Qasim across backend, database, mobile, frontend, tooling, and soft skills — from .NET Core to SQL Server optimization.",
  path: "/skills",
});

// The data keeps a 0–100 self-rating; showing it as a precise percentage bar
// implied a measurement that doesn't exist, so it is presented as a tier.
function toLevel(level: number): SkillLevel {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Proficient";
  return "Familiar";
}

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        title="Skills"
        description="Technical proficiency across backend, database, mobile, frontend, and tooling — built through years of enterprise delivery."
      />
      <Section>
        <div>
          {skillCategories.map((category) => (
            <RecordRow
              key={category.id}
              className="first:border-t-0 first:pt-0"
              aside={<h2 className="type-h3">{category.title}</h2>}
            >
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5"
                  >
                    <span className="text-ink">{skill.name}</span>
                    <span className="type-meta shrink-0 text-ink-muted">
                      {toLevel(skill.level)}
                    </span>
                  </li>
                ))}
              </ul>
            </RecordRow>
          ))}
        </div>
      </Section>
    </>
  );
}
