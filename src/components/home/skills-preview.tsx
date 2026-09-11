import Link from "next/link";
import { skillCategories } from "@/data/skills";
import { Section, SectionHeading } from "@/components/ui/section";
import { RecordRow } from "@/components/ui/record-row";
import { Badge } from "@/components/ui/badge";

const previewCategoryIds = ["backend", "database", "mobile", "concepts"];

export function SkillsPreview() {
  const categories = skillCategories.filter((category) =>
    previewCategoryIds.includes(category.id),
  );

  return (
    <Section rule labelledBy="capabilities-title">
      <SectionHeading
        id="capabilities-title"
        title="Capabilities"
        description="A focused snapshot of the tools and systems I use to turn complex requirements into dependable software."
        action={
          <Link href="/skills" className="link type-meta font-medium">
            Full skills breakdown
          </Link>
        }
      />
      <div>
        {categories.map((category) => (
          <RecordRow
            key={category.id}
            aside={<h3 className="type-h3">{category.title}</h3>}
          >
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <Badge>{skill.name}</Badge>
                </li>
              ))}
            </ul>
          </RecordRow>
        ))}
      </div>
    </Section>
  );
}
