"use client";

import { useState } from "react";
import { approvals as initialApprovals } from "@/data/clerk/approvals";
import { ApprovalRequest } from "@/lib/types";
import { ApprovalCard } from "@/components/approvals/ApprovalCard";
import { Disclosure } from "@/components/shared/Disclosure";

export default function ApprovalsPage() {
  const [approvalList, setApprovalList] = useState<ApprovalRequest[]>(initialApprovals);
  const [filter, setFilter] = useState<ApprovalRequest["status"] | "ALL">("ALL");

  const filteredApprovals =
    filter === "ALL"
      ? approvalList
      : approvalList.filter((a) => a.status === filter);

  const handleApprove = (id: string) => {
    setApprovalList((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "approved" as const, decisionAuditEventId: `AUDIT-SIM-${Date.now()}` }
          : a
      )
    );
  };

  const handleReject = (id: string) => {
    setApprovalList((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "rejected" as const, decisionAuditEventId: `AUDIT-SIM-${Date.now()}` }
          : a
      )
    );
  };

  const handleRequestEvidence = (id: string) => {
    setApprovalList((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "needs_more_evidence" as const, decisionAuditEventId: `AUDIT-SIM-${Date.now()}` }
          : a
      )
    );
  };

  const statusFilters: { label: string; value: ApprovalRequest["status"] | "ALL" }[] = [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Needs Evidence", value: "needs_more_evidence" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Approvals</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Human-in-the-loop approval management
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {statusFilters.map((statusFilter) => (
          <button
            key={statusFilter.value}
            onClick={() => setFilter(statusFilter.value)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filter === statusFilter.value
                ? "bg-[var(--color-text)] text-white"
                : "bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:bg-[var(--color-bg-sunken)]"
            }`}
          >
            {statusFilter.label}
          </button>
        ))}
      </div>

      {/* Approval Cards */}
      <div className="space-y-4">
        {filteredApprovals.map((approval) => (
          <ApprovalCard
            key={approval.id}
            approval={approval}
            onApprove={handleApprove}
            onReject={handleReject}
            onRequestEvidence={handleRequestEvidence}
          />
        ))}
      </div>

      {filteredApprovals.length === 0 && (
        <div className="bg-[var(--color-bg-elevated)] border border-dashed border-[var(--color-border)] rounded-xl p-12 text-center">
          <p className="text-sm text-[var(--color-text-subtle)]">
            No approvals matching filter
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-[var(--color-warning-bg)] border border-amber-200 rounded-md px-4 py-3">
        <p className="text-xs text-amber-800 leading-relaxed">
          Approval decisions are simulated. No real submissions occur. All decisions are logged for audit purposes.
        </p>
      </div>

      <Disclosure variant="inline" />
    </div>
  );
}
