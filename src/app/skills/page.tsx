import { createPageMetadata } from "@/lib/metadata";
import { getSkillCategories } from "@/lib/content";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { RecordRow } from "@/components/ui/record-row";

export const metadata = createPageMetadata({
  title: "Skills",
  description:
    "Skills of Muhammad Zaid Qasim — .NET and ASP.NET Core back ends, SQL Server query optimization, mobile with React Native and .NET MAUI, and AI and data science.",
  path: "/skills",
});

// No ratings. A percentage bar implied a measurement that doesn't exist; the
// Expert/Advanced tiers that replaced it were still self-ratings, and "Claude
// AI — Advanced" or "Public Speaking — Advanced" read as unsupported (audit
// A3, 2026-11-17). The list is the résumé's; the evidence is on /experience
// and /projects.

export default async function SkillsPage() {
  const skillCategories = await getSkillCategories();
  return (
    <>
      <PageHeader
        title="Skills"
        description="What I work with, grouped as on my résumé. The experience and project pages show where each one was used."
      />
      <Section>
        <div>
          {skillCategories.map((category) => (
            // Each skill line fades on its own (not the whole category), so the
            // bottom of the screen reads as a smooth light gradient.
            <RecordRow
              key={category.id}
              reveal={false}
              className="first:border-t-0 first:pt-0"
              aside={<h2 className="type-h3 reveal">{category.title}</h2>}
            >
              <ul className="grid gap-x-10 sm:grid-cols-2 xl:grid-cols-3">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="reveal border-b border-rule py-2.5 text-ink">
                    {skill.name}
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
