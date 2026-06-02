"use client";

import { ApprovalRequest } from "@/lib/types";
import { getTaskById } from "@/data/clerk/tasks";
import { Button } from "@/components/shared/Button";

interface ApprovalCardProps {
  approval: ApprovalRequest;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onRequestEvidence?: (id: string) => void;
}

const statusLabels: Record<ApprovalRequest["status"], { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-[var(--color-approval-bg)] text-[var(--color-approval)]" },
  approved: { label: "Approved", className: "bg-[var(--color-approved-bg)] text-[var(--color-approved)]" },
  rejected: { label: "Rejected", className: "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)]" },
  needs_more_evidence: { label: "Needs Evidence", className: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]" },
};

const roleLabels: Record<string, string> = {
  finance_manager: "Finance Manager",
  ops_manager: "Operations Manager",
  compliance: "Compliance Officer",
};

export function ApprovalCard({
  approval,
  onApprove,
  onReject,
  onRequestEvidence,
}: ApprovalCardProps) {
  const task = getTaskById(approval.taskId);
  const statusConfig = statusLabels[approval.status];

  return (
    <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--color-text-subtle)]">
              {approval.id}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusConfig.className}`}>
              {statusConfig.label}
            </span>
          </div>
          {task && (
            <h3 className="text-sm font-medium text-[var(--color-text)] mt-1">
              {task.title}
              <span className="text-[var(--color-text-subtle)] ml-2 font-mono text-xs">
                {task.id}
              </span>
            </h3>
          )}
        </div>
        <span className="text-[10px] text-[var(--color-text-subtle)]">
          {roleLabels[approval.requiredApproverRole]}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-4">
        <div>
          <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1.5">
            Reason
          </h4>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            {approval.reason}
          </p>
        </div>

        {task && (
          <div>
            <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1.5">
              Prepared Action
            </h4>
            <p className="text-xs text-[var(--color-text-muted)]">
              {task.instruction}
            </p>
          </div>
        )}

        <div>
          <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1.5">
            Evidence
          </h4>
          <ul className="space-y-1">
            {approval.evidence.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-[var(--color-text-muted)] flex items-start gap-2"
              >
                <span className="text-[var(--color-approved)] mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      {approval.status === "pending" && (
        <div className="px-5 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg-sunken)] flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => onApprove?.(approval.id)}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onReject?.(approval.id)}
          >
            Reject
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRequestEvidence?.(approval.id)}
          >
            Request Evidence
          </Button>
        </div>
      )}
    </div>
  );
}
