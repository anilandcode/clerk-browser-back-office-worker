"use client";

import { useState, useMemo } from "react";
import { auditEvents } from "@/data/clerk/audit";
import { tasks } from "@/data/clerk/tasks";
import { AuditEvent, AuditEventType } from "@/lib/types";
import { Disclosure } from "@/components/shared/Disclosure";
import {
  ArrowSquareOut,
  Browsers,
  ClipboardText,
  ListChecks,
  Prohibit,
  CheckCircle,
  X,
} from "@phosphor-icons/react/dist/ssr";

const eventTypeConfig: Record<
  AuditEventType,
  { label: string; icon: React.ElementType; className: string }
> = {
  task: {
    label: "Task",
    icon: ClipboardText,
    className: "bg-gray-100 text-gray-600",
  },
  browser_action: {
    label: "Browser Action",
    icon: Browsers,
    className: "bg-blue-100 text-blue-600",
  },
  field_extraction: {
    label: "Field Extraction",
    icon: ClipboardText,
    className: "bg-cyan-100 text-cyan-600",
  },
  policy_check: {
    label: "Policy Check",
    icon: ListChecks,
    className: "bg-purple-100 text-purple-600",
  },
  approval: {
    label: "Approval",
    icon: CheckCircle,
    className: "bg-amber-100 text-amber-600",
  },
  blocked_action: {
    label: "Blocked",
    icon: Prohibit,
    className: "bg-red-100 text-red-600",
  },
  simulated_submit: {
    label: "Submit",
    icon: ArrowSquareOut,
    className: "bg-green-100 text-green-600",
  },
};

const actorLabels: Record<string, string> = {
  clerk: "Clerk",
  human_approver: "Human Approver",
  system: "System",
};

const typeFilters: { label: string; value: AuditEventType | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Browser", value: "browser_action" },
  { label: "Policy", value: "policy_check" },
  { label: "Approval", value: "approval" },
  { label: "Blocked", value: "blocked_action" },
  { label: "Submit", value: "simulated_submit" },
];

