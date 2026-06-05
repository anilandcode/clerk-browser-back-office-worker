import { WorkflowStep, StepState } from "@/lib/types";
import {
  Circle,
  CircleNotch,
  CheckCircle,
  Clock,
  Prohibit,
} from "@phosphor-icons/react/dist/ssr";

interface StepPlanProps {
  steps: WorkflowStep[];
}

const stateConfig: Record<
  StepState,
  { icon: React.ElementType; className: string }
> = {
  pending: { icon: Circle, className: "text-[var(--color-ink-ghost)]" },
  active: { icon: CircleNotch, className: "text-[var(--color-accent)]" },
  completed: { icon: CheckCircle, className: "text-[var(--color-approved)]" },
  waiting_approval: { icon: Clock, className: "text-[var(--color-approval)]" },
  blocked: { icon: Prohibit, className: "text-[var(--color-blocked)]" },
};

export function StepPlan({ steps }: StepPlanProps) {
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-lg)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-rule)] bg-[var(--color-surface-sunken)]">
        <h3 className="text-[11px] font-semibold text-[var(--color-ink)] tracking-tight uppercase">
          Task Plan
        </h3>
      </div>

      <div className="divide-y divide-[var(--color-rule)]">
        {steps.map((step) => {
          const config = stateConfig[step.state];
          const Icon = config.icon;

          return (
            <div
              key={step.id}
              className={`px-4 py-2.5 flex items-start gap-2.5 ${
                step.state === "active"
                  ? "bg-[var(--color-accent-muted)]"
                  : ""
              }`}
            >
              <Icon
                size={14}
                weight={step.state === "active" ? "bold" : "regular"}
                className={`mt-0.5 shrink-0 ${config.className} ${
                  step.state === "active" ? "animate-spin" : ""
                }`}
                style={
                  step.state === "active"
                    ? { animationDuration: "2s" }
                    : undefined
                }
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[var(--color-ink-ghost)]">
                    {step.order}
                  </span>
                  <span
                    className={`text-[12px] font-medium ${
                      step.state === "pending"
                        ? "text-[var(--color-ink-ghost)]"
                        : "text-[var(--color-ink)]"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {step.state !== "pending" && (
                  <p className="text-[11px] text-[var(--color-ink-secondary)] mt-0.5 ml-5">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
