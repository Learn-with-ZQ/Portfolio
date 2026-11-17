import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";

export async function FeaturedProjects() {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.featured);

  return (
    // Right after the hero, on the light ground (audit A4).
    <Section id="featured-projects" labelledBy="featured-title">
      <SectionHeading
        id="featured-title"
        title="Selected work"
        description={`${featured.length} projects that show how I work. The other ${projects.length - featured.length} are on the projects page.`}
        action={
          // A 40px button, not a 15px-tall text link (audit A5).
          <ButtonLink href="/projects" variant="secondary" size="sm">
            All {projects.length} projects
          </ButtonLink>
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
