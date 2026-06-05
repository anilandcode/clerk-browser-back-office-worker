"use client";

import { PolicyRule } from "@/lib/types";
import { PolicyBadge } from "@/components/shared/PolicyBadge";

interface PolicyRuleCardProps {
  policy: PolicyRule;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const taskTypeLabels: Record<string, string> = {
  vendor_invoice_update: "Vendor Invoice",
  shipping_address_correction: "Shipping Address",
  duplicate_invoice_check: "Duplicate Check",
  tax_exemption_update: "Tax Exemption",
  vendor_bank_change: "Bank Change",
};

export function PolicyRuleCard({
  policy,
  isSelected,
  onSelect,
}: PolicyRuleCardProps) {
  return (
    <button
      onClick={() => onSelect?.(policy.id)}
      className={`w-full text-left bg-[var(--color-surface-elevated)] border rounded-lg p-4 transition-all ${
        isSelected
          ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
          : "border-[var(--color-rule)] hover:border-[var(--color-rule-strong)]"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <span className="text-[10px] font-mono text-[var(--color-ink-tertiary)]">
            {policy.id}
          </span>
          <h3 className="text-sm font-medium text-[var(--color-ink)] mt-0.5">
            {policy.title}
          </h3>
        </div>
        <PolicyBadge outcome={policy.outcome} />
      </div>

      <p className="text-xs text-[var(--color-ink-secondary)] leading-relaxed mb-3">
        {policy.description}
      </p>

      <div className="flex flex-wrap gap-1">
        {policy.appliesToTaskTypes.map((type) => (
          <span
            key={type}
            className="text-[10px] px-1.5 py-0.5 bg-[var(--color-surface-sunken)] text-[var(--color-ink-tertiary)] rounded"
          >
            {taskTypeLabels[type] || type}
          </span>
        ))}
      </div>
    </button>
  );
}
