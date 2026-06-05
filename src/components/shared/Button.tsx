import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variantStyles = {
  primary:
    "bg-[var(--color-ink)] text-white hover:bg-[#2A2928] active:scale-[0.98]",
  secondary:
    "bg-[var(--color-surface-elevated)] text-[var(--color-ink)] border border-[var(--color-rule)] hover:border-[var(--color-rule-strong)] hover:bg-[var(--color-surface-sunken)] active:scale-[0.98]",
  danger:
    "bg-[var(--color-blocked)] text-white hover:bg-[#A93226] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-ink)] active:scale-[0.98]",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-[13px]",
  lg: "px-5 py-2.5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 font-medium rounded-[var(--radius-md)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] disabled:opacity-40 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
