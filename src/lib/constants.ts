export const APP_NAME = "Clerk";
export const APP_DESCRIPTION = "Browser Back-Office Worker";
export const APP_TAGLINE = "A supervised browser worker for repetitive legacy workflows with approvals, policy checks, and audit trails.";

export const SYNTHETIC_DISCLOSURE = "Synthetic legacy workspace · Simulated browser actions · No real systems connected";
export const FULL_DISCLOSURE = "Synthetic demo · Simulated browser actions · No real systems connected · No real credentials · No real financial transactions";

export const COMPANY_NAME = "Apex Office Supply";
export const LEGACY_SYSTEM_NAME = "LedgerLite ERP";

export const FLAGSHIP_TASK_ID = "TASK-1048";
export const FLAGSHIP_INVOICE_ID = "INV-1048";
export const FLAGSHIP_VENDOR_ID = "VENDOR-001";
export const FLAGSHIP_VENDOR_NAME = "Northwind Packaging";

export const ROUTES = [
  { name: "Home", path: "/", description: "Product entry and proof" },
  { name: "Queue", path: "/queue", description: "Operational work queue" },
  { name: "Workbench", path: "/workbench", description: "Browser workbench" },
  { name: "Legacy Portal", path: "/legacy", description: "Synthetic ERP interface" },
  { name: "Policies", path: "/policies", description: "Policy engine rules" },
  { name: "Approvals", path: "/approvals", description: "Approval queue and history" },
  { name: "Audit", path: "/audit", description: "Audit trail" },
  { name: "Replay", path: "/replay", description: "Session replay" },
  { name: "Evals", path: "/evals", description: "Evaluation dashboard" },
  { name: "Architecture", path: "/architecture", description: "System design" },
  { name: "About", path: "/about", description: "Case study" },
] as const;

export const RISK_LABELS = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
  critical: "Critical Risk",
} as const;

export const STATUS_LABELS = {
  READY: "Ready",
  IN_PROGRESS: "In Progress",
  WAITING_APPROVAL: "Waiting Approval",
  BLOCKED: "Blocked",
  COMPLETED: "Completed",
} as const;

export const POLICY_OUTCOME_LABELS = {
  ALLOW: "Allow",
  REVIEW_REQUIRED: "Review Required",
  APPROVAL_REQUIRED: "Approval Required",
  BLOCKED: "Blocked",
} as const;

export const STEP_STATE_LABELS = {
  pending: "Pending",
  active: "Active",
  completed: "Completed",
  waiting_approval: "Waiting Approval",
  blocked: "Blocked",
} as const;

export const AUDIT_ACTORS = {
  clerk: "Clerk",
  human_approver: "Human Approver",
  system: "System",
} as const;
