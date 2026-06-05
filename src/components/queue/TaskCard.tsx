import Link from "next/link";
import { BackOfficeTask } from "@/lib/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { getVendorById } from "@/data/clerk/vendors";

interface TaskCardProps {
  task: BackOfficeTask;
}

const taskTypeLabels: Record<BackOfficeTask["type"], string> = {
  vendor_invoice_update: "Vendor Invoice Update",
  shipping_address_correction: "Shipping Address Correction",
  duplicate_invoice_check: "Duplicate Invoice Check",
  tax_exemption_update: "Tax Exemption Update",
  vendor_bank_change: "Vendor Bank Change",
};

export function TaskCard({ task }: TaskCardProps) {
  const vendor = getVendorById(task.vendorId);

  return (
    <Link
      href={`/workbench?task=${task.id}`}
      className="block bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-lg p-4 hover:border-[var(--color-rule-strong)] hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-mono text-[var(--color-ink-tertiary)]">
            {task.id}
          </span>
          <h3 className="text-sm font-medium text-[var(--color-ink)] mt-0.5">
            {task.title}
          </h3>
        </div>
        <StatusBadge status={task.status} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-ink-tertiary)] uppercase tracking-wider">
            Type
          </span>
          <span className="text-xs text-[var(--color-ink-secondary)]">
            {taskTypeLabels[task.type]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-ink-tertiary)] uppercase tracking-wider">
            Vendor
          </span>
          <span className="text-xs text-[var(--color-ink-secondary)]">
            {vendor?.name || task.vendorId}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-ink-tertiary)] uppercase tracking-wider">
            System
          </span>
          <span className="text-xs text-[var(--color-ink-secondary)] font-mono">
            {task.system}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-rule)]">
          <RiskBadge risk={task.risk} />
          
          {task.invoiceId && (
            <span className="text-[10px] font-mono text-[var(--color-ink-tertiary)]">
              {task.invoiceId}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
