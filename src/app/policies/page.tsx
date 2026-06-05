"use client";

import { useState } from "react";
import { policies, getPolicyById } from "@/data/clerk/policies";
import { PolicyRuleCard } from "@/components/policy/PolicyRuleCard";
import { PolicyBadge } from "@/components/shared/PolicyBadge";
import { Disclosure } from "@/components/shared/Disclosure";
import { Check } from "@phosphor-icons/react/dist/ssr";

export default function PoliciesPage() {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(
    null
  );
  const selectedPolicy = selectedPolicyId
    ? getPolicyById(selectedPolicyId)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-ink)] tracking-tight">
          Policy Engine
        </h1>
        <p className="text-[13px] text-[var(--color-ink-secondary)] mt-0.5">
          Rules governing task execution and approval requirements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Policy List */}
        <div className="lg:col-span-5 space-y-3">
          {policies.map((policy) => (
            <PolicyRuleCard
              key={policy.id}
              policy={policy}
              isSelected={selectedPolicyId === policy.id}
              onSelect={setSelectedPolicyId}
            />
          ))}
        </div>

        {/* Policy Detail */}
        <div className="lg:col-span-7">
          {selectedPolicy ? (
            <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-xl)] p-6 lg:sticky lg:top-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[11px] font-mono text-[var(--color-ink-ghost)]">
                    {selectedPolicy.id}
                  </span>
                  <h2 className="text-lg font-semibold text-[var(--color-ink)] tracking-tight mt-1">
                    {selectedPolicy.title}
                  </h2>
                </div>
                <PolicyBadge outcome={selectedPolicy.outcome} size="md" />
              </div>

              <p className="text-[13px] text-[var(--color-ink-secondary)] leading-relaxed mb-6">
                {selectedPolicy.description}
              </p>

              <div className="space-y-5">
                <div>
                  <h3 className="text-[10px] text-[var(--color-ink-ghost)] uppercase tracking-wider font-medium mb-2">
                    Trigger Condition
                  </h3>
                  <p className="text-[11px] text-[var(--color-ink)] bg-[var(--color-surface-sunken)] rounded-[var(--radius-md)] px-3 py-2.5 font-mono">
                    {selectedPolicy.trigger}
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] text-[var(--color-ink-ghost)] uppercase tracking-wider font-medium mb-2">
                    Required Evidence
                  </h3>
                  <ul className="space-y-1.5">
                    {selectedPolicy.requiredEvidence.map((evidence, idx) => (
                      <li
                        key={idx}
                        className="text-[13px] text-[var(--color-ink-secondary)] flex items-center gap-2"
                      >
                        <Check
                          size={13}
                          weight="bold"
                          className="text-[var(--color-approved)] shrink-0"
                        />
                        {evidence}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[10px] text-[var(--color-ink-ghost)] uppercase tracking-wider font-medium mb-2">
                    Applies To
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPolicy.appliesToTaskTypes.map((type) => (
                      <span
                        key={type}
                        className="text-[11px] px-2 py-1 bg-[var(--color-surface-sunken)] text-[var(--color-ink-secondary)] rounded-[var(--radius-md)]"
                      >
                        {type.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--color-surface-elevated)] border border-dashed border-[var(--color-rule)] rounded-[var(--radius-xl)] p-12 text-center">
              <p className="text-[13px] text-[var(--color-ink-ghost)]">
                Select a policy to view details
              </p>
            </div>
          )}
        </div>
      </div>

      <Disclosure variant="inline" />
    </div>
  );
}
