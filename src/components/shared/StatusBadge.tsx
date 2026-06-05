import { TaskStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: TaskStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<
  TaskStatus,
  { label: string; className: string }
> = {
  READY: {
    label: "Ready",
    className: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-[var(--color-accent-muted)] text-[var(--color-accent)]",
  },
  WAITING_APPROVAL: {
    label: "Waiting",
    className: "bg-[var(--color-approval-bg)] text-[var(--color-approval)]",
  },
  BLOCKED: {
    label: "Blocked",
    className: "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)]",
  },
  COMPLETED: {
    label: "Done",
    className: "bg-[var(--color-approved-bg)] text-[var(--color-approved)]",
  },
};

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status];

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
