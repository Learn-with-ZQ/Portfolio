import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <Section id="featured-projects">
      <Reveal>
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          description="Enterprise platforms, banking workflows, and research work — a selection of what I've built and maintain."
        />
      </Reveal>
      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {featured.map((project) => (
          <StaggerItem key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-10 text-center" delay={0.1}>
        <ButtonLink href="/projects" variant="outline" size="lg">
          Explore All Projects
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
