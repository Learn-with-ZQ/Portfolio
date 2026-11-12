import Link from "next/link";
import type { Project } from "@/types";
import { Badge, Status } from "@/components/ui/badge";
import { formatDateRange } from "@/lib/format";

export function ProjectCard({ project }: { project: Project }) {
  const ongoing = project.endDate === null;
  const shownTech = project.technologies.slice(0, 3);
  const hiddenTech = project.technologies.length - shownTech.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="surface group reveal flex h-full flex-col p-6 transition-colors hover:border-rule-strong"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="type-meta text-ink-muted">{project.category}</span>
        <Status tone={ongoing ? "pending" : "verified"}>
          {ongoing ? "Ongoing" : project.paper ? "Presented" : "Completed"}
        </Status>
      </div>

      <h3 className="type-h3 mt-4 text-ink decoration-1 underline-offset-4 group-hover:underline">
        {project.name}
      </h3>
      <p className="type-meta mt-1 text-ink-muted">{project.context}</p>
      <p className="type-body mt-4 line-clamp-3 flex-1 text-ink-muted">{project.summary}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-rule pt-4">
        <ul aria-label="Technologies" className="flex flex-wrap items-center gap-1.5">
          {shownTech.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
          {hiddenTech > 0 ? (
            <li className="type-meta text-ink-muted">+{hiddenTech} more</li>
          ) : null}
        </ul>
        <span className="font-mono text-xs tabular-nums text-ink-muted">
          {formatDateRange(project.startDate, project.endDate)}
        </span>
      </div>
    </Link>
  );
}
