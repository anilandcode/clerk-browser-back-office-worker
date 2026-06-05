import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Disclosure } from "@/components/shared/Disclosure";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-ink)] tracking-tight">About Clerk</h1>
        <p className="text-[13px] text-[var(--color-ink-secondary)] mt-0.5">
          Case study: Browser back-office worker with approvals and audit trails
        </p>
      </div>

      {/* Problem */}
      <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-3">Problem</h2>
        <div className="space-y-3 text-xs text-[var(--color-ink-secondary)] leading-relaxed">
          <p>
            Enterprise operations teams spend significant time on repetitive back-office tasks: 
            processing vendor invoices, updating records in legacy ERP systems, verifying data 
            against policies, and routing exceptions for approval.
          </p>
          <p>
            These tasks are rules-heavy, error-prone, and require careful audit trails for 
            compliance. Traditional RPA solutions often lack transparency, making it difficult 
            to understand what actions were taken and why.
          </p>
        </div>
      </section>

      {/* Product Concept */}
      <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-3">Product Concept</h2>
        <div className="space-y-3 text-xs text-[var(--color-ink-secondary)] leading-relaxed">
          <p>
            Clerk is a supervised browser worker that performs narrow, repetitive operations 
            with visible state, approvals, and auditability. It is not an autonomous agent 
            that can browse anything and do everything.
          </p>
          <p>
            Every important browser action is scoped, policy-checked, logged, replayable, 
            and reversible or approval-gated where needed. The product communicates 
            "controlled automation, not uncontrolled autonomy."
          </p>
        </div>
      </section>

      {/* Primary Workflow */}
      <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-3">Primary Workflow</h2>
        <div className="space-y-4">
          <div className="bg-[var(--color-surface-sunken)] rounded-lg p-4">
            <h3 className="text-xs font-medium text-[var(--color-ink)] mb-2">
              Vendor Invoice Intake and ERP Record Update
            </h3>
            <div className="grid grid-cols-2 gap-4 text-[10px] text-[var(--color-ink-secondary)]">
              <div>
                <p><strong>Company:</strong> Apex Office Supply</p>
                <p><strong>Worker Role:</strong> Accounts Operations Clerk</p>
                <p><strong>System:</strong> LedgerLite ERP (fictional)</p>
              </div>
              <div>
                <p><strong>Task:</strong> Process vendor invoice INV-1048</p>
                <p><strong>Vendor:</strong> Northwind Packaging</p>
                <p><strong>Amount:</strong> $4,860</p>
              </div>
            </div>
          </div>
          <div className="text-xs text-[var(--color-ink-secondary)]">
            <p>
              <strong>Issue:</strong> Purchase order matches, but bank account changed recently. 
              Clerk may prepare the ERP update but must stop for Finance approval before 
              submitting payment details.
            </p>
          </div>
        </div>
      </section>

      {/* What I Built */}
      <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-3">What I Built</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-[var(--color-ink)]">Core Features</h3>
            <ul className="space-y-1 text-[10px] text-[var(--color-ink-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Synthetic work queue with 5 tasks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Browser workbench with 3-panel layout
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Legacy ERP portal simulation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Policy engine with 7 rules
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Approval gates for high-risk actions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Session replay with 8 frames
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Audit trail with 20 events
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Eval harness with 60 tests
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-[var(--color-ink)]">Technical Stack</h3>
            <ul className="space-y-1 text-[10px] text-[var(--color-ink-secondary)]">
              <li>Next.js 14 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS for styling</li>
              <li>Zustand for client state</li>
              <li>Deterministic synthetic data</li>
              <li>No external API dependencies</li>
              <li>No database required</li>
              <li>Static generation for all pages</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How Clerk Differs */}
      <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-3">
          How Clerk Differs from Generic RPA or Autonomous Agents
        </h2>
        <div className="space-y-3 text-xs text-[var(--color-ink-secondary)] leading-relaxed">
          <p>
            <strong>Generic RPA:</strong> Often a black box that clicks through screens with 
            no visibility into decision-making, policy checks, or audit trails. Difficult to 
            understand why actions were taken or what rules were applied.
          </p>
          <p>
            <strong>Autonomous Agent:</strong> Can browse anything and do everything, but lacks 
            constraints, approval gates, and auditability. High risk of unintended actions 
            with no human oversight.
          </p>
          <p>
            <strong>Clerk:</strong> A supervised browser worker that performs narrow, repetitive 
            operations with visible state, policy checks, approval gates, and complete audit 
            trails. Every action is scoped, logged, and replayable.
          </p>
        </div>
      </section>

      {/* Architecture Challenge */}
      <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-3">
          Architecture Challenge
        </h2>
        <div className="space-y-3 text-xs text-[var(--color-ink-secondary)] leading-relaxed">
          <p>
            The primary challenge was building a deterministic demo that demonstrates the 
            architecture without requiring real browser automation, external systems, or 
            AI models. The solution uses synthetic data and simulated browser actions to 
            showcase the complete workflow.
          </p>
          <p>
            Key architectural decisions:
          </p>
          <ul className="space-y-1 ml-4">
            <li>• Static data model with TypeScript interfaces</li>
            <li>• Deterministic policy engine with pure functions</li>
            <li>• Simulated browser frames for session replay</li>
            <li>• Approval gates as state transitions, not real submissions</li>
            <li>• Audit trail capturing all actions and decisions</li>
          </ul>
        </div>
      </section>

      {/* Safety Model */}
      <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-3">Safety Model</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-medium text-[var(--color-ink)] mb-2">Guarantees</h3>
            <ul className="space-y-1 text-[10px] text-[var(--color-ink-secondary)]">
              <li>• No real websites accessed</li>
              <li>• No real credentials used</li>
              <li>• No real financial transactions</li>
              <li>• No destructive actions</li>
              <li>• All actions logged</li>
              <li>• Synthetic data only</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium text-[var(--color-ink)] mb-2">Controls</h3>
            <ul className="space-y-1 text-[10px] text-[var(--color-ink-secondary)]">
              <li>• Policy engine gates all actions</li>
              <li>• Approval required for high-risk</li>
              <li>• Blocked actions cannot proceed</li>
              <li>• Audit trail captures everything</li>
              <li>• Eval harness validates behavior</li>
              <li>• Prominent disclosure banners</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Evaluation */}
      <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-3">Evaluation</h2>
        <div className="space-y-3 text-xs text-[var(--color-ink-secondary)] leading-relaxed">
          <p>
            The eval harness includes 60 deterministic test cases across 8 categories: 
            task classification, field extraction, policy triggering, approval gates, 
            blocked actions, audit completeness, replay completeness, and synthetic disclosure.
          </p>
          <p>
            All tests are pre-computed and do not depend on external services or randomized 
            generation. The eval dashboard provides transparency into test coverage and results.
          </p>
        </div>
      </section>

      {/* Limitations */}
      <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-3">Limitations</h2>
        <ul className="space-y-2 text-xs text-[var(--color-ink-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-warning)]">•</span>
            Synthetic demo only — no real browser automation
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-warning)]">•</span>
            No real ERP/CRM system integration
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-warning)]">•</span>
            No real financial transactions or payments
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-warning)]">•</span>
            No AI model for visual understanding
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-warning)]">•</span>
            No video recording of browser sessions
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-warning)]">•</span>
            No performance or load testing
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-xl p-6 text-center">
        <h2 className="text-sm font-semibold text-[var(--color-ink)] mb-3">
          Discuss a Back-Office AI Workflow
        </h2>
        <p className="text-xs text-[var(--color-ink-secondary)] mb-4">
          Interested in how browser automation with policy checks and approval gates 
          could work for your operations team?
        </p>
        <Button size="lg">Get in Touch</Button>
      </section>

      <Disclosure variant="banner" />
    </div>
  );
}
