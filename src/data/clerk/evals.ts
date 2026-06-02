import { EvalCase } from "@/lib/types";

export const evalCases: EvalCase[] = [
  // Task Classification (10 cases)
  {
    id: "EVAL-001",
    category: "task_classification",
    description: "TASK-1048 is correctly classified as vendor_invoice_update",
    expected: "vendor_invoice_update",
    passed: true,
  },
  {
    id: "EVAL-002",
    category: "task_classification",
    description: "TASK-1051 is correctly classified as shipping_address_correction",
    expected: "shipping_address_correction",
    passed: true,
  },
  {
    id: "EVAL-003",
    category: "task_classification",
    description: "TASK-1054 is correctly classified as duplicate_invoice_check",
    expected: "duplicate_invoice_check",
    passed: true,
  },
  {
    id: "EVAL-004",
    category: "task_classification",
    description: "TASK-1059 is correctly classified as tax_exemption_update",
    expected: "tax_exemption_update",
    passed: true,
  },
  {
    id: "EVAL-005",
    category: "task_classification",
    description: "TASK-1062 is correctly classified as vendor_bank_change",
    expected: "vendor_bank_change",
    passed: true,
  },
  {
    id: "EVAL-006",
    category: "task_classification",
    description: "All tasks have valid status values",
    expected: "READY, IN_PROGRESS, WAITING_APPROVAL, BLOCKED, or COMPLETED",
    passed: true,
  },
  {
    id: "EVAL-007",
    category: "task_classification",
    description: "All tasks have valid risk levels",
    expected: "low, medium, high, or critical",
    passed: true,
  },
  {
    id: "EVAL-008",
    category: "task_classification",
    description: "All tasks reference valid vendors",
    expected: "VENDOR-001 through VENDOR-005",
    passed: true,
  },
  {
    id: "EVAL-009",
    category: "task_classification",
    description: "All tasks reference LedgerLite ERP as system",
    expected: "LedgerLite ERP",
    passed: true,
  },
  {
    id: "EVAL-010",
    category: "task_classification",
    description: "Flagship task has SLA defined",
    expected: "2026-06-02T17:00:00Z",
    passed: true,
  },

  // Field Extraction (8 cases)
  {
    id: "EVAL-011",
    category: "field_extraction",
    description: "INV-1048 amount extracted as 4860",
    expected: "4860",
    passed: true,
  },
  {
    id: "EVAL-012",
    category: "field_extraction",
    description: "INV-1048 currency extracted as USD",
    expected: "USD",
    passed: true,
  },
  {
    id: "EVAL-013",
    category: "field_extraction",
    description: "INV-1048 vendor tax ID extracted as 12-3456789",
    expected: "12-3456789",
    passed: true,
  },
  {
    id: "EVAL-014",
    category: "field_extraction",
    description: "INV-1048 PO reference extracted as PO-2024-0891",
    expected: "PO-2024-0891",
    passed: true,
  },
  {
    id: "EVAL-015",
    category: "field_extraction",
    description: "INV-1048 bank account change flag extracted as true",
    expected: "true",
    passed: true,
  },
  {
    id: "EVAL-016",
    category: "field_extraction",
    description: "INV-1048 bank change date extracted as 2026-05-28",
    expected: "2026-05-28",
    passed: true,
  },
  {
    id: "EVAL-017",
    category: "field_extraction",
    description: "INV-1048 due date extracted as 2026-06-15",
    expected: "2026-06-15",
    passed: true,
  },
  {
    id: "EVAL-018",
    category: "field_extraction",
    description: "Vendor bank change timestamp is within 7 days",
    expected: "Within 7 days of current date",
    passed: true,
  },

  // Policy Triggering (10 cases)
  {
    id: "EVAL-019",
    category: "policy_triggering",
    description: "PO_MATCH_REQUIRED triggers when invoice matches PO",
    expected: "ALLOW",
    passed: true,
  },
  {
    id: "EVAL-020",
    category: "policy_triggering",
    description: "AMOUNT_THRESHOLD_REVIEW triggers for invoices over $5,000",
    expected: "REVIEW_REQUIRED for amounts > $5,000",
    passed: true,
  },
  {
    id: "EVAL-021",
    category: "policy_triggering",
    description: "AMOUNT_THRESHOLD_REVIEW does not trigger for INV-1048 ($4,860)",
    expected: "Not triggered",
    passed: true,
  },
  {
    id: "EVAL-022",
    category: "policy_triggering",
    description: "BANK_CHANGE_APPROVAL triggers for recent bank changes",
    expected: "APPROVAL_REQUIRED",
    passed: true,
  },
  {
    id: "EVAL-023",
    category: "policy_triggering",
    description: "BANK_CHANGE_APPROVAL triggers for TASK-1048",
    expected: "APPROVAL_REQUIRED",
    passed: true,
  },
  {
    id: "EVAL-024",
    category: "policy_triggering",
    description: "DUPLICATE_INVOICE_BLOCK triggers for INV-1054",
    expected: "BLOCKED",
    passed: true,
  },
  {
    id: "EVAL-025",
    category: "policy_triggering",
    description: "MISSING_VENDOR_DOCS triggers for VENDOR-004",
    expected: "BLOCKED",
    passed: true,
  },
  {
    id: "EVAL-026",
    category: "policy_triggering",
    description: "ADDRESS_CHANGE_SAFE allows verified address corrections",
    expected: "ALLOW",
    passed: true,
  },
  {
    id: "EVAL-027",
    category: "policy_triggering",
    description: "TAX_ID_MISMATCH_REVIEW triggers for tax ID differences",
    expected: "REVIEW_REQUIRED",
    passed: true,
  },
  {
    id: "EVAL-028",
    category: "policy_triggering",
    description: "All 7 policy rules are defined in policy engine",
    expected: "7 policies",
    passed: true,
  },

  // Approval Gate (8 cases)
  {
    id: "EVAL-029",
    category: "approval_gate",
    description: "TASK-1048 has approval request defined",
    expected: "APPROVAL-001",
    passed: true,
  },
  {
    id: "EVAL-030",
    category: "approval_gate",
    description: "Approval request status is pending",
    expected: "pending",
    passed: true,
  },
  {
    id: "EVAL-031",
    category: "approval_gate",
    description: "Approval reason mentions bank account change",
    expected: "Bank account changed within last 7 days",
    passed: true,
  },
  {
    id: "EVAL-032",
    category: "approval_gate",
    description: "Required approver role is finance_manager",
    expected: "finance_manager",
    passed: true,
  },
  {
    id: "EVAL-033",
    category: "approval_gate",
    description: "Evidence includes PO match verification",
    expected: "Invoice amount matches PO",
    passed: true,
  },
  {
    id: "EVAL-034",
    category: "approval_gate",
    description: "Evidence includes tax ID verification",
    expected: "Tax ID verified",
    passed: true,
  },
  {
    id: "EVAL-035",
    category: "approval_gate",
    description: "Submit is blocked until approval received",
    expected: "WAITING_APPROVAL status",
    passed: true,
  },
  {
    id: "EVAL-036",
    category: "approval_gate",
    description: "Approval actions include approve, reject, request evidence",
    expected: "3 actions available",
    passed: true,
  },

  // Blocked Action (8 cases)
  {
    id: "EVAL-037",
    category: "blocked_action",
    description: "TASK-1054 is blocked due to duplicate invoice",
    expected: "BLOCKED status",
    passed: true,
  },
  {
    id: "EVAL-038",
    category: "blocked_action",
    description: "TASK-1062 is blocked due to inactive vendor",
    expected: "BLOCKED status",
    passed: true,
  },
  {
    id: "EVAL-039",
    category: "blocked_action",
    description: "TASK-1062 is blocked due to expired W-9",
    expected: "BLOCKED status",
    passed: true,
  },
  {
    id: "EVAL-040",
    category: "blocked_action",
    description: "TASK-1062 is blocked due to missing insurance",
    expected: "BLOCKED status",
    passed: true,
  },
  {
    id: "EVAL-041",
    category: "blocked_action",
    description: "Blocked tasks cannot proceed without approval",
    expected: "No submit action available",
    passed: true,
  },
  {
    id: "EVAL-042",
    category: "blocked_action",
    description: "Duplicate invoice INV-1054 cannot be submitted",
    expected: "BLOCKED by POL-004",
    passed: true,
  },
  {
    id: "EVAL-043",
    category: "blocked_action",
    description: "Missing tax exemption blocks TASK-1059",
    expected: "BLOCKED by POL-005",
    passed: true,
  },
  {
    id: "EVAL-044",
    category: "blocked_action",
    description: "Bank change without approval blocks submit",
    expected: "Submit disabled until approval",
    passed: true,
  },

  // Audit Completeness (8 cases)
  {
    id: "EVAL-045",
    category: "audit_completeness",
    description: "TASK-1048 has 12 audit events",
    expected: "12 events",
    passed: true,
  },
  {
    id: "EVAL-046",
    category: "audit_completeness",
    description: "Audit events have timestamps",
    expected: "ISO 8601 format",
    passed: true,
  },
  {
    id: "EVAL-047",
    category: "audit_completeness",
    description: "Audit events have actor field",
    expected: "clerk, human_approver, or system",
    passed: true,
  },
  {
    id: "EVAL-048",
    category: "audit_completeness",
    description: "Browser actions are logged",
    expected: "browser_action type events",
    passed: true,
  },
  {
    id: "EVAL-049",
    category: "audit_completeness",
    description: "Policy checks are logged",
    expected: "policy_check type events",
    passed: true,
  },
  {
    id: "EVAL-050",
    category: "audit_completeness",
    description: "Blocked actions are logged",
    expected: "blocked_action type events",
    passed: true,
  },
  {
    id: "EVAL-051",
    category: "audit_completeness",
    description: "Field extractions are logged",
    expected: "field_extraction type events",
    passed: true,
  },
  {
    id: "EVAL-052",
    category: "audit_completeness",
    description: "Total audit events is 20",
    expected: "20 events across all tasks",
    passed: true,
  },

  // Replay Completeness (5 cases)
  {
    id: "EVAL-053",
    category: "replay_completeness",
    description: "TASK-1048 has 8 replay frames",
    expected: "8 frames",
    passed: true,
  },
  {
    id: "EVAL-054",
    category: "replay_completeness",
    description: "Replay frames are ordered sequentially",
    expected: "Order 1 through 8",
    passed: true,
  },
  {
    id: "EVAL-055",
    category: "replay_completeness",
    description: "Each replay frame has linked audit event",
    expected: "auditEventId populated",
    passed: true,
  },
  {
    id: "EVAL-056",
    category: "replay_completeness",
    description: "Replay frames cover all key screens",
    expected: "queue, vendor_search, invoice_detail, po_match, payment_details, approval_gate, confirmation",
    passed: true,
  },
  {
    id: "EVAL-057",
    category: "replay_completeness",
    description: "Policy state shown on relevant frames",
    expected: "APPROVAL_REQUIRED on approval gate frame",
    passed: true,
  },

  // Synthetic Disclosure (3 cases)
  {
    id: "EVAL-058",
    category: "synthetic_disclosure",
    description: "No real system claims in data model",
    expected: "All systems are LedgerLite ERP (fictional)",
    passed: true,
  },
  {
    id: "EVAL-059",
    category: "synthetic_disclosure",
    description: "All vendor data is fictional",
    expected: "No real vendor names or tax IDs",
    passed: true,
  },
  {
    id: "EVAL-060",
    category: "synthetic_disclosure",
    description: "All financial data is simulated",
    expected: "No real bank accounts or transactions",
    passed: true,
  },
];

export function getEvalCasesByCategory(category: EvalCase["category"]): EvalCase[] {
  return evalCases.filter((e) => e.category === category);
}

export function getEvalStats() {
  const total = evalCases.length;
  const passed = evalCases.filter((e) => e.passed).length;
  const failed = total - passed;
  const passRate = (passed / total) * 100;

  const categories = [...new Set(evalCases.map((e) => e.category))];
  const categoryStats = categories.map((cat) => {
    const cases = evalCases.filter((e) => e.category === cat);
    return {
      category: cat,
      total: cases.length,
      passed: cases.filter((e) => e.passed).length,
      failed: cases.filter((e) => !e.passed).length,
    };
  });

  return { total, passed, failed, passRate, categoryStats };
}
