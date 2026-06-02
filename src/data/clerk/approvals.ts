import { ApprovalRequest } from "@/lib/types";

export const approvals: ApprovalRequest[] = [
  {
    id: "APPROVAL-001",
    taskId: "TASK-1048",
    status: "pending",
    reason: "Vendor bank account was changed within the last 7 days. Payment details cannot be submitted without Finance Manager approval.",
    requiredApproverRole: "finance_manager",
    evidence: [
      "Vendor profile shows bank change on 2026-05-28",
      "Invoice amount ($4,860) matches PO-2024-0891",
      "Tax ID 12-3456789 verified against vendor records",
      "No duplicate invoice found",
      "W-9 and insurance documents current",
    ],
  },
];

export function getApprovalById(id: string): ApprovalRequest | undefined {
  return approvals.find((a) => a.id === id);
}

export function getApprovalForTask(taskId: string): ApprovalRequest | undefined {
  return approvals.find((a) => a.taskId === taskId);
}

export function getApprovalsByStatus(status: ApprovalRequest["status"]): ApprovalRequest[] {
  return approvals.filter((a) => a.status === status);
}
