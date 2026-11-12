import type { CSSProperties } from "react";
import { StoryStage } from "@/components/story/story-stage";
import { cn } from "@/lib/utils";

/*
 * How the Space Optimizer packs: objects entered by dimension — circle,
 * triangle, square, rectangle, line — are mapped onto a grid of cells and
 * packed into a grid container, and the result reports the wasted area. The
 * circle's footprint matches a real "Optimize Solution" output (10 × 7
 * container, wasted area 0); the corners are filled with the other shape
 * types so all five appear. Total: 70 of 70 cells.
 *
 * History (2026-11-11): sketched rectangles in a 120 × 160 box were
 * inaccurate; a version that "cleaned up" a hand-drawn loop into the circle
 * was also wrong — the system packs shapes of different types and doesn't
 * correct drawings (user corrections).
 */

/** Container cell size, and the smaller cell size used on the input pad. */
const CELL = 19;
const INPUT_CELL = 10;
const SHRINK = INPUT_CELL / CELL;

const GRID = { x: 140, y: 34, cols: 10, rows: 7 };
const PAD = { x: 2, y: 2, width: 128, height: 196 };

type Form = "ellipse" | "triangle-left" | "triangle-right" | "rect" | "line";

interface Piece {
  id: string;
  form: Form;
  /** Footprint on the grid: [first, last] column of each row, relative to the piece. */
  rows: ReadonlyArray<readonly [number, number]>;
  /** Top-left cell in the container. */
  at: readonly [number, number];
  /** Top-left on the input pad, and its tilt there. */
  pad: readonly [number, number];
  tilt: number;
  tag?: { text: string; x: number; y: number };
}

const PIECES: Piece[] = [
  {
    id: "circle",
    form: "ellipse",
    rows: [
      [3, 6],
      [2, 7],
      [1, 8],
      [0, 9],
      [1, 8],
      [2, 7],
      [3, 6],
    ],
    at: [0, 0],
    pad: [16, 18],
    tilt: 0,
    tag: { text: "circle 10 × 7", x: 16, y: 12 },
  },
  {
    id: "triangle-left",
    form: "triangle-left",
    rows: [
      [0, 2],
      [0, 1],
      [0, 0],
    ],
    at: [0, 0],
    pad: [16, 106],
    tilt: -6,
    tag: { text: "3 × 3", x: 16, y: 100 },
  },
  {
    id: "triangle-right",
    form: "triangle-right",
    rows: [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    at: [7, 0],
    pad: [54, 106],
    tilt: 5,
    tag: { text: "3 × 3", x: 54, y: 100 },
  },
  {
    id: "square-large",
    form: "rect",
    rows: [
      [0, 1],
      [0, 1],
    ],
    at: [8, 5],
    pad: [94, 110],
    tilt: 7,
    tag: { text: "2 × 2", x: 94, y: 100 },
  },
  {
    id: "rectangle",
    form: "rect",
    rows: [[0, 1]],
    at: [0, 5],
    pad: [16, 150],
    tilt: -4,
    tag: { text: "2 × 1", x: 16, y: 144 },
  },
  {
    id: "square-a",
    form: "rect",
    rows: [[0, 0]],
    at: [0, 4],
    pad: [56, 150],
    tilt: 5,
    tag: { text: "1 × 1", x: 56, y: 144 },
  },
  { id: "square-b", form: "rect", rows: [[0, 0]], at: [9, 4], pad: [70, 150], tilt: -6 },
  { id: "square-c", form: "rect", rows: [[0, 0]], at: [7, 6], pad: [84, 150], tilt: 3 },
  {
    id: "line",
    form: "line",
    rows: [[0, 2]],
    at: [0, 6],
    pad: [16, 178],
    tilt: -3,
    tag: { text: "line 3", x: 16, y: 172 },
  },
];

/** Placed pieces vary in tint so neighbours read apart; the circle is the strongest. */
const PLACED_TINTS = [
  "fill-primary/15",
  "fill-primary/5",
  "fill-primary/20",
  "fill-primary/10",
];

const EASE = "cubic-bezier(0.2, 0.7, 0.2, 1)";
/** A slight overshoot, so pieces snap into their cells. */
const LAND = "cubic-bezier(0.34, 1.35, 0.64, 1)";
const SCAN_MS = 1400;
const SCAN_TOP = 4;
const SCAN_DISTANCE = 188;
/** Form strokes are drawn in container units; this keeps them ~1.5 on the pad. */
const FORM_STROKE = 1.5 / SHRINK;

/** When the sweep reaches a given y on the pad, in ms after it starts. */
const sweepAt = (y: number) =>
  Math.round(100 + (Math.max(0, y - SCAN_TOP) / SCAN_DISTANCE) * SCAN_MS);

function size(piece: Piece) {
  const cols = Math.max(...piece.rows.map(([, last]) => last)) + 1;
  return { width: cols * CELL, height: piece.rows.length * CELL };
}

/** Outline of a footprint whose rows are each one contiguous run. */
function footprintOutline(rows: Piece["rows"]) {
  const right = rows.flatMap(([, last], row) => [
    [last + 1, row],
    [last + 1, row + 1],
  ]);
  const left = rows
    .map(([first], row) => [
      [first, row + 1],
      [first, row],
    ])
    .reverse()
    .flat();
  const points = [...right, ...left].map(([x, y]) => `${x * CELL} ${y * CELL}`);
  return `M${points.join(" L")} Z`;
}

/** The shape as entered: its true geometry, before it is mapped onto the grid. */
function ShapeForm({ piece, style }: { piece: Piece; style: CSSProperties }) {
  const { width, height } = size(piece);
  const common = {
    pathLength: 1,
    strokeWidth: FORM_STROKE,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "fill-none stroke-ink",
    style,
  };
  switch (piece.form) {
    case "ellipse":
      return <ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} {...common} />;
    case "triangle-left":
      return <polygon points={`0,0 ${width},0 0,${height}`} {...common} />;
    case "triangle-right":
      return <polygon points={`0,0 ${width},0 ${width},${height}`} {...common} />;
    case "line":
      return <line x1={0} y1={height / 2} x2={width} y2={height / 2} {...common} />;
    default:
      return <rect width={width} height={height} {...common} />;
  }
}

