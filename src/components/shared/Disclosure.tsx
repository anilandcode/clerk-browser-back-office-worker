import { Warning } from "@phosphor-icons/react/dist/ssr";

interface DisclosureProps {
  variant?: "banner" | "inline" | "footer";
  className?: string;
}

export function Disclosure({
  variant = "banner",
  className = "",
}: DisclosureProps) {
  const content =
    "Synthetic demo. Simulated browser actions. No real systems connected.";

  if (variant === "banner") {
    return (
      <div
        className={`bg-[var(--color-warning-bg)] border border-[var(--color-warning)]/15 rounded-[var(--radius-lg)] px-4 py-3 ${className}`}
      >
        <div className="flex items-start gap-2.5">
          <Warning
            size={15}
            weight="fill"
            className="text-[var(--color-warning)] mt-0.5 shrink-0"
          />
          <p className="text-xs text-[var(--color-warning)] leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span
        className={`text-[11px] text-[var(--color-ink-ghost)] font-mono ${className}`}
      >
        {content}
      </span>
    );
  }

  return (
    <div
      className={`bg-[var(--color-surface-sunken)] border-t border-[var(--color-rule)] px-6 py-4 ${className}`}
    >
      <p className="text-[11px] text-[var(--color-ink-ghost)] text-center font-mono">
        {content}
      </p>
    </div>
  );
}
