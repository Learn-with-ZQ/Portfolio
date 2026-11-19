import { TriangleAlert } from "lucide-react";

export function ErrorPanel({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-error/50 px-4 py-3 text-error"
    >
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p className="type-meta">{message}</p>
    </div>
  );
}
