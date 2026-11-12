import { Check } from "lucide-react";
import { authorizationFlow } from "@/data/projects";
import { StoryStage } from "@/components/story/story-stage";
import { cn } from "@/lib/utils";

type NodeState = "idle" | "active" | "done";

// Pending = in progress, primary = cleared (UI.md §3). Tints are mixed with the
// panel colour so the schematic grid doesn't show through them. Both states get
// a solid border plus a 3px leading edge: a 70% border with a 7% tint barely
// showed on the dark navy panel (user report, 2026-11-11). The 12% blue tint
// keeps muted text >= 4.98:1 in both themes; 16% would drop it to 4.67:1.
const nodeStyles: Record<NodeState, string> = {
  idle: "border-rule-strong bg-surface-elevated",
  active:
    "border-pending bg-[color-mix(in_srgb,var(--pending)_8%,var(--surface-elevated))] shadow-[inset_3px_0_0_var(--pending)]",
  done:
    "border-primary bg-[color-mix(in_srgb,var(--primary)_12%,var(--surface-elevated))] shadow-[inset_3px_0_0_var(--primary)]",
};

const labelText = "inline-flex items-center gap-1.5 text-[0.8125rem] leading-5";

function StateLabel({
  state,
  activeLabel,
  doneLabel,
}: {
  state: NodeState;
  activeLabel: string;
  doneLabel: string;
}) {
  if (state === "active") {
    return (
      <span className={cn(labelText, "font-medium text-pending-text")}>
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-pending" />
        {activeLabel}
      </span>
    );
  }
  if (state === "done") {
    return (
      <span className={cn(labelText, "font-medium text-primary")}>
        <Check aria-hidden="true" className="h-3.5 w-3.5" />
        {doneLabel}
      </span>
    );
  }
  return <span className={cn(labelText, "text-ink-muted")}>Waiting</span>;
}

function Connector({ filled }: { filled: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative ml-[1.2rem] block h-3 w-px overflow-hidden bg-rule-strong sm:ml-[1.45rem] sm:h-4"
    >
      <span
        className={cn(
          "absolute inset-0 origin-top bg-primary transition-transform duration-500",
          filled ? "scale-y-100" : "scale-y-0",
        )}
      />
    </span>
  );
}

interface AuthorizationStageProps {
  step: number;
  count: number;
  label: string;
}

/**
 * Step 0 introduces the chain, steps 1–4 each put one role to work, and the
 * final step shows the transaction received by the core banking system.
 */
export function AuthorizationStage({ step, count, label }: AuthorizationStageProps) {
  const { stages, transactionTypes } = authorizationFlow;
  const finalStep = stages.length + 1;
  const received = step >= finalStep;
  const stateOf = (index: number): NodeState =>
    received || index < step - 1 ? "done" : index === step - 1 ? "active" : "idle";

  return (
    <StoryStage label={label} caption="Transaction authorization" step={step} count={count}>
      <ul className="mb-4 hidden flex-wrap gap-1.5 sm:flex">
        {transactionTypes.map((type) => (
          <li
            key={type}
            className="rounded border border-rule px-1.5 py-0.5 font-mono text-xs text-ink-muted"
          >
            {type}
          </li>
        ))}
      </ul>

      <ol>
        {stages.map((stage, index) => {
          const state = stateOf(index);
          return (
            <li key={stage.role}>
              <div
                className={cn(
                  "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 rounded-lg border px-3 py-2 transition-colors duration-500 sm:px-4 sm:py-2.5",
                  nodeStyles[state],
                )}
              >
                <span className="font-mono text-xs tabular-nums text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="leading-snug font-semibold text-ink">{stage.role}</p>
                  <p className="type-meta hidden text-ink-muted sm:block">{stage.duty}</p>
                </div>
                <StateLabel
                  state={state}
                  activeLabel={stage.activeLabel}
                  doneLabel={stage.doneLabel}
                />
              </div>
              <Connector filled={state === "done"} />
            </li>
          );
        })}
      </ol>

      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-lg border px-3 py-2 transition-colors duration-500 sm:px-4 sm:py-2.5",
          received ? nodeStyles.done : "border-dashed border-rule-strong bg-surface-elevated",
        )}
      >
        <p className="leading-snug font-semibold text-ink">Core banking system</p>
        {received ? (
          <span className={cn(labelText, "font-medium text-primary")}>
            <Check aria-hidden="true" className="h-3.5 w-3.5" />
            Received
          </span>
        ) : (
          <span className={cn(labelText, "text-ink-muted")}>Not reached</span>
        )}
      </div>
    </StoryStage>
  );
}
