import { WorkflowStep, StepState } from "@/lib/types";

interface StepPlanProps {
  steps: WorkflowStep[];
}

const stateConfig: Record<StepState, { icon: string; className: string }> = {
  pending: { icon: "○", className: "text-[var(--color-text-subtle)]" },
  active: { icon: "◉", className: "text-[var(--color-action)]" },
  completed: { icon: "✓", className: "text-[var(--color-approved)]" },
  waiting_approval: { icon: "⊙", className: "text-[var(--color-approval)]" },
  blocked: { icon: "⊘", className: "text-[var(--color-blocked)]" },
};

export function StepPlan({ steps }: StepPlanProps) {
  return (
    <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-sunken)]">
        <h3 className="text-xs font-semibold text-[var(--color-text)]">Task Plan</h3>
      </div>
      
      <div className="divide-y divide-[var(--color-border)]">
        {steps.map((step) => {
          const config = stateConfig[step.state];
          
          return (
            <div
              key={step.id}
              className={`px-4 py-2.5 flex items-start gap-3 ${
                step.state === "active" ? "bg-[var(--color-action-muted)]" : ""
              }`}
            >
              <span className={`text-sm mt-0.5 ${config.className}`}>
                {config.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[var(--color-text-subtle)]">
                    {step.order}
                  </span>
                  <span className={`text-xs font-medium ${
                    step.state === "pending" ? "text-[var(--color-text-subtle)]" : "text-[var(--color-text)]"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {step.state !== "pending" && (
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 ml-6">
                    {step.description}
                  </p>
                )}
                {step.browserTarget && step.state !== "pending" && (
                  <span className="text-[10px] font-mono text-[var(--color-text-subtle)] ml-6">
                    → {step.browserTarget}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
