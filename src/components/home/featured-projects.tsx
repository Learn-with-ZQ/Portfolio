import Link from "next/link";
import { getFeaturedProjects, projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { Section, SectionHeading } from "@/components/ui/section";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <Section id="featured-projects" labelledBy="featured-title" rule>
      <SectionHeading
        id="featured-title"
        title="Selected work"
        description="A curated view into the products, platforms, and engineering work that shaped my practice."
        action={
          <Link href="/projects" className="link type-meta font-medium">
            All {projects.length} projects
          </Link>
        }
      />
      <ul className="grid gap-5 lg:grid-cols-2">
        {featured.map((project) => (
          <li key={project.slug} className="min-w-0">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