/** A small dimension tag on the pad (hidden on phones, where it would be too small to read). */
function Tag({
  x,
  y,
  opacity,
  children,
}: {
  x: number;
  y: number;
  opacity: number;
  children: React.ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={5.5}
      className="hidden fill-ink-muted font-mono sm:inline"
      style={{ opacity, transition: "opacity 400ms ease" }}
    >
      {children}
    </text>
  );
}

interface PackingStageProps {
  step: number;
  count: number;
  label: string;
}

/**
 * Step 0: the empty 10 × 7 container. 1: shapes entered by dimension.
 * 2: each shape measured onto the grid as the cells it covers. 3: packed, no waste.
 */
export function PackingStage({ step, count, label }: PackingStageProps) {
  const entered = step >= 1;
  const measured = step >= 2;
  const placed = step >= 3;

  return (
    <StoryStage label={label} caption="2D bin packing" step={step} count={count}>
      <svg
        viewBox="0 0 336 200"
        className="mx-auto block h-auto max-h-[52svh] w-full overflow-visible"
      >
        {/* Input pad */}
        <rect
          x={PAD.x}
          y={PAD.y}
          width={PAD.width}
          height={PAD.height}
          rx={7}
          strokeDasharray="4 4"
          className="fill-none stroke-rule-strong"
        />

        {/* Container */}
        {Array.from({ length: GRID.cols - 1 }, (_, index) => (
          <line
            key={`col-${index}`}
            x1={GRID.x + (index + 1) * CELL}
            x2={GRID.x + (index + 1) * CELL}
            y1={GRID.y}
            y2={GRID.y + GRID.rows * CELL}
            className="stroke-rule"
          />
        ))}
        {Array.from({ length: GRID.rows - 1 }, (_, index) => (
          <line
            key={`row-${index}`}
            x1={GRID.x}
            x2={GRID.x + GRID.cols * CELL}
            y1={GRID.y + (index + 1) * CELL}
            y2={GRID.y + (index + 1) * CELL}
            className="stroke-rule"
          />
        ))}
        <rect
          x={GRID.x}
          y={GRID.y}
          width={GRID.cols * CELL}
          height={GRID.rows * CELL}
          strokeWidth={1.5}
          className={cn(
            "fill-none transition-[stroke] duration-700",
            placed ? "stroke-primary" : "stroke-ink",
          )}
        />

        {/* Measuring sweep over the pad (globals.css `.scan-beam`) */}
        <g
          className="scan-beam"
          data-scan={measured && !placed}
          style={
            {
              "--scan-distance": `${SCAN_DISTANCE}px`,
              "--scan-duration": `${SCAN_MS}ms`,
            } as CSSProperties
          }
        >
          <rect x={6} y={SCAN_TOP - 9} width={120} height={10} className="fill-pending/15" />
          <rect x={6} y={SCAN_TOP} width={120} height={1.5} className="fill-pending" />
        </g>

        {PIECES.flatMap((piece) =>
          piece.tag
            ? [
                <Tag
                  key={`tag-${piece.id}`}
                  x={piece.tag.x}
                  y={piece.tag.y}
                  opacity={entered && !placed ? 1 : 0}
                >
                  {piece.tag.text}
                </Tag>,
              ]
            : [],
        )}

        {PIECES.map((piece, index) => {
          const [padX, padY] = piece.pad;
          const [col, row] = piece.at;
          const x = placed ? GRID.x + col * CELL : padX;
          const y = placed ? GRID.y + row * CELL : padY;
          const isCircle = piece.form === "ellipse";
          const placedTint = isCircle
            ? "fill-primary/40"
            : PLACED_TINTS[index % PLACED_TINTS.length];
          const footprintDone = sweepAt(padY + piece.rows.length * INPUT_CELL);
          const landDelay = isCircle ? 0 : 300 + index * 70;

          return (
            <g
              key={piece.id}
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${placed ? 0 : piece.tilt}deg) scale(${placed ? 1 : SHRINK})`,
                transformBox: "view-box",
                transformOrigin: "0 0",
                opacity: entered ? 1 : 0,
                transition: `transform ${placed ? `950ms ${LAND} ${landDelay}ms` : `600ms ${EASE}`}, opacity 300ms ease ${entered && !placed ? index * 90 : 0}ms`,
              }}
            >
              {/* Footprint: the cells the shape covers */}
              {piece.rows.flatMap(([first, last], footRow) =>
                Array.from({ length: last - first + 1 }, (_, offset) => (
                  <rect
                    key={`${first + offset}-${footRow}`}
                    x={(first + offset) * CELL + 1}
                    y={footRow * CELL + 1}
                    width={CELL - 2}
                    height={CELL - 2}
                    className={placed ? placedTint : "fill-pending/30"}
                    style={{
                      opacity: measured ? 1 : 0,
                      transition: `opacity 250ms ease ${measured && !placed ? sweepAt(padY + footRow * INPUT_CELL) : 0}ms, fill 600ms ease`,
                    }}
                  />
                )),
              )}
              <path
                d={footprintOutline(piece.rows)}
                strokeWidth={1.5}
                className={placed ? "fill-none stroke-primary" : "fill-none stroke-pending"}
                style={{
                  opacity: measured ? 1 : 0,
                  transition: `opacity 300ms ease ${measured && !placed ? footprintDone : 0}ms, stroke 600ms ease`,
                }}
              />

              {/* The shape as entered, drawn in */}
              <ShapeForm
                piece={piece}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: entered ? 0 : 1,
                  opacity: placed ? 0 : measured ? 0.3 : 1,
                  transition: `stroke-dashoffset 900ms ease ${entered ? index * 90 : 0}ms, opacity 400ms ease`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Fixed-size footer: the stage must not change height between steps. */}
      <div className="type-meta mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-ink-muted">
        <span className="flex items-center gap-2.5">
          Space used
          <span className="relative h-1.5 w-20 overflow-hidden rounded-full bg-rule">
            <span
              className="absolute inset-0 origin-left rounded-full bg-primary transition-transform duration-700"
              style={{
                transform: `scaleX(${placed ? 1 : 0})`,
                transitionDelay: placed ? "1200ms" : "0ms",
              }}
            />
          </span>
          <span
            className="font-mono tabular-nums text-ink transition-opacity duration-300"
            style={{ opacity: placed ? 1 : 0, transitionDelay: placed ? "1700ms" : "0ms" }}
          >
            100%
          </span>
        </span>
        <span>
          Container{" "}
          <span className="font-mono tabular-nums text-ink">
            {GRID.cols} × {GRID.rows}
          </span>
          <span
            className="transition-opacity duration-300"
            style={{ opacity: placed ? 1 : 0, transitionDelay: placed ? "1700ms" : "0ms" }}
          >
            {" "}
            · Wasted area <span className="font-mono tabular-nums text-ink">0</span>
          </span>
        </span>
      </div>
    </StoryStage>
  );
}
