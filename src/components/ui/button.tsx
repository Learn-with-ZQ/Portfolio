import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-brand text-white shadow-lg shadow-[var(--glow)] hover:shadow-xl hover:shadow-[var(--glow)] hover:brightness-110",
  secondary:
    "bg-primary-soft text-primary hover:bg-primary hover:text-white",
  outline:
    "border border-border-strong text-foreground hover:border-primary hover:text-primary",
  ghost: "text-muted hover:text-foreground hover:bg-primary-soft",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  external,
  download,
  ariaLabel,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
