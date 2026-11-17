import type { ReactNode } from "react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * A small schematic at the top of a project card, drawn in the same language
 * as the home-page diagrams. Since 2026-11-17 each project has its own drawing
 * of what it actually does (user: "most of them have same design, they should
 * be different" — one motif per category made the four enterprise and four
 * academic cards identical). A project added later without a drawing here
 * falls back to its category's motif.
 *
 * Decorative (`aria-hidden`): the card's text carries the meaning. Strokes use
 * tokens, so they re-colour in both themes; the accent is `--primary`, or
 * `--research` for research work.
 */
export function ProjectMotif({ project, className }: { project: Project; className?: string }) {
  const accent = project.category === "Research" ? "var(--research)" : "var(--primary)";
  const line = "var(--rule-strong)";
  const draw = bySlug[project.slug] ?? byCategory[project.category];

  return (
    <svg
      viewBox="0 0 240 56"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
      focusable="false"
      className={cn("block h-14 w-full", className)}
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {draw ? draw(accent, line) : null}
    </svg>
  );
}

type Draw = (accent: string, line: string) => ReactNode;
const soft = 0.14; // fill opacity for accent areas

/* ---------- one drawing per project ---------- */

/** A spike in the sensor signal → SHAP bars → the report → checked by code. */
const alarmToAction: Draw = (a, l) => (
  <g>
    <path d="M4 34h10l4-8 4 14 4-10 4 4h6l4-22 4 32 4-10h10" stroke={a} />
    <path d="M66 28h18" stroke={l} strokeDasharray="2 4" />
    <path d="M110 8v40" stroke={l} />
    <rect x="110" y="13" width="26" height="6" rx="1" stroke={a} fill={a} fillOpacity={soft} />
    <rect x="92" y="25" width="18" height="6" rx="1" stroke={a} fill={a} fillOpacity={soft} />
    <rect x="110" y="37" width="12" height="6" rx="1" stroke={a} fill={a} fillOpacity={soft} />
    <path d="M146 28h18" stroke={l} strokeDasharray="2 4" />
    <rect x="170" y="8" width="28" height="40" rx="3" stroke={a} />
    <path d="M176 18h16M176 25h16M176 32h10" stroke={l} />
    <circle cx="222" cy="28" r="11" stroke={a} />
    <path d="M216 28l4 4 8-9" stroke={a} />
  </g>
);

/** Maker → Checker → Signatory → Releasor, the last stage still to clear. */
const authorizationChain: Draw = (a, l) => (
  <g>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect
          x={4 + i * 58}
          y={17}
          width={40}
          height={22}
          rx={4}
          stroke={i < 3 ? a : l}
          strokeDasharray={i < 3 ? undefined : "3 3"}
        />
        {i < 3 ? <path d={`M${44 + i * 58} 28h18`} stroke={i < 2 ? a : l} /> : null}
      </g>
    ))}
  </g>
);

/** Campus records: a student table with one row selected, feeding three modules. */
const campusRecords: Draw = (a, l) => (
  <g>
    <rect x="4" y="6" width="140" height="44" rx="4" stroke={l} />
    <path d="M4 17h140M40 6v44M96 6v44" stroke={l} />
    <rect x="5" y="28" width="138" height="10" fill={a} fillOpacity={soft} />
    <path d="M5 28h138M5 38h138" stroke={a} />
    <path d="M144 28h16" stroke={l} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x="164" y={6 + i * 16} width="72" height="12" rx="3" stroke={i === 0 ? a : l} />
    ))}
  </g>
);

/** ERP: one hub, four departments around it (payroll lit). */
const erpHub: Draw = (a, l) => (
  <g>
    {[
      [10, 8],
      [10, 36],
      [190, 8],
      [190, 36],
    ].map(([x, y], i) => (
      <g key={i}>
        <path d={x < 120 ? `M${x + 40} ${y + 6}L108 28` : `M${x} ${y + 6}L132 28`} stroke={l} />
        <rect x={x} y={y} width="40" height="12" rx="3" stroke={i === 0 ? a : l} />
      </g>
    ))}
    <circle cx="120" cy="28" r="12" stroke={a} fill={a} fillOpacity={soft} />
    <circle cx="120" cy="28" r="3" fill={a} />
  </g>
);

/** The student portal on the web and on the phone, kept in sync. */
const webAndMobile: Draw = (a, l) => (
  <g>
    <rect x="14" y="8" width="72" height="32" rx="3" stroke={l} />
    <path d="M4 44h92" stroke={l} />
    <path d="M22 18h34M22 25h48M22 32h22" stroke={a} />
    <path d="M100 22h22l-4-4M122 32h-22l4 4" stroke={l} />
    <rect x="130" y="6" width="26" height="44" rx="5" stroke={l} />
    <path d="M139 10h8" stroke={l} />
    <path d="M136 20h14M136 27h14M136 34h9" stroke={a} />
  </g>
);

