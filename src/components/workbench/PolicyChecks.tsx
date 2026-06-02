import { PolicyRule, PolicyOutcome } from "@/lib/types";
import { PolicyBadge } from "@/components/shared/PolicyBadge";

interface PolicyChecksProps {
  policies: PolicyRule[];
}

const outcomeOrder: Record<PolicyOutcome, number> = {
  BLOCKED: 0,
  APPROVAL_REQUIRED: 1,
  REVIEW_REQUIRED: 2,
  ALLOW: 3,
};

export function PolicyChecks({ policies }: PolicyChecksProps) {
  const sorted = [...policies].sort(
    (a, b) => outcomeOrder[a.outcome] - outcomeOrder[b.outcome]
  );

  return (
    <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-sunken)]">
        <h3 className="text-xs font-semibold text-[var(--color-text)]">Policy Checks</h3>
      </div>
      
      <div className="divide-y divide-[var(--color-border)]">
        {sorted.map((policy) => (
          <div key={policy.id} className="px-4 py-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-[var(--color-text-subtle)]">
                {policy.id}
              </span>
              <PolicyBadge outcome={policy.outcome} />
            </div>
            <p className="text-xs text-[var(--color-text)] font-medium">
              {policy.title}
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
              {policy.trigger}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
