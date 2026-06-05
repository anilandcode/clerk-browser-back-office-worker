import Link from "next/link";
import { tasks } from "@/data/clerk/tasks";
import { auditEvents } from "@/data/clerk/audit";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { RiskBadge } from "@/components/shared/RiskBadge";
import {
  ArrowRight,
  Browsers,
  ShieldCheck,
  Scroll,
  Queue,
} from "@phosphor-icons/react/dist/ssr";

const waitingTasks = tasks.filter(
  (t) => t.status === "WAITING_APPROVAL" || t.status === "BLOCKED"
);

export default function Home() {
  const pendingCount = tasks.filter(
    (t) => t.status !== "COMPLETED"
  ).length;
  const blockedCount = tasks.filter((t) => t.status === "BLOCKED").length;
  const approvalCount = tasks.filter(
    (t) => t.status === "WAITING_APPROVAL"
  ).length;

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Hero - Asymmetric split */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-surface-sunken)] border border-[var(--color-rule)] rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-approved)] animate-pulse" />
            <span className="text-[11px] font-medium text-[var(--color-ink-secondary)] tracking-tight">
              Synthetic demo environment
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-[var(--color-ink)] tracking-tighter leading-[1.05] mb-5">
            Browser Back-Office Worker
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed max-w-[52ch] mb-8">
            A supervised browser worker for repetitive legacy workflows with
            approvals, policy checks, and audit trails.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/workbench"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-ink)] text-white px-5 py-2.5 rounded-[var(--radius-md)] text-[13px] font-medium hover:bg-[#2A2928] active:scale-[0.98] transition-all duration-200"
            >
              <Browsers size={16} />
              Open Workbench
            </Link>
            <Link
              href="/queue"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-surface-elevated)] text-[var(--color-ink)] border border-[var(--color-rule)] px-5 py-2.5 rounded-[var(--radius-md)] text-[13px] font-medium hover:border-[var(--color-rule-strong)] hover:bg-[var(--color-surface-sunken)] active:scale-[0.98] transition-all duration-200"
            >
              View Queue
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Stats cluster */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-xl)] p-5 col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Queue
                size={15}
                className="text-[var(--color-ink-tertiary)]"
              />
              <span className="text-[11px] font-medium text-[var(--color-ink-tertiary)] uppercase tracking-wider">
                Work Queue
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-[var(--color-ink)] tracking-tight">
                {pendingCount}
              </span>
              <span className="text-sm text-[var(--color-ink-tertiary)]">
                tasks pending
              </span>
            </div>
            <div className="flex gap-3 mt-3">
              <span className="text-xs text-[var(--color-ink-secondary)]">
                <span className="text-[var(--color-blocked)] font-medium">
                  {blockedCount}
                </span>{" "}
                blocked
              </span>
              <span className="text-xs text-[var(--color-ink-secondary)]">
                <span className="text-[var(--color-approval)] font-medium">
                  {approvalCount}
                </span>{" "}
                awaiting approval
              </span>
            </div>
          </div>

          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-xl)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck
                size={15}
                className="text-[var(--color-ink-tertiary)]"
              />
              <span className="text-[11px] font-medium text-[var(--color-ink-tertiary)] uppercase tracking-wider">
                Policies
              </span>
            </div>
            <span className="text-2xl font-semibold text-[var(--color-ink)] tracking-tight">
              7
            </span>
            <span className="text-xs text-[var(--color-ink-tertiary)] ml-1.5">
              rules active
            </span>
          </div>

          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-xl)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Scroll
                size={15}
                className="text-[var(--color-ink-tertiary)]"
              />
              <span className="text-[11px] font-medium text-[var(--color-ink-tertiary)] uppercase tracking-wider">
                Audit
              </span>
            </div>
            <span className="text-2xl font-semibold text-[var(--color-ink)] tracking-tight">
              {auditEvents.length}
            </span>
            <span className="text-xs text-[var(--color-ink-tertiary)] ml-1.5">
              events logged
            </span>
          </div>
        </div>
      </section>

      {/* Queue Preview */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[var(--color-ink)] tracking-tight">
            Active Tasks
          </h2>
          <Link
            href="/queue"
            className="text-[13px] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-xl)] overflow-hidden">
          {tasks.map((task, i) => (
            <Link
              key={task.id}
              href={task.id === "TASK-1048" ? "/workbench" : "/queue"}
              className={`flex items-center justify-between px-5 py-4 hover:bg-[var(--color-surface-sunken)] transition-colors duration-200 ${
                i < tasks.length - 1
                  ? "border-b border-[var(--color-rule)]"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-[11px] font-mono text-[var(--color-ink-ghost)] shrink-0 w-20">
                  {task.id}
                </span>
                <span className="text-[13px] text-[var(--color-ink)] truncate">
                  {task.title}
                </span>
              </div>
              <div className="flex items-center gap-2.5 shrink-0 ml-4">
                <RiskBadge risk={task.risk} />
                <StatusBadge status={task.status} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works - simple overview */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--color-ink)] tracking-tight mb-5">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              step: "01",
              title: "Task Intake",
              desc: "Clerk picks tasks from the queue, classifies risk, and builds a step plan.",
            },
            {
              step: "02",
              title: "Policy Gate",
              desc: "Each action is checked against 7 policy rules before execution.",
            },
            {
              step: "03",
              title: "Human Approval",
              desc: "High-risk actions pause for explicit approval. Every step is audited.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-xl)] p-5"
            >
              <span className="text-[11px] font-mono text-[var(--color-ink-ghost)] block mb-3">
                {item.step}
              </span>
              <h3 className="text-[15px] font-semibold text-[var(--color-ink)] tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-[13px] text-[var(--color-ink-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
