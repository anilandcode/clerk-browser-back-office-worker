interface DisclosureProps {
  variant?: "banner" | "inline" | "footer";
  className?: string;
}

export function Disclosure({ variant = "banner", className = "" }: DisclosureProps) {
  const content = "Synthetic demo · Simulated browser actions · No real systems connected · No real credentials · No real financial transactions";

  if (variant === "banner") {
    return (
      <div className={`bg-[var(--color-warning-bg)] border border-amber-200 rounded-md px-4 py-3 ${className}`}>
        <div className="flex items-start gap-3">
          <span className="text-amber-600 text-sm mt-0.5">⚠</span>
          <p className="text-xs text-amber-800 leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span className={`text-[10px] text-[var(--color-text-subtle)] italic ${className}`}>
        {content}
      </span>
    );
  }

  // footer variant
  return (
    <div className={`bg-[var(--color-bg-sunken)] border-t border-[var(--color-border)] px-6 py-4 ${className}`}>
      <p className="text-[10px] text-[var(--color-text-subtle)] text-center leading-relaxed">
        {content}
      </p>
    </div>
  );
}
