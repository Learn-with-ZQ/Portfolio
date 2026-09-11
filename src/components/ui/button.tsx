import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color] duration-150 disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  // Gradient + foreground come from theme tokens (.btn-primary in globals.css),
  // so the label stays readable in both themes.
  primary: "btn-primary",
  secondary: "border border-rule-strong text-ink hover:border-ink hover:bg-surface",
  ghost: "text-ink-muted hover:bg-surface hover:text-ink",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
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
