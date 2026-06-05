import { RiskLevel } from "@/lib/types";

interface RiskBadgeProps {
  risk: RiskLevel;
  size?: "sm" | "md";
}

const riskConfig: Record<
  RiskLevel,
  { label: string; className: string }
> = {
  low: {
    label: "Low",
    className: "bg-[var(--color-approved-bg)] text-[var(--color-approved)]",
  },
  medium: {
    label: "Medium",
    className: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  },
  high: {
    label: "High",
    className: "bg-orange-100 text-orange-700",
  },
  critical: {
    label: "Critical",
    className: "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)]",
  },
};

export function RiskBadge({ risk, size = "sm" }: RiskBadgeProps) {
  const config = riskConfig[risk];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium tracking-tight ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
      } ${config.className}`}
    >
      {config.label}
    </span>
  );
}
