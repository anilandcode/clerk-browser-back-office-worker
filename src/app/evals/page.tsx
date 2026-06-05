"use client";

import { useState } from "react";
import { evalCases, getEvalStats, getEvalCasesByCategory } from "@/data/clerk/evals";
import { EvalCase } from "@/lib/types";
import { Disclosure } from "@/components/shared/Disclosure";

const categoryLabels: Record<EvalCase["category"], string> = {
  task_classification: "Task Classification",
  field_extraction: "Field Extraction",
  policy_triggering: "Policy Triggering",
  approval_gate: "Approval Gate",
  blocked_action: "Blocked Action",
  audit_completeness: "Audit Completeness",
  replay_completeness: "Replay Completeness",
  synthetic_disclosure: "Synthetic Disclosure",
};

const categoryDescriptions: Record<EvalCase["category"], string> = {
  task_classification: "Validates task types, statuses, and metadata",
  field_extraction: "Validates extracted invoice and vendor fields",
  policy_triggering: "Validates policy rule evaluation and outcomes",
  approval_gate: "Validates approval requirements and enforcement",
  blocked_action: "Validates blocked actions cannot proceed",
  audit_completeness: "Validates audit trail captures all events",
  replay_completeness: "Validates session replay frames",
  synthetic_disclosure: "Validates no real-system claims",
};

export default function EvalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EvalCase["category"] | null>(null);
  const stats = getEvalStats();

  const selectedCases = selectedCategory
    ? getEvalCasesByCategory(selectedCategory)
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-ink)] tracking-tight">Evaluations</h1>
        <p className="text-[13px] text-[var(--color-ink-secondary)] mt-0.5">
          Deterministic tests proving safety and correctness
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-[var(--color-warning-bg)] border border-amber-200 rounded-md px-4 py-3">
        <p className="text-xs text-amber-800 leading-relaxed">
          These tests validate deterministic behaviours in a synthetic browser-workflow demo. 
          Clerk does not operate real software or process real customer/vendor data.
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-5">
          <p className="text-xs text-[var(--color-ink-tertiary)] mb-1">Total Tests</p>
          <p className="text-3xl font-bold text-[var(--color-ink)]">{stats.total}</p>
        </div>
        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-5">
          <p className="text-xs text-[var(--color-ink-tertiary)] mb-1">Passed</p>
          <p className="text-3xl font-bold text-[var(--color-approved)]">{stats.passed}</p>
        </div>
        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-5">
          <p className="text-xs text-[var(--color-ink-tertiary)] mb-1">Failed</p>
          <p className="text-3xl font-bold text-[var(--color-blocked)]">{stats.failed}</p>
        </div>
        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-5">
          <p className="text-xs text-[var(--color-ink-tertiary)] mb-1">Pass Rate</p>
          <p className="text-3xl font-bold text-[var(--color-ink)]">
            {stats.passRate.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-rule)]">
          <h2 className="text-sm font-semibold text-[var(--color-ink)]">
            Category Results
          </h2>
        </div>
        <div className="divide-y divide-[var(--color-rule)]">
          {stats.categoryStats.map((cat) => {
            const isSelected = selectedCategory === cat.category;
            const passRate = (cat.passed / cat.total) * 100;

            return (
              <div key={cat.category}>
                <button
                  onClick={() =>
                    setSelectedCategory(isSelected ? null : cat.category)
                  }
                  className={`w-full px-6 py-4 text-left hover:bg-[var(--color-surface-sunken)] transition-colors ${
                    isSelected ? "bg-[var(--color-accent-muted)]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-[var(--color-ink)]">
                        {categoryLabels[cat.category]}
                      </h3>
                      <p className="text-[10px] text-[var(--color-ink-secondary)] mt-0.5">
                        {categoryDescriptions[cat.category]}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-[var(--color-ink-secondary)]">
                          {cat.passed}/{cat.total} passed
                        </p>
                        <div className="w-24 h-1.5 bg-[var(--color-rule)] rounded-full mt-1">
                          <div
                            className={`h-full rounded-full ${
                              passRate === 100
                                ? "bg-[var(--color-approved)]"
                                : passRate >= 80
                                ? "bg-[var(--color-warning)]"
                                : "bg-[var(--color-blocked)]"
                            }`}
                            style={{ width: `${passRate}%` }}
                          />
                        </div>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          passRate === 100
                            ? "bg-[var(--color-approved-bg)] text-[var(--color-approved)]"
                            : passRate >= 80
                            ? "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"
                            : "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)]"
                        }`}
                      >
                        {passRate.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </button>

                {/* Expanded Test List */}
                {isSelected && (
                  <div className="px-6 pb-4 bg-[var(--color-surface-sunken)]">
                    <div className="space-y-2 pt-2">
                      {selectedCases.map((testCase) => (
                        <div
                          key={testCase.id}
                          className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-lg px-4 py-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-[var(--color-ink-tertiary)]">
                                  {testCase.id}
                                </span>
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                                    testCase.passed
                                      ? "bg-[var(--color-approved-bg)] text-[var(--color-approved)]"
                                      : "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)]"
                                  }`}
                                >
                                  {testCase.passed ? "Pass" : "Fail"}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--color-ink)] mt-1">
                                {testCase.description}
                              </p>
                              <p className="text-[10px] text-[var(--color-ink-secondary)] mt-1">
                                Expected: {testCase.expected}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Benchmark Provenance */}
      <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-4">
          Benchmark Provenance
        </h2>
        <div className="space-y-2 text-xs text-[var(--color-ink-secondary)]">
          <p>All test cases are deterministic and derived from static synthetic data.</p>
          <p>No dynamic or randomized test generation is used.</p>
          <p>Test results are pre-computed and do not depend on external services.</p>
          <p>Policy evaluations are pure functions with no side effects.</p>
        </div>
      </div>

      {/* Limitations */}
      <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-4">
          Limitations
        </h2>
        <ul className="space-y-2 text-xs text-[var(--color-ink-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-warning)]">•</span>
            Tests validate synthetic demo behaviors only
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-warning)]">•</span>
            No real browser automation or external system testing
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-warning)]">•</span>
            No performance or load testing included
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-warning)]">•</span>
            No adversarial or edge-case testing beyond defined scenarios
          </li>
        </ul>
      </div>

      <Disclosure variant="banner" />
    </div>
  );
}
