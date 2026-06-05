import { PolicyOutcome } from "@/lib/types";

interface PolicyBadgeProps {
  outcome: PolicyOutcome;
  size?: "sm" | "md";
}

const outcomeConfig: Record<
  PolicyOutcome,
  { label: string; className: string }
> = {
  ALLOW: {
    label: "Allow",
    className: "bg-[var(--color-allow-bg)] text-[var(--color-allow)]",
  },
  REVIEW_REQUIRED: {
    label: "Review",
    className: "bg-[var(--color-review-bg)] text-[var(--color-review)]",
  },
  APPROVAL_REQUIRED: {
    label: "Approval",
    className: "bg-[var(--color-approval-bg)] text-[var(--color-approval)]",
  },
  BLOCKED: {
    label: "Blocked",
    className: "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)]",
  },
};

export function PolicyBadge({ outcome, size = "sm" }: PolicyBadgeProps) {
  const config = outcomeConfig[outcome];

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
