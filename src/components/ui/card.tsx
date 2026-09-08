import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("surface-panel rounded-[1.6rem] p-6", className)}>{children}</div>
  );
}