export default function AuditPage() {
  const [typeFilter, setTypeFilter] = useState<AuditEventType | "ALL">("ALL");
  const [taskFilter, setTaskFilter] = useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  const filteredEvents = useMemo(() => {
    return auditEvents
      .filter((e) => typeFilter === "ALL" || e.type === typeFilter)
      .filter((e) => taskFilter === "ALL" || e.taskId === taskFilter)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  }, [typeFilter, taskFilter]);

  const taskOptions = useMemo(() => {
    const taskIds = [...new Set(auditEvents.map((e) => e.taskId))];
    return taskIds.map((id) => {
      const task = tasks.find((t) => t.id === id);
      return { id, title: task?.title || id };
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-ink)] tracking-tight">
          Audit Trail
        </h1>
        <p className="text-[13px] text-[var(--color-ink-secondary)] mt-0.5">
          Complete log of all actions, checks, and decisions
        </p>
      </div>

      {/* Stats - responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.entries(eventTypeConfig).map(([type, config]) => {
          const Icon = config.icon;
          const count = auditEvents.filter((e) => e.type === type).length;
          return (
            <div
              key={type}
              className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-lg)] p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-[var(--color-ink-tertiary)]" />
                <p className="text-[10px] text-[var(--color-ink-ghost)] uppercase tracking-wider font-medium">
                  {config.label}
                </p>
              </div>
              <p className="text-xl font-semibold text-[var(--color-ink)] tracking-tight">
                {count}
              </p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {typeFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setTypeFilter(filter.value)}
            className={`px-2.5 py-1 text-[11px] rounded-[var(--radius-md)] transition-all duration-200 font-medium ${
              typeFilter === filter.value
                ? "bg-[var(--color-ink)] text-white"
                : "bg-[var(--color-surface-elevated)] text-[var(--color-ink-secondary)] border border-[var(--color-rule)] hover:bg-[var(--color-surface-sunken)]"
            }`}
          >
            {filter.label}
          </button>
        ))}

        <select
          value={taskFilter}
          onChange={(e) => setTaskFilter(e.target.value)}
          className="px-2.5 py-1 text-[11px] bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-md)] text-[var(--color-ink-secondary)] ml-auto"
        >
          <option value="ALL">All Tasks</option>
          {taskOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.id}
            </option>
          ))}
        </select>
      </div>

      {/* Audit Log + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`${selectedEvent ? "lg:col-span-7" : "lg:col-span-12"}`}>
          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-xl)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-rule)] bg-[var(--color-surface-sunken)]">
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-ink-ghost)] uppercase tracking-wider">
                      Time
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-ink-ghost)] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-ink-ghost)] uppercase tracking-wider">
                      Task
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-ink-ghost)] uppercase tracking-wider">
                      Title
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-ink-ghost)] uppercase tracking-wider">
                      Actor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-rule)]">
                  {filteredEvents.map((event) => {
                    const config = eventTypeConfig[event.type];
                    const Icon = config.icon;
                    const time = new Date(event.timestamp);
                    const isSelected = selectedEvent?.id === event.id;

                    return (
                      <tr
                        key={event.id}
                        onClick={() =>
                          setSelectedEvent(isSelected ? null : event)
                        }
                        className={`cursor-pointer transition-colors duration-150 ${
                          isSelected
                            ? "bg-[var(--color-accent-muted)]"
                            : "hover:bg-[var(--color-surface-sunken)]"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-mono text-[var(--color-ink-tertiary)]">
                            {time.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${config.className}`}
                          >
                            <Icon size={10} />
                            {config.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-mono text-[var(--color-accent)]">
                            {event.taskId}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[13px] text-[var(--color-ink)]">
                            {event.title}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[11px] text-[var(--color-ink-tertiary)]">
                            {actorLabels[event.actor]}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredEvents.length === 0 && (
              <div className="px-4 py-10 text-center">
                <p className="text-[13px] text-[var(--color-ink-ghost)]">
                  No events matching filters
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 text-[11px] text-[var(--color-ink-ghost)]">
            {filteredEvents.length} of {auditEvents.length} events
          </div>
        </div>

        {/* Event Detail Panel */}
        {selectedEvent && (
          <div className="lg:col-span-5">
            <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-xl)] p-6 lg:sticky lg:top-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono text-[var(--color-ink-ghost)]">
                    {selectedEvent.id}
                  </span>
                  <h3 className="text-[15px] font-semibold text-[var(--color-ink)] tracking-tight mt-1">
                    {selectedEvent.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 text-[var(--color-ink-ghost)] hover:text-[var(--color-ink)] transition-colors rounded-[var(--radius-sm)]"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-[13px] text-[var(--color-ink-secondary)] leading-relaxed">
                  {selectedEvent.detail}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <DetailField
                    label="Timestamp"
                    value={new Date(selectedEvent.timestamp).toLocaleString()}
                    mono
                  />
                  <DetailField
                    label="Actor"
                    value={actorLabels[selectedEvent.actor]}
                  />
                  <DetailField
                    label="Type"
                    value={eventTypeConfig[selectedEvent.type].label}
                  />
                  <DetailField
                    label="Task"
                    value={selectedEvent.taskId}
                    mono
                  />
                </div>

                {selectedEvent.target && (
                  <DetailField
                    label="Target"
                    value={selectedEvent.target}
                    mono
                    block
                  />
                )}

                {selectedEvent.beforeValue && (
                  <DetailField
                    label="Before"
                    value={selectedEvent.beforeValue}
                    mono
                  />
                )}

                {selectedEvent.afterValue && (
                  <DetailField
                    label="After"
                    value={selectedEvent.afterValue}
                    mono
                  />
                )}

                {selectedEvent.policyId && (
                  <DetailField
                    label="Policy"
                    value={selectedEvent.policyId}
                    mono
                  />
                )}

                {selectedEvent.replayFrameId && (
                  <div>
                    <h4 className="text-[10px] text-[var(--color-ink-ghost)] uppercase tracking-wider font-medium mb-1">
                      Replay Frame
                    </h4>
                    <a
                      href={`/replay?frame=${selectedEvent.replayFrameId}`}
                      className="text-[12px] font-mono text-[var(--color-accent)] hover:underline"
                    >
                      {selectedEvent.replayFrameId}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Disclosure variant="banner" />
    </div>
  );
}

function DetailField({
  label,
  value,
  mono,
  block,
}: {
  label: string;
  value: string;
  mono?: boolean;
  block?: boolean;
}) {
  return (
    <div className={block ? "col-span-2" : ""}>
      <h4 className="text-[10px] text-[var(--color-ink-ghost)] uppercase tracking-wider font-medium mb-1">
        {label}
      </h4>
      <p
        className={`text-[12px] text-[var(--color-ink-secondary)] ${mono ? "font-mono bg-[var(--color-surface-sunken)] rounded-[var(--radius-sm)] px-2 py-1" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
