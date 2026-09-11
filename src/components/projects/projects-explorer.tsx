"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SearchX } from "lucide-react";
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

  return (
    <div>
      <div className="section-shell rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.28em] text-primary uppercase">
              Selected work
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              A compact view of the systems, platforms, and products I&apos;ve helped shape.
            </h2>
          </div>
          <div className="relative w-full sm:w-72">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects or tech…"
              aria-label="Search projects"
              className="surface-panel h-11 w-full rounded-full pr-4 pl-11 text-sm outline-none placeholder:text-muted focus:border-primary"
            />
          </div>
        </div>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-6 flex flex-wrap gap-2"
        >
          {projectCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                category === item
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border border-border text-muted hover:border-primary hover:text-primary",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" role="status">
        Showing {filtered.length} of {projects.length} projects
      </p>

      <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="surface-panel mt-6 flex flex-col items-center rounded-[1.8rem] px-6 py-16 text-center">
          <SearchX className="h-10 w-10 text-muted" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Nothing matches &ldquo;{query}&rdquo; in {category === "All" ? "any category" : `the ${category} category`}.
            Try a different search term or filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
          >
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
