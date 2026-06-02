import { BackOfficeTask } from "@/lib/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { getVendorById } from "@/data/clerk/vendors";
import { getInvoiceById } from "@/data/clerk/invoices";

interface TaskPanelProps {
  task: BackOfficeTask;
}

const taskTypeLabels: Record<BackOfficeTask["type"], string> = {
  vendor_invoice_update: "Vendor Invoice Update",
  shipping_address_correction: "Shipping Address Correction",
  duplicate_invoice_check: "Duplicate Invoice Check",
  tax_exemption_update: "Tax Exemption Update",
  vendor_bank_change: "Vendor Bank Change",
};

export function TaskPanel({ task }: TaskPanelProps) {
  const vendor = getVendorById(task.vendorId);
  const invoice = task.invoiceId ? getInvoiceById(task.invoiceId) : null;

  return (
    <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-sunken)]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-[var(--color-text-subtle)]">
            {task.id}
          </span>
          <StatusBadge status={task.status} />
        </div>
        <h3 className="text-sm font-medium text-[var(--color-text)] mt-1">
          {task.title}
        </h3>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
            Type
          </span>
          <p className="text-xs text-[var(--color-text)] mt-0.5">
            {taskTypeLabels[task.type]}
          </p>
        </div>

        <div>
          <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
            Vendor
          </span>
          <p className="text-xs text-[var(--color-text)] mt-0.5">
            {vendor?.name || task.vendorId}
          </p>
          {vendor && (
            <p className="text-[10px] text-[var(--color-text-muted)]">
              Tax ID: {vendor.taxId} · Status: {vendor.status}
            </p>
          )}
        </div>

        {invoice && (
          <div>
            <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
              Invoice
            </span>
            <p className="text-xs text-[var(--color-text)] mt-0.5">
              {invoice.id} — ${invoice.amount.toLocaleString()} {invoice.currency}
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)]">
              Due: {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
          </div>
        )}

        <div>
          <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
            Risk Level
          </span>
          <div className="mt-1">
            <RiskBadge risk={task.risk} />
          </div>
        </div>

        <div>
          <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
            System
          </span>
          <p className="text-xs font-mono text-[var(--color-text-muted)] mt-0.5">
            {task.system}
          </p>
        </div>

        <div className="pt-3 border-t border-[var(--color-border)]">
          <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
            Instructions
          </span>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mt-1">
            {task.instruction}
          </p>
        </div>
      </div>
    </div>
  );
}
