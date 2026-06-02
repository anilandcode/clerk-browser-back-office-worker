import { PolicyRule } from "@/lib/types";

export const policies: PolicyRule[] = [
  {
    id: "POL-001",
    title: "PO Match Required",
    description: "Invoice amount must match the approved purchase order amount before any update can be submitted.",
    trigger: "Invoice amount differs from PO approved amount",
    outcome: "ALLOW",
    requiredEvidence: ["Purchase order record", "Invoice line items", "Amount comparison"],
    appliesToTaskTypes: ["vendor_invoice_update"],
  },
  {
    id: "POL-002",
    title: "Amount Threshold Review",
    description: "Invoices above $5,000 require additional review by a manager before processing.",
    trigger: "Invoice amount exceeds $5,000",
    outcome: "REVIEW_REQUIRED",
    requiredEvidence: ["Invoice amount", "Manager assignment"],
    appliesToTaskTypes: ["vendor_invoice_update", "vendor_bank_change"],
  },
  {
    id: "POL-003",
    title: "Bank Change Approval",
    description: "Recent vendor bank account changes (within 7 days) require Finance Manager approval before payment details can be submitted.",
    trigger: "Vendor bank account changed within last 7 days",
    outcome: "APPROVAL_REQUIRED",
    requiredEvidence: ["Vendor profile bank change timestamp", "Invoice amount and PO match", "Tax ID verification"],
    appliesToTaskTypes: ["vendor_invoice_update", "vendor_bank_change"],
  },
  {
    id: "POL-004",
    title: "Duplicate Invoice Block",
    description: "Duplicate invoice IDs must not be submitted. Invoices with matching vendor, amount, and line items within 30 days are flagged.",
    trigger: "Matching invoice exists within 30 days with same vendor and amount",
    outcome: "BLOCKED",
    requiredEvidence: ["Original invoice record", "Duplicate invoice comparison", "Date range analysis"],
    appliesToTaskTypes: ["duplicate_invoice_check", "vendor_invoice_update"],
  },
  {
    id: "POL-005",
    title: "Missing Vendor Documents",
    description: "Vendors with missing or expired W-9 or insurance documentation cannot have invoices processed.",
    trigger: "Vendor document status is 'missing' or 'expired'",
    outcome: "BLOCKED",
    requiredEvidence: ["Vendor document status", "W-9 record", "Insurance certificate"],
    appliesToTaskTypes: ["vendor_invoice_update", "vendor_bank_change", "tax_exemption_update"],
  },
  {
    id: "POL-006",
    title: "Address Change Safe If Verified",
    description: "Shipping address corrections are safe to submit if the address is verified against the vendor profile.",
    trigger: "Address change requested for shipping",
    outcome: "ALLOW",
    requiredEvidence: ["Vendor profile address", "Correction request", "Verification check"],
    appliesToTaskTypes: ["shipping_address_correction"],
  },
  {
    id: "POL-007",
    title: "Tax ID Mismatch Review",
    description: "If vendor tax ID does not match records, the invoice requires review before processing.",
    trigger: "Vendor tax ID on invoice differs from vendor profile",
    outcome: "REVIEW_REQUIRED",
    requiredEvidence: ["Vendor profile tax ID", "Invoice tax ID", "Comparison result"],
    appliesToTaskTypes: ["vendor_invoice_update", "tax_exemption_update"],
  },
];

export function getPolicyById(id: string): PolicyRule | undefined {
  return policies.find((p) => p.id === id);
}

export function getPoliciesForTaskType(taskType: string): PolicyRule[] {
  return policies.filter((p) => p.appliesToTaskTypes.includes(taskType as PolicyRule["appliesToTaskTypes"][number]));
}