/** Faculty: an attendance register with ticks, then assessment bars. */
const attendanceRegister: Draw = (a, l) => {
  const ticks = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1];
  return (
    <g>
      <rect x="4" y="4" width="128" height="48" rx="4" stroke={l} />
      <path d="M4 15h128" stroke={l} />
      {ticks.map((on, i) => {
        const x = 10 + (i % 7) * 17;
        const y = 22 + Math.floor(i / 7) * 14;
        return on ? (
          <path key={i} d={`M${x} ${y + 4}l3 3 6-7`} stroke={a} />
        ) : (
          <path key={i} d={`M${x + 1} ${y + 4}h8`} stroke={l} />
        );
      })}
      {[18, 28, 22, 34, 40].map((h, i) => (
        <rect
          key={i}
          x={150 + i * 17}
          y={50 - h}
          width="10"
          height={h}
          rx="2"
          stroke={i === 4 ? a : l}
          fill={i === 4 ? a : "none"}
          fillOpacity={soft}
        />
      ))}
    </g>
  );
};

/** A 2D bin: cells filled by packed shapes, nothing wasted on the left. */
const packing: Draw = (a, l) => {
  const filled = [
    [0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [3, 0], [3, 1], [2, 1],
    [4, 0], [5, 0], [4, 1], [6, 1], [5, 1], [7, 0],
  ];
  return (
    <g>
      <rect x={4} y={6} width={232} height={44} rx={4} stroke={l} />
      {filled.map(([col, row]) => (
        <rect
          key={`${col}-${row}`}
          x={10 + col * 22}
          y={12 + row * 17}
          width={18}
          height={13}
          rx={2}
          stroke={a}
          fill={a}
          fillOpacity={soft}
        />
      ))}
    </g>
  );
};

/** Three threads queue at a mutex; one at a time reaches the file. */
const mutex: Draw = (a, l) => (
  <g>
    {[12, 28, 44].map((y) => (
      <circle key={y} cx="8" cy={y} r="3" stroke={l} />
    ))}
    <path d="M11 12C44 12 62 30 96 30M11 44C44 44 62 30 96 30" stroke={l} />
    <path d="M11 28h40l45 2" stroke={a} />
    <rect x="98" y="24" width="24" height="18" rx="3" stroke={a} fill={a} fillOpacity={soft} />
    <path d="M102 24v-5a8 8 0 0 1 16 0v5" stroke={a} />
    <path d="M126 33h28" stroke={l} />
    <path d="M160 10h20l8 8v30h-28z" stroke={l} />
    <path d="M180 10v8h8M166 26h16M166 33h16M166 40h10" stroke={l} />
  </g>
);

/** A file, a key, and the ciphertext it becomes. */
const encryption: Draw = (a, l) => (
  <g>
    <path d="M4 10h18l7 7v31H4z" stroke={l} />
    <path d="M22 10v7h7M9 26h14M9 33h14M9 40h9" stroke={l} />
    <path d="M34 28h14" stroke={l} strokeDasharray="2 4" />
    <circle cx="60" cy="28" r="8" stroke={a} />
    <path d="M68 28h22M82 28v6M88 28v6" stroke={a} />
    <path d="M96 28h14" stroke={l} strokeDasharray="2 4" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect
        key={i}
        x={116 + i * 20}
        y={i % 2 ? 22 : 16}
        width="14"
        height={i % 2 ? 14 : 24}
        rx="2"
        stroke={a}
        fill={a}
        fillOpacity={i % 3 === 0 ? 0.3 : soft}
      />
    ))}
  </g>
);

/** A tank feeding a pipe network out to three delivery points. */
const pipeNetwork: Draw = (a, l) => (
  <g>
    <rect x="4" y="8" width="32" height="40" rx="3" stroke={l} />
    <rect x="5" y="26" width="30" height="21" fill={a} fillOpacity={soft} />
    <path d="M5 26h30" stroke={a} />
    <path d="M36 28h40M76 28V12h44M76 28V44h44M76 28h80" stroke={l} />
    <path d="M36 28h40" stroke={a} />
    {[
      [126, 12],
      [162, 28],
      [126, 44],
    ].map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" stroke={a} />
    ))}
    <path d="M200 20c4 6 6 9 6 12a6 6 0 0 1-12 0c0-3 2-6 6-12z" stroke={a} />
  </g>
);

const bySlug: Record<string, Draw> = {
  "from-alarm-to-action": alarmToAction,
  "net-2-bank": authorizationChain,
  "edu-smartz-cms": campusRecords,
  "ebiz-smartz-erp": erpHub,
  "edu-smartz-student-portal": webAndMobile,
  "edu-smartz-faculty-portal": attendanceRegister,
  "space-optimizer": packing,
  "concurrent-file-access-control": mutex,
  "code-fusion": encryption,
  "water-distribution-management": pipeNetwork,
};

/* ---------- fallback, for a project with no drawing above ---------- */

const modules: Draw = (a, l) => (
  <g>
    {[3, 2, 3].map((count, box) => (
      <g key={box}>
        <rect x={4 + box * 80} y={6} width={68} height={44} rx={4} stroke={box === 0 ? a : l} />
        {Array.from({ length: count }, (_, bar) => (
          <path
            key={bar}
            d={`M${14 + box * 80} ${18 + bar * 11}h${box === 0 ? 40 - bar * 8 : 32 - bar * 6}`}
            stroke={box === 0 ? a : l}
          />
        ))}
      </g>
    ))}
  </g>
);

const byCategory: Record<Project["category"], Draw> = {
  Mobile: authorizationChain,
  Enterprise: modules,
  Academic: packing,
  Research: alarmToAction,
};
