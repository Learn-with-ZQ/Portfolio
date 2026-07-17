import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDateRange } from "@/lib/format";

const categoryVariant = {
  Enterprise: "primary",
  Mobile: "accent",
  Academic: "outline",
} as const;

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-surface group flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <FolderGit2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <ArrowUpRight
          className="h-5 w-5 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-primary">
        {project.name}
      </h3>
      <p className="mt-1 text-xs font-medium text-muted">{project.context}</p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant={categoryVariant[project.category]}>{project.category}</Badge>
        {project.technologies.slice(0, 3).map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
        {project.technologies.length > 3 ? (
          <Badge>+{project.technologies.length - 3}</Badge>
        ) : null}
      </div>

      <p className="mt-4 font-mono text-xs text-muted">
        {formatDateRange(project.startDate, project.endDate)}
      </p>
    </Link>
  );
}
