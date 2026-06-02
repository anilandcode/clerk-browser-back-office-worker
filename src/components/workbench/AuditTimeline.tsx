import { AuditEvent, AuditEventType } from "@/lib/types";

interface AuditTimelineProps {
  events: AuditEvent[];
}

const eventTypeConfig: Record<
  AuditEventType,
  { icon: string; className: string }
> = {
  task: { icon: "☰", className: "text-[var(--color-text-subtle)]" },
  browser_action: { icon: "⊞", className: "text-[var(--color-action)]" },
  field_extraction: { icon: "⊟", className: "text-[var(--color-info)]" },
  policy_check: { icon: "⊘", className: "text-[var(--color-approval)]" },
  approval: { icon: "⊙", className: "text-[var(--color-approval)]" },
  blocked_action: { icon: "⊘", className: "text-[var(--color-blocked)]" },
  simulated_submit: { icon: "✓", className: "text-[var(--color-approved)]" },
};

const actorLabels: Record<string, string> = {
  clerk: "Clerk",
  human_approver: "Human",
  system: "System",
};

export function AuditTimeline({ events }: AuditTimelineProps) {
  return (
    <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-sunken)]">
        <h3 className="text-xs font-semibold text-[var(--color-text)]">
          Audit Events
          <span className="text-[var(--color-text-subtle)] ml-2 font-normal">
            {events.length} events
          </span>
        </h3>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        <div className="divide-y divide-[var(--color-border)]">
          {events.map((event) => {
            const config = eventTypeConfig[event.type];
            const time = new Date(event.timestamp);
            
            return (
              <div key={event.id} className="px-4 py-2 flex items-start gap-3">
                <span className={`text-xs mt-0.5 ${config.className}`}>
                  {config.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text)] font-medium truncate">
                      {event.title}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-text-subtle)] ml-2 flex-shrink-0">
                      {time.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 truncate">
                    {event.detail}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] px-1 py-0.5 bg-[var(--color-bg-sunken)] rounded text-[var(--color-text-subtle)]">
                      {actorLabels[event.actor]}
                    </span>
                    {event.policyId && (
                      <span className="text-[9px] px-1 py-0.5 bg-[var(--color-approval-bg)] text-[var(--color-approval)] rounded">
                        {event.policyId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
