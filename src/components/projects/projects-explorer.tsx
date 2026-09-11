"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { projectCategories, projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";

type Category = (typeof projectCategories)[number];

export function ProjectsExplorer() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const matchesQuery =
        term === "" ||
        project.name.toLowerCase().includes(term) ||
        project.summary.toLowerCase().includes(term) ||
        project.context.toLowerCase().includes(term) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(term));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-rule pb-6 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex w-full gap-1 rounded-lg border border-rule-strong p-1 sm:inline-flex sm:w-auto"
        >
          {projectCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "h-10 flex-1 rounded-md px-3.5 text-[0.9375rem] font-medium transition-colors sm:flex-none",
                category === item
                  ? "bg-ink text-ground"
                  : "text-ink-muted hover:bg-surface hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects or technology"
            aria-label="Search projects"
            className="field pl-10"
          />
        </div>
      </div>

      <p className="type-meta mt-6 text-ink-muted" role="status">
        Showing <span className="font-mono tabular-nums text-ink">{filtered.length}</span> of{" "}
        <span className="font-mono tabular-nums">{projects.length}</span> projects
      </p>

      <h2 className="sr-only">Project list</h2>
      {filtered.length > 0 ? (
        <ul className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.slug} className="min-w-0">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="surface-quiet mt-6 px-6 py-12 sm:px-10">
          <h3 className="type-h3">No projects found</h3>
          <p className="type-body mt-2 text-ink-muted">
            Nothing matches &ldquo;{query}&rdquo; in{" "}
            {category === "All" ? "any category" : `the ${category} category`}. Try a
            different search term or filter.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex h-11 items-center rounded-full border border-rule-strong px-5 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink hover:bg-surface"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
