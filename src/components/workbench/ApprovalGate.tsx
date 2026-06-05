"use client";

import { ApprovalRequest } from "@/lib/types";
import { Button } from "@/components/shared/Button";
import {
  Clock,
  CheckCircle,
  XCircle,
  Question,
} from "@phosphor-icons/react/dist/ssr";

interface ApprovalGateProps {
  approval: ApprovalRequest;
  onApprove?: () => void;
  onReject?: () => void;
}

const statusConfig: Record<
  ApprovalRequest["status"],
  {
    label: string;
    icon: React.ElementType;
    className: string;
    description: string;
  }
> = {
  pending: {
    label: "Pending Approval",
    icon: Clock,
    className:
      "bg-[var(--color-approval-bg)] text-[var(--color-approval)] border-purple-200",
    description: "Action paused until approval decision",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle,
    className:
      "bg-[var(--color-approved-bg)] text-[var(--color-approved)] border-green-200",
    description: "Action approved - simulated submit allowed",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className:
      "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)] border-red-200",
    description: "Action rejected - returned to queue",
  },
  needs_more_evidence: {
    label: "Needs Evidence",
    icon: Question,
    className:
      "bg-[var(--color-warning-bg)] text-[var(--color-warning)] border-amber-200",
    description: "Additional evidence required before decision",
  },
};

export function ApprovalGate({
  approval,
  onApprove,
  onReject,
}: ApprovalGateProps) {
  const config = statusConfig[approval.status];
  const Icon = config.icon;

  return (
    <div
      className={`border rounded-[var(--radius-lg)] overflow-hidden ${config.className}`}
    >
      <div className="px-4 py-3 border-b border-inherit">
        <div className="flex items-center gap-2">
          <Icon size={14} weight="fill" />
          <h3 className="text-[11px] font-semibold tracking-tight">
            {config.label}
          </h3>
        </div>
        <p className="text-[10px] mt-1 opacity-80">{config.description}</p>
      </div>

      <div className="px-4 py-3 bg-[var(--color-surface-elevated)]">
        <div className="mb-3">
          <h4 className="text-[10px] text-[var(--color-ink-ghost)] uppercase tracking-wider font-medium mb-1">
            Reason
          </h4>
          <p className="text-[12px] text-[var(--color-ink-secondary)]">
            {approval.reason}
          </p>
        </div>

        <div className="mb-3">
          <h4 className="text-[10px] text-[var(--color-ink-ghost)] uppercase tracking-wider font-medium mb-1">
            Evidence
          </h4>
          <ul className="space-y-1">
            {approval.evidence.map((item, idx) => (
              <li
                key={idx}
                className="text-[11px] text-[var(--color-ink-secondary)] flex items-start gap-1.5"
              >
                <CheckCircle
                  size={11}
                  weight="fill"
                  className="text-[var(--color-approved)] mt-0.5 shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {approval.status === "pending" && (
          <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-rule)]">
            <Button size="sm" onClick={onApprove}>
              Approve
            </Button>
            <Button variant="danger" size="sm" onClick={onReject}>
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
