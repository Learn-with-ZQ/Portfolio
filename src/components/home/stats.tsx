import { stats } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Static figures — the values render in the server HTML, no counting animation. */
export function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-rule pt-8 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            "flex min-w-0 flex-col-reverse gap-1.5",
            index > 0 && "lg:border-l lg:border-rule lg:pl-6",
          )}
        >
          <dt className="type-meta text-ink-muted">{stat.label}</dt>
          <dd className="font-mono text-[1.75rem] leading-none font-medium tabular-nums text-ink sm:text-[2rem]">
            {stat.value}
            {stat.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}
