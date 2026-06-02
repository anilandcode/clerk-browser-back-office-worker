"use client";

import { ApprovalRequest } from "@/lib/types";
import { Button } from "@/components/shared/Button";

interface ApprovalGateProps {
  approval: ApprovalRequest;
  onApprove?: () => void;
  onReject?: () => void;
}

const statusConfig: Record<
  ApprovalRequest["status"],
  { label: string; className: string; description: string }
> = {
  pending: {
    label: "Pending Approval",
    className: "bg-[var(--color-approval-bg)] text-[var(--color-approval)] border-purple-200",
    description: "Action paused until approval decision",
  },
  approved: {
    label: "Approved",
    className: "bg-[var(--color-approved-bg)] text-[var(--color-approved)] border-green-200",
    description: "Action approved — simulated submit allowed",
  },
  rejected: {
    label: "Rejected",
    className: "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)] border-red-200",
    description: "Action rejected — returned to queue",
  },
  needs_more_evidence: {
    label: "Needs Evidence",
    className: "bg-[var(--color-warning-bg)] text-[var(--color-warning)] border-amber-200",
    description: "Additional evidence required before decision",
  },
};

export function ApprovalGate({ approval, onApprove, onReject }: ApprovalGateProps) {
  const config = statusConfig[approval.status];

  return (
    <div className={`border rounded-lg overflow-hidden ${config.className}`}>
      <div className="px-4 py-3 border-b border-inherit">
        <div className="flex items-center gap-2">
          <span className="text-sm">⊙</span>
          <h3 className="text-xs font-semibold">{config.label}</h3>
        </div>
        <p className="text-[10px] mt-1 opacity-80">{config.description}</p>
      </div>
      
      <div className="px-4 py-3 bg-[var(--color-bg-elevated)]">
        <div className="mb-3">
          <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
            Reason
          </h4>
          <p className="text-xs text-[var(--color-text-muted)]">
            {approval.reason}
          </p>
        </div>

        <div className="mb-3">
          <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
            Evidence
          </h4>
          <ul className="space-y-0.5">
            {approval.evidence.map((item, idx) => (
              <li key={idx} className="text-[10px] text-[var(--color-text-muted)] flex items-start gap-1.5">
                <span className="text-[var(--color-approved)]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {approval.status === "pending" && (
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border)]">
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
