import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Disclosure } from "@/components/shared/Disclosure";

const queuePreview = [
  { id: "TASK-1048", title: "Vendor invoice update", status: "WAITING_APPROVAL", risk: "high" },
  { id: "TASK-1051", title: "Shipping address correction", status: "READY", risk: "low" },
  { id: "TASK-1054", title: "Duplicate invoice check", status: "BLOCKED", risk: "medium" },
  { id: "TASK-1059", title: "Tax exemption update", status: "READY", risk: "medium" },
  { id: "TASK-1062", title: "Vendor bank account change", status: "WAITING_APPROVAL", risk: "critical" },
];

const stats = [
  { label: "Pending Tasks", value: "5" },
  { label: "Active Task", value: "INV-1048" },
  { label: "Policy State", value: "Approval Required" },
  { label: "Audit Events", value: "12 logged" },
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-2">
            Clerk
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-muted)] mb-4 sm:mb-6">
            Browser Back-Office Worker
          </p>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed mb-6 sm:mb-8">
            A supervised browser worker for repetitive legacy workflows with approvals, 
            policy checks, and audit trails. Processes vendor invoices, validates against 
            policies, and pauses for human approval when required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/queue">
              <Button size="lg" className="w-full sm:w-auto">Process Sample Queue</Button>
            </Link>
            <Link href="/audit">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">View Audit Trail</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-3 sm:p-4"
          >
            <p className="text-[10px] sm:text-xs text-[var(--color-text-subtle)] mb-1">{stat.label}</p>
            <p className="text-base sm:text-lg font-semibold text-[var(--color-text)]">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Queue Preview */}
      <section className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--color-text)]">Work Queue Preview</h2>
            <Link href="/queue" className="text-xs text-[var(--color-action)] hover:underline">
              View all →
            </Link>
          </div>
        </div>
        
        <div className="divide-y divide-[var(--color-border)]">
          {queuePreview.map((task) => (
            <div key={task.id} className="px-4 sm:px-6 py-3 flex items-center justify-between hover:bg-[var(--color-bg-sunken)] transition-colors">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-[10px] sm:text-xs font-mono text-[var(--color-text-subtle)]">{task.id}</span>
                <span className="text-xs sm:text-sm text-[var(--color-text)]">{task.title}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={`text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium ${
                  task.risk === "critical" ? "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)]" :
                  task.risk === "high" ? "bg-orange-100 text-orange-700" :
                  task.risk === "medium" ? "bg-[var(--color-warning-bg)] text-[var(--color-warning)]" :
                  "bg-[var(--color-approved-bg)] text-[var(--color-approved)]"
                }`}>
                  {task.risk}
                </span>
                <span className={`text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium ${
                  task.status === "WAITING_APPROVAL" ? "bg-[var(--color-approval-bg)] text-[var(--color-approval)]" :
                  task.status === "BLOCKED" ? "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)]" :
                  task.status === "READY" ? "bg-[var(--color-info-bg)] text-[var(--color-info)]" :
                  "bg-[var(--color-bg-sunken)] text-[var(--color-text-muted)]"
                }`}>
                  {task.status.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclosure */}
      <Disclosure variant="banner" />
    </div>
  );
}
