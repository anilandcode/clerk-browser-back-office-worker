import { ReplayFrame } from "@/lib/types";

export const replayFrames: ReplayFrame[] = [
  {
    id: "FRAME-001",
    taskId: "TASK-1048",
    order: 1,
    title: "Queue selected",
    timestamp: "2026-06-01T09:42:11Z",
    screen: "queue",
    action: "Selected TASK-1048 from work queue",
    auditEventId: "AUDIT-001",
  },
  {
    id: "FRAME-002",
    taskId: "TASK-1048",
    order: 2,
    title: "Vendor searched",
    timestamp: "2026-06-01T09:42:18Z",
    screen: "vendor_search",
    action: "Searched for 'Northwind Packaging' in vendor directory",
    auditEventId: "AUDIT-002",
  },
  {
    id: "FRAME-003",
    taskId: "TASK-1048",
    order: 3,
    title: "Invoice opened",
    timestamp: "2026-06-01T09:42:24Z",
    screen: "invoice_detail",
    action: "Opened invoice INV-1048 from vendor profile",
    auditEventId: "AUDIT-003",
  },
  {
    id: "FRAME-004",
    taskId: "TASK-1048",
    order: 4,
    title: "PO matched",
    timestamp: "2026-06-01T09:42:31Z",
    screen: "po_match",
    action: "Compared invoice amount ($4,860) with PO-2024-0891 ($4,860) — Match confirmed",
    policyState: "ALLOW",
    auditEventId: "AUDIT-004",
  },
  {
    id: "FRAME-005",
    taskId: "TASK-1048",
    order: 5,
    title: "Bank change detected",
    timestamp: "2026-06-01T09:42:43Z",
    screen: "vendor_profile",
    action: "Detected vendor bank account change on 2026-05-28 — Approval required",
    policyState: "APPROVAL_REQUIRED",
    auditEventId: "AUDIT-007",
  },
  {
    id: "FRAME-006",
    taskId: "TASK-1048",
    order: 6,
    title: "Form prepared",
    timestamp: "2026-06-01T09:43:00Z",
    screen: "payment_details",
    action: "Payment details form filled with verified vendor bank information",
    auditEventId: "AUDIT-009",
  },
  {
    id: "FRAME-007",
    taskId: "TASK-1048",
    order: 7,
    title: "Approval gate",
    timestamp: "2026-06-01T09:43:05Z",
    screen: "approval_gate",
    action: "Submit blocked — Finance Manager approval required before payment submission",
    policyState: "APPROVAL_REQUIRED",
    auditEventId: "AUDIT-010",
  },
  {
    id: "FRAME-008",
    taskId: "TASK-1048",
    order: 8,
    title: "Simulated save",
    timestamp: "2026-06-01T09:43:15Z",
    screen: "confirmation",
    action: "Task paused at WAITING_APPROVAL — No real submission performed",
    auditEventId: "AUDIT-012",
  },
];

export function getReplayFrameById(id: string): ReplayFrame | undefined {
  return replayFrames.find((f) => f.id === id);
}

export function getReplayFramesForTask(taskId: string): ReplayFrame[] {
  return replayFrames
    .filter((f) => f.taskId === taskId)
    .sort((a, b) => a.order - b.order);
}
