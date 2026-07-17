import { createPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/page-header";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { Section } from "@/components/ui/section";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Enterprise platforms, banking workflows, and academic research by Muhammad Zaid Qasim — search, filter, and explore each project.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Projects"
        description="Selected work across enterprise systems, mobile banking, and academic research — search, filter, and explore each one."
      />
      <Section className="pt-0 sm:pt-0">
        <ProjectsExplorer />
      </Section>
    </>
  );
}
