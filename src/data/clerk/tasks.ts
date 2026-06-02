import { BackOfficeTask } from "@/lib/types";

export const tasks: BackOfficeTask[] = [
  {
    id: "TASK-1048",
    title: "Update vendor invoice record",
    type: "vendor_invoice_update",
    vendorId: "VENDOR-001",
    invoiceId: "INV-1048",
    system: "LedgerLite ERP",
    status: "WAITING_APPROVAL",
    risk: "high",
    sla: "2026-06-02T17:00:00Z",
    instruction: "Process invoice INV-1048 for Northwind Packaging. Verify PO match, validate tax ID, and prepare payment details update. Bank account changed recently — requires Finance approval before submit.",
    policyIds: ["POL-001", "POL-002", "POL-003"],
    stepIds: ["STEP-001", "STEP-002", "STEP-003", "STEP-004", "STEP-005", "STEP-006", "STEP-007", "STEP-008", "STEP-009", "STEP-010"],
    auditEventIds: ["AUDIT-001", "AUDIT-002", "AUDIT-003", "AUDIT-004", "AUDIT-005", "AUDIT-006", "AUDIT-007", "AUDIT-008", "AUDIT-009", "AUDIT-010", "AUDIT-011", "AUDIT-012"],
    approvalId: "APPROVAL-001",
  },
  {
    id: "TASK-1051",
    title: "Correct shipping address",
    type: "shipping_address_correction",
    vendorId: "VENDOR-002",
    invoiceId: "INV-1051",
    system: "LedgerLite ERP",
    status: "READY",
    risk: "low",
    sla: "2026-06-05T17:00:00Z",
    instruction: "Update shipping address for Contoso Shipping Co. Correct ZIP code from 62704 to 62701. Address verified against vendor profile.",
    policyIds: ["POL-006"],
    stepIds: [],
    auditEventIds: [],
  },
  {
    id: "TASK-1054",
    title: "Flag duplicate invoice",
    type: "duplicate_invoice_check",
    vendorId: "VENDOR-003",
    invoiceId: "INV-1054",
    system: "LedgerLite ERP",
    status: "BLOCKED",
    risk: "medium",
    sla: "2026-06-03T17:00:00Z",
    instruction: "Invoice INV-1054 appears to be a duplicate of INV-1041. Same vendor, amount, and line items within 30 days. Block submission and flag for review.",
    policyIds: ["POL-004"],
    stepIds: [],
    auditEventIds: [],
  },
  {
    id: "TASK-1059",
    title: "Update tax exemption certificate",
    type: "tax_exemption_update",
    vendorId: "VENDOR-005",
    invoiceId: "INV-1059",
    system: "LedgerLite ERP",
    status: "READY",
    risk: "medium",
    sla: "2026-06-08T17:00:00Z",
    instruction: "Tax exemption certificate for Tailspin Tax Services is missing. Cannot process invoice until renewed certificate is on file. Flag for vendor follow-up.",
    policyIds: ["POL-005"],
    stepIds: [],
    auditEventIds: [],
  },
  {
    id: "TASK-1062",
    title: "Update vendor bank account",
    type: "vendor_bank_change",
    vendorId: "VENDOR-004",
    invoiceId: "INV-1062",
    system: "LedgerLite ERP",
    status: "BLOCKED",
    risk: "critical",
    sla: "2026-06-01T17:00:00Z",
    instruction: "Woodgrove Logistics requests bank account update. Vendor is inactive, W-9 expired, insurance missing. Cannot process until vendor documentation is current. Blocked pending compliance review.",
    policyIds: ["POL-003", "POL-004", "POL-005"],
    stepIds: [],
    auditEventIds: [],
  },
];

export function getTaskById(id: string): BackOfficeTask | undefined {
  return tasks.find((t) => t.id === id);
}

export function getTasksByStatus(status: BackOfficeTask["status"]): BackOfficeTask[] {
  return tasks.filter((t) => t.status === status);
}

export function getTasksByVendor(vendorId: string): BackOfficeTask[] {
  return tasks.filter((t) => t.vendorId === vendorId);
}
