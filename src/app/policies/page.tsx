"use client";

import { useState } from "react";
import { policies, getPolicyById } from "@/data/clerk/policies";
import { PolicyRuleCard } from "@/components/policy/PolicyRuleCard";
import { PolicyBadge } from "@/components/shared/PolicyBadge";
import { Disclosure } from "@/components/shared/Disclosure";

export default function PoliciesPage() {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);
  const selectedPolicy = selectedPolicyId ? getPolicyById(selectedPolicyId) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Policy Engine</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Rules governing task execution and approval requirements
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Policy List */}
        <div className="col-span-5 space-y-3">
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
        <div className="col-span-7">
          {selectedPolicy ? (
            <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6 sticky top-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-mono text-[var(--color-text-subtle)]">
                    {selectedPolicy.id}
                  </span>
                  <h2 className="text-lg font-semibold text-[var(--color-text)] mt-1">
                    {selectedPolicy.title}
                  </h2>
                </div>
                <PolicyBadge outcome={selectedPolicy.outcome} size="md" />
              </div>

              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                {selectedPolicy.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-2">
                    Trigger Condition
                  </h3>
                  <p className="text-xs text-[var(--color-text)] bg-[var(--color-bg-sunken)] rounded-md px-3 py-2 font-mono">
                    {selectedPolicy.trigger}
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-2">
                    Required Evidence
                  </h3>
                  <ul className="space-y-1">
                    {selectedPolicy.requiredEvidence.map((evidence, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-[var(--color-text-muted)] flex items-center gap-2"
                      >
                        <span className="text-[var(--color-approved)]">✓</span>
                        {evidence}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-2">
                    Applies To Task Types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPolicy.appliesToTaskTypes.map((type) => (
                      <span
                        key={type}
                        className="text-xs px-2 py-1 bg-[var(--color-bg-sunken)] text-[var(--color-text-muted)] rounded-md"
                      >
                        {type.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--color-bg-elevated)] border border-dashed border-[var(--color-border)] rounded-xl p-12 text-center">
              <p className="text-sm text-[var(--color-text-subtle)]">
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
