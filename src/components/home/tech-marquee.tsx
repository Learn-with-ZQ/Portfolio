import { heroTechnologies } from "@/data/skills";

export function TechMarquee() {
  const items = [...heroTechnologies, ...heroTechnologies];

  return (
    <div
      className="relative overflow-hidden border-y border-border py-5"
      aria-label="Technologies I work with"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
      />
      <ul className="animate-marquee flex w-max items-center gap-10 motion-reduce:animate-none">
        {items.map((tech, index) => (
          <li
            key={`${tech}-${index}`}
            aria-hidden={index >= heroTechnologies.length}
            className="flex items-center gap-3 font-mono text-sm whitespace-nowrap text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}
