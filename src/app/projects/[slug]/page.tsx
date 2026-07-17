import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/social-icons";
import { getProjectBySlug, projects } from "@/data/projects";
import { socialLinks } from "@/data/social";
import { formatDateRange, formatDuration } from "@/lib/format";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

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
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const githubProfile = socialLinks.find((link) => link.icon === "github");

  return (
    <>
      <div className="bg-grid relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-72 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "linear-gradient(120deg, var(--primary), var(--accent))" }}
        />
        <Container className="relative">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All Projects
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="primary">{project.category}</Badge>
              {project.endDate === null ? <Badge variant="accent">Ongoing</Badge> : null}
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {project.summary}
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="pb-16 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
              {project.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-12 text-2xl font-bold tracking-tight">Key Highlights</h2>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-base leading-relaxed text-muted">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside>
            <Reveal delay={0.1}>
              <div className="card-surface space-y-6 rounded-2xl p-6 lg:sticky lg:top-28">
                <div>
                  <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                    <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
                    Context
                  </h2>
                  <p className="mt-2 text-sm text-muted">{project.context}</p>
                </div>
                <div>
                  <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                    <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                    Timeline
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {formatDateRange(project.startDate, project.endDate)}
                  </p>
                </div>
                <div>
                  <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    Duration
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {formatDuration(project.startDate, project.endDate)}
                  </p>
                </div>
                <div>
                  <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                    <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
                    Technologies
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
                {project.category !== "Academic" ? (
                  <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted">
                    This is a proprietary enterprise system — source code and live
                    access are restricted by the client.
                  </p>
                ) : githubProfile ? (
                  <a
                    href={githubProfile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    Visit My GitHub
                  </a>
                ) : null}
              </div>
            </Reveal>
          </aside>
        </div>

        <Reveal delay={0.1}>
          <div className="card-surface mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-muted">Next project</p>
              <p className="mt-1 text-lg font-semibold">{nextProject.name}</p>
            </div>
            <ButtonLink href={`/projects/${nextProject.slug}`} variant="outline">
              View Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
