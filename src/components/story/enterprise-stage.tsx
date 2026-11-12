import { enterpriseSystems } from "@/data/story";
import { Status } from "@/components/ui/badge";
import { StoryStage } from "@/components/story/story-stage";
import { cn } from "@/lib/utils";

type GroupState = "idle" | "current" | "seen" | "live";

/*
 * The system being described is boxed like a cleared stage in chapter 1
 * (solid primary border, 12% tint, 3px leading edge), and on the last step all
 * three are — "live in production". An ink-only highlight was invisible on the
 * dark navy panel (user report, 2026-11-11). Every group keeps its border and
 * padding in every state (transparent when off), so the stage never changes
 * height between steps.
 */
const groupStyles: Record<GroupState, string> = {
  idle: "border-transparent",
  seen: "border-transparent",
  current:
    "border-primary bg-[color-mix(in_srgb,var(--primary)_12%,var(--surface-elevated))] shadow-[inset_3px_0_0_var(--primary)]",
  live: "border-primary bg-[color-mix(in_srgb,var(--primary)_12%,var(--surface-elevated))] shadow-[inset_3px_0_0_var(--primary)]",
};

const chipStyles: Record<GroupState, string> = {
  idle: "border-rule text-ink-muted",
  seen: "border-rule-strong text-ink",
  current: "border-primary bg-surface-elevated text-ink",
  live: "border-primary bg-surface-elevated text-ink",
};

// Phones get one cell per module instead of labelled chips: 18 chips made the
// pinned stage 544px tall on a 375×812 screen, leaving ~200px to read in. The
// module names are in the step text either way.
const cellStyles: Record<GroupState, string> = {
  idle: "bg-rule",
  seen: "bg-rule-strong",
  current: "bg-primary",
  live: "bg-primary",
};

interface EnterpriseStageProps {
  step: number;
  count: number;
  label: string;
}

/** Step 0 shows every module, steps 1–3 walk one system each, the last marks them live. */
export function EnterpriseStage({ step, count, label }: EnterpriseStageProps) {
  const finalStep = enterpriseSystems.length + 1;
  const live = step >= finalStep;
  const stateOf = (index: number): GroupState =>
    live ? "live" : index === step - 1 ? "current" : index < step - 1 ? "seen" : "idle";
  const total = enterpriseSystems.reduce((sum, system) => sum + system.modules.length, 0);

  return (
    <StoryStage label={label} caption="Systems in production" step={step} count={count}>
      <div className="space-y-2 sm:space-y-3">
        {enterpriseSystems.map((system, index) => {
          const state = stateOf(index);
          const lit = state === "current" || state === "live";
          return (
            <div
              key={system.id}
              className={cn(
                "rounded-lg border px-3 py-2.5 transition-[border-color,background-color,box-shadow] duration-500 sm:px-4 sm:py-3 lg:py-4",
                groupStyles[state],
              )}
            >
              <p className="flex flex-wrap items-baseline gap-x-3 text-sm lg:text-base">
                <span
                  className={cn(
                    "font-semibold transition-colors duration-300",
                    state === "idle" ? "text-ink-muted" : "text-ink",
                  )}
                >
                  {system.name}
                </span>
                <span className="hidden text-ink-muted sm:inline">{system.stack}</span>
                <span
                  className={cn(
                    "ml-auto font-mono text-xs tabular-nums transition-colors duration-300",
                    lit ? "text-primary" : "text-ink-muted",
                  )}
                >
                  {system.modules.length}
                  <span className="hidden sm:inline"> modules</span>
                </span>
              </p>
              <div className="mt-2 flex gap-1 sm:hidden">
                {system.modules.map((module) => (
                  <span
                    key={module}
                    className={cn(
                      "h-2 flex-1 rounded-sm transition-colors duration-500",
                      cellStyles[state],
                    )}
                  />
                ))}
              </div>
              <ul className="mt-2 hidden flex-wrap gap-1.5 sm:flex lg:mt-3 lg:gap-2">
                {system.modules.map((module) => (
                  <li
                    key={module}
                    className={cn(
                      "rounded-md border px-2 py-0.5 text-xs leading-5 transition-colors duration-500 sm:text-[0.8125rem] lg:px-2.5 lg:py-1 lg:text-sm",
                      chipStyles[state],
                    )}
                  >
                    {module}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Fixed-height footer: the stage must not change size between steps. */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-rule pt-3 lg:mt-5 lg:pt-4">
        <p className="type-meta text-ink-muted">
          <span className="font-mono tabular-nums text-ink">{total}</span> modules and
          features
        </p>
        <Status
          tone="verified"
          emphasis
          className={cn("transition-opacity duration-500", live ? "opacity-100" : "opacity-0")}
        >
          Live at IoBM
        </Status>
      </div>
    </StoryStage>
  );
}
