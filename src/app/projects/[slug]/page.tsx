import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { GitHubIcon } from "@/components/ui/social-icons";
import { authorizationFlow, getProjectBySlug, projects } from "@/data/projects";
import { socialLinks } from "@/data/social";
import { formatDateRange, formatDuration } from "@/lib/format";
import { createPageMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getProjectSchema } from "@/lib/schema";
import { PageHeader } from "@/components/common/page-header";
import { AuthorizationSchematic } from "@/components/home/authorization-schematic";
import { Section } from "@/components/ui/section";
import { Badge, Status } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return createPageMetadata({
    title: project.name,
    description: project.summary,
    path: `/projects/${project.slug}`,
    keywords: [project.name, ...project.technologies, "Muhammad Zaid Qasim"],
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const githubProfile = socialLinks.find((link) => link.icon === "github");
  const ongoing = project.endDate === null;
  const projectSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: project.name, path: `/projects/${project.slug}` },
      ]),
      getProjectSchema(project),
    ],
  };

  return (
    <>
      <JsonLd data={projectSchema} />
      <PageHeader
        title={project.name}
        description={project.summary}
        meta={
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/projects"
              className="type-meta inline-flex min-h-9 items-center gap-1.5 text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All projects
            </Link>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="type-meta text-ink-muted">{project.category}</span>
              <Status tone={ongoing ? "pending" : "verified"}>
                {ongoing ? "Ongoing" : "Completed"}
              </Status>
            </div>
          </div>
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <article className="min-w-0">
            <h2 className="type-h2">Overview</h2>
            <div className="mt-5 space-y-5">
              {project.description.map((paragraph, index) => (
                <p key={index} className="type-body text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            {project.slug === authorizationFlow.projectSlug ? (
              <AuthorizationSchematic className="mt-10 max-w-xl" linkToProject={false} />
            ) : null}

            <h2 className="type-h2 mt-12">Key highlights</h2>
            <ul className="list-rule mt-5 space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="type-body text-ink">
                  {highlight}
                </li>
              ))}
            </ul>
          </article>

          {/* The sticky panel is the aside's only child, so it can't slide over anything. */}
          <aside className="min-w-0">
            <div className="surface-quiet p-6 lg:sticky lg:top-24">
              <h2 className="sr-only">Project details</h2>
              <dl className="space-y-5">
                <div>
                  <dt className="type-meta text-ink-muted">Context</dt>
                  <dd className="mt-1 text-ink">{project.context}</dd>
                </div>
                <div>
                  <dt className="type-meta text-ink-muted">Timeline</dt>
                  <dd className="mt-1 font-mono text-sm tabular-nums text-ink">
                    {formatDateRange(project.startDate, project.endDate)}
                  </dd>
                </div>
                <div>
                  <dt className="type-meta text-ink-muted">Duration</dt>
                  <dd className="mt-1 font-mono text-sm tabular-nums text-ink">
                    {formatDuration(project.startDate, project.endDate)}
                  </dd>
                </div>
                <div>
                  <dt className="type-meta text-ink-muted">Technologies</dt>
                  <dd className="mt-2">
                    <ul className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <li key={tech}>
                          <Badge>{tech}</Badge>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
              {project.category !== "Academic" ? (
                <p className="type-meta mt-6 border-t border-rule pt-5 text-ink-muted">
                  This is a proprietary enterprise system — source code and live access are
                  restricted by the client.
                </p>
              ) : githubProfile ? (
                <div className="mt-6 border-t border-rule pt-5">
                  <ButtonLink
                    href={githubProfile.url}
                    external
                    variant="secondary"
                    className="w-full"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    Visit my GitHub
                  </ButtonLink>
                </div>
              ) : null}
            </div>
          </aside>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="type-meta text-ink-muted">Next project</p>
            <p className="type-h3 mt-1">{nextProject.name}</p>
          </div>
          <ButtonLink href={`/projects/${nextProject.slug}`} variant="secondary">
            View project
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
