import Link from "next/link";
import { Check } from "lucide-react";
import { authorizationFlow, getProjectBySlug } from "@/data/projects";
import { cn } from "@/lib/utils";

interface AuthorizationSchematicProps {
  className?: string;
  /** Link the caption to the project page — off when already on it. */
  linkToProject?: boolean;
  headingId?: string;
}

/**
 * The Maker → Checker → Signatory → Releasor approval chain from Net 2 Bank,
 * drawn as an engineering diagram. Cleared stages are primary, the stage in
 * progress is pending. The nodes activate in sequence once on load (pure CSS,
 * see globals.css); with reduced motion they simply show the final state.
 */
export function AuthorizationSchematic({
  className,
  linkToProject = true,
  headingId = "schematic-title",
}: AuthorizationSchematicProps) {
  const project = getProjectBySlug(authorizationFlow.projectSlug);
  const lastIndex = authorizationFlow.stages.length - 1;

  return (
    <figure aria-labelledby={headingId} className={cn("schematic p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 border-b border-rule pb-4">
        <figcaption>
          <p id={headingId} className="font-semibold text-ink">
            Transaction authorization
          </p>
          <p className="type-meta text-ink-muted">
            Separation of duties
            {project ? (
              <>
                {" in "}
                {linkToProject ? (
                  <Link href={`/projects/${project.slug}`} className="link">
                    {project.name}
                  </Link>
                ) : (
                  project.name
                )}
              </>
            ) : null}
          </p>
        </figcaption>
        <ul aria-label="Transaction types" className="flex flex-wrap gap-1.5">
          {authorizationFlow.transactionTypes.map((type) => (
            <li
              key={type}
              className="rounded border border-rule px-1.5 py-0.5 font-mono text-xs text-ink-muted"
            >
              {type}
            </li>
          ))}
        </ul>
      </div>

      <ol className="mt-5">
        {authorizationFlow.stages.map((stage, index) => {
          const active = index === lastIndex;
          return (
            <li key={stage.role} style={{ "--i": index } as React.CSSProperties}>
              <div
                data-state={active ? "active" : "done"}
                className="schematic-node grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3.5 gap-y-1 sm:grid-cols-[auto_minmax(0,1fr)_auto]"
              >
                <span className="font-mono text-xs tabular-nums text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="leading-snug font-semibold text-ink">{stage.role}</p>
                  <p className="type-meta text-ink-muted">{stage.duty}</p>
                </div>
                <span className="schematic-state col-start-2 sm:col-start-3 sm:row-start-1">
                  {active ? (
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-pending" />
                  ) : (
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                  {stage.state}
                </span>
              </div>
              {index < lastIndex ? (
                <span aria-hidden="true" className="schematic-connector" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
