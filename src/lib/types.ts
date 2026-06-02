export type TaskStatus =
  | "READY"
  | "IN_PROGRESS"
  | "WAITING_APPROVAL"
  | "BLOCKED"
  | "COMPLETED";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type PolicyOutcome =
  | "ALLOW"
  | "REVIEW_REQUIRED"
  | "APPROVAL_REQUIRED"
  | "BLOCKED";

export type StepState =
  | "pending"
  | "active"
  | "completed"
  | "waiting_approval"
  | "blocked";

export type AuditEventType =
  | "task"
  | "browser_action"
  | "field_extraction"
  | "policy_check"
  | "approval"
  | "blocked_action"
  | "simulated_submit";

export interface BackOfficeTask {
  id: string;
  title: string;
  type:
    | "vendor_invoice_update"
    | "shipping_address_correction"
    | "duplicate_invoice_check"
    | "tax_exemption_update"
    | "vendor_bank_change";
  vendorId: string;
  invoiceId?: string;
  system: "LedgerLite ERP";
  status: TaskStatus;
  risk: RiskLevel;
  sla: string;
  instruction: string;
  policyIds: string[];
  stepIds: string[];
  auditEventIds: string[];
  approvalId?: string;
}

export interface Vendor {
  id: string;
  name: string;
  taxId: string;
  status: "active" | "inactive" | "review";
  bankAccountLastChangedAt?: string;
  documents: {
    w9: "current" | "missing" | "expired";
    insurance: "current" | "missing" | "expired";
  };
}

export interface Invoice {
  id: string;
  vendorId: string;
  amount: number;
  currency: "USD";
  purchaseOrderId: string;
  status: "pending" | "matched" | "duplicate" | "blocked" | "approved";
  dueDate: string;
  extractedFields: Record<string, string | number | boolean>;
}

export interface PurchaseOrder {
  id: string;
  vendorId: string;
  approvedAmount: number;
  currency: "USD";
  status: "approved" | "closed" | "missing";
  lineItems: Array<{
    description: string;
    amount: number;
  }>;
}

export interface PolicyRule {
  id: string;
  title: string;
  description: string;
  trigger: string;
  outcome: PolicyOutcome;
  requiredEvidence: string[];
  appliesToTaskTypes: BackOfficeTask["type"][];
}

export interface WorkflowStep {
  id: string;
  taskId: string;
  order: number;
  title: string;
  description: string;
  state: StepState;
  browserTarget?: string;
  expectedResult: string;
  policyIds?: string[];
  auditEventIds?: string[];
}

export interface ApprovalRequest {
  id: string;
  taskId: string;
  status: "pending" | "approved" | "rejected" | "needs_more_evidence";
  reason: string;
  requiredApproverRole: "finance_manager" | "ops_manager" | "compliance";
  evidence: string[];
  decisionAuditEventId?: string;
}

export interface AuditEvent {
  id: string;
  taskId: string;
  timestamp: string;
  type: AuditEventType;
  actor: "clerk" | "human_approver" | "system";
  title: string;
  detail: string;
  target?: string;
  beforeValue?: string;
  afterValue?: string;
  policyId?: string;
  replayFrameId?: string;
}

export interface ReplayFrame {
  id: string;
  taskId: string;
  order: number;
  title: string;
  timestamp: string;
  screen:
    | "queue"
    | "vendor_search"
    | "vendor_profile"
    | "invoice_detail"
    | "po_match"
    | "payment_details"
    | "approval_gate"
    | "confirmation";
  action: string;
  policyState?: PolicyOutcome;
  auditEventId: string;
}

export interface EvalCase {
  id: string;
  category:
    | "task_classification"
    | "field_extraction"
    | "policy_triggering"
    | "approval_gate"
    | "blocked_action"
    | "audit_completeness"
    | "replay_completeness"
    | "synthetic_disclosure";
  description: string;
  expected: string;
  passed: boolean;
}
