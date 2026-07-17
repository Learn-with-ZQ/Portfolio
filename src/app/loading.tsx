export default function Loading() {
  return (
    <div
      className="flex min-h-[70vh] items-center justify-center pt-16"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="bg-gradient-brand flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl font-mono text-sm font-bold text-white">
          ZQ
        </span>
        <span className="text-sm text-muted">Loading…</span>
      </div>
    </div>
  );
}
