import { AuditEvent, AuditEventType } from "@/lib/types";
import {
  ClipboardText,
  Browsers,
  ListChecks,
  CheckCircle,
  Prohibit,
  ArrowSquareOut,
} from "@phosphor-icons/react/dist/ssr";

interface AuditTimelineProps {
  events: AuditEvent[];
}

const eventTypeConfig: Record<
  AuditEventType,
  { icon: React.ElementType; className: string }
> = {
  task: { icon: ClipboardText, className: "text-[var(--color-ink-tertiary)]" },
  browser_action: { icon: Browsers, className: "text-[var(--color-accent)]" },
  field_extraction: {
    icon: ClipboardText,
    className: "text-[var(--color-info)]",
  },
  policy_check: { icon: ListChecks, className: "text-[var(--color-approval)]" },
  approval: { icon: CheckCircle, className: "text-[var(--color-approval)]" },
  blocked_action: { icon: Prohibit, className: "text-[var(--color-blocked)]" },
  simulated_submit: {
    icon: ArrowSquareOut,
    className: "text-[var(--color-approved)]",
  },
};

const actorLabels: Record<string, string> = {
  clerk: "Clerk",
  human_approver: "Human",
  system: "System",
};

export function AuditTimeline({ events }: AuditTimelineProps) {
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-lg)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-rule)] bg-[var(--color-surface-sunken)]">
        <h3 className="text-[11px] font-semibold text-[var(--color-ink)] tracking-tight uppercase">
          Audit Events
          <span className="text-[var(--color-ink-ghost)] ml-2 font-normal normal-case">
            {events.length}
          </span>
        </h3>
      </div>

      <div className="max-h-64 overflow-y-auto">
        <div className="divide-y divide-[var(--color-rule)]">
          {events.map((event) => {
            const config = eventTypeConfig[event.type];
            const Icon = config.icon;
            const time = new Date(event.timestamp);

            return (
              <div key={event.id} className="px-4 py-2.5 flex items-start gap-2.5">
                <Icon
                  size={13}
                  weight="regular"
                  className={`mt-0.5 shrink-0 ${config.className}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] text-[var(--color-ink)] font-medium truncate">
                      {event.title}
                    </span>
                    <span className="text-[9px] font-mono text-[var(--color-ink-ghost)] shrink-0">
                      {time.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--color-ink-secondary)] mt-0.5 truncate">
                    {event.detail}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[9px] px-1 py-0.5 bg-[var(--color-surface-sunken)] rounded text-[var(--color-ink-ghost)]">
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
