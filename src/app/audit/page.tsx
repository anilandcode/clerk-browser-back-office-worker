"use client";

import { useState, useMemo } from "react";
import { auditEvents } from "@/data/clerk/audit";
import { tasks } from "@/data/clerk/tasks";
import { AuditEvent, AuditEventType } from "@/lib/types";
import { Disclosure } from "@/components/shared/Disclosure";

const eventTypeConfig: Record<
  AuditEventType,
  { label: string; icon: string; className: string }
> = {
  task: { label: "Task", icon: "☰", className: "bg-gray-100 text-gray-600" },
  browser_action: { label: "Browser Action", icon: "⊞", className: "bg-blue-100 text-blue-600" },
  field_extraction: { label: "Field Extraction", icon: "⊟", className: "bg-cyan-100 text-cyan-600" },
  policy_check: { label: "Policy Check", icon: "⊘", className: "bg-purple-100 text-purple-600" },
  approval: { label: "Approval", icon: "⊙", className: "bg-amber-100 text-amber-600" },
  blocked_action: { label: "Blocked Action", icon: "⊘", className: "bg-red-100 text-red-600" },
  simulated_submit: { label: "Simulated Submit", icon: "✓", className: "bg-green-100 text-green-600" },
};

const actorLabels: Record<string, string> = {
  clerk: "Clerk",
  human_approver: "Human Approver",
  system: "System",
};

const typeFilters: { label: string; value: AuditEventType | "ALL" }[] = [
  { label: "All Events", value: "ALL" },
  { label: "Browser Actions", value: "browser_action" },
  { label: "Policy Checks", value: "policy_check" },
  { label: "Approvals", value: "approval" },
  { label: "Blocked", value: "blocked_action" },
  { label: "Simulated Submit", value: "simulated_submit" },
];

export default function AuditPage() {
  const [typeFilter, setTypeFilter] = useState<AuditEventType | "ALL">("ALL");
  const [taskFilter, setTaskFilter] = useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  const filteredEvents = useMemo(() => {
    return auditEvents
      .filter((e) => typeFilter === "ALL" || e.type === typeFilter)
      .filter((e) => taskFilter === "ALL" || e.taskId === taskFilter)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
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
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Audit Trail</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Complete log of all actions, checks, and decisions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {Object.entries(eventTypeConfig).map(([type, config]) => {
          const count = auditEvents.filter((e) => e.type === type).length;
          return (
            <div
              key={type}
              className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-3"
            >
              <p className="text-[10px] text-[var(--color-text-subtle)] mb-1">{config.label}</p>
              <p className="text-lg font-semibold text-[var(--color-text)]">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-subtle)]">Type:</span>
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setTypeFilter(filter.value)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                typeFilter === filter.value
                  ? "bg-[var(--color-text)] text-white"
                  : "bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:bg-[var(--color-bg-sunken)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-subtle)]">Task:</span>
          <select
            value={taskFilter}
            onChange={(e) => setTaskFilter(e.target.value)}
            className="px-2 py-1 text-xs bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md"
          >
            <option value="ALL">All Tasks</option>
            {taskOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.id} — {opt.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log */}
      <div className="grid grid-cols-12 gap-6">
        <div className={`${selectedEvent ? "col-span-7" : "col-span-12"}`}>
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-sunken)]">
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                      Task
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                      Title
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                      Actor
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                      Policy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {filteredEvents.map((event) => {
                    const config = eventTypeConfig[event.type];
                    const time = new Date(event.timestamp);
                    const isSelected = selectedEvent?.id === event.id;

                    return (
                      <tr
                        key={event.id}
                        onClick={() => setSelectedEvent(isSelected ? null : event)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-[var(--color-action-muted)]"
                            : "hover:bg-[var(--color-bg-sunken)]"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                            {time.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${config.className}`}
                          >
                            {config.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-mono text-[var(--color-action)]">
                            {event.taskId}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-[var(--color-text)]">
                            {event.title}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] text-[var(--color-text-muted)]">
                            {actorLabels[event.actor]}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {event.policyId && (
                            <span className="text-[10px] font-mono text-[var(--color-approval)]">
                              {event.policyId}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredEvents.length === 0 && (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-[var(--color-text-subtle)]">
                  No events matching filters
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 text-xs text-[var(--color-text-subtle)]">
            Showing {filteredEvents.length} of {auditEvents.length} events
          </div>
        </div>

        {/* Event Detail Panel */}
        {selectedEvent && (
          <div className="col-span-5">
            <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6 sticky top-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono text-[var(--color-text-subtle)]">
                    {selectedEvent.id}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--color-text)] mt-1">
                    {selectedEvent.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-[var(--color-text-subtle)] hover:text-[var(--color-text)]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
                    Detail
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {selectedEvent.detail}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
                      Timestamp
                    </h4>
                    <p className="text-xs font-mono text-[var(--color-text)]">
                      {new Date(selectedEvent.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
                      Actor
                    </h4>
                    <p className="text-xs text-[var(--color-text)]">
                      {actorLabels[selectedEvent.actor]}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
                      Type
                    </h4>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        eventTypeConfig[selectedEvent.type].className
                      }`}
                    >
                      {eventTypeConfig[selectedEvent.type].label}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
                      Task
                    </h4>
                    <p className="text-xs font-mono text-[var(--color-action)]">
                      {selectedEvent.taskId}
                    </p>
                  </div>
                </div>

                {selectedEvent.target && (
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
                      Target Element
                    </h4>
                    <p className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-sunken)] rounded px-2 py-1">
                      {selectedEvent.target}
                    </p>
                  </div>
                )}

                {selectedEvent.beforeValue && (
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
                      Before Value
                    </h4>
                    <p className="text-xs font-mono text-[var(--color-text-muted)]">
                      {selectedEvent.beforeValue}
                    </p>
                  </div>
                )}

                {selectedEvent.afterValue && (
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
                      After Value
                    </h4>
                    <p className="text-xs font-mono text-[var(--color-text)]">
                      {selectedEvent.afterValue}
                    </p>
                  </div>
                )}

                {selectedEvent.policyId && (
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
                      Policy Reference
                    </h4>
                    <span className="text-xs font-mono text-[var(--color-approval)]">
                      {selectedEvent.policyId}
                    </span>
                  </div>
                )}

                {selectedEvent.replayFrameId && (
                  <div>
                    <h4 className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
                      Replay Frame
                    </h4>
                    <a
                      href={`/replay?frame=${selectedEvent.replayFrameId}`}
                      className="text-xs font-mono text-[var(--color-action)] hover:underline"
                    >
                      {selectedEvent.replayFrameId} →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Audit Report Preview */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4">
          Audit Report Preview
        </h2>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-[var(--color-text-subtle)]">Total Events</p>
            <p className="text-lg font-semibold">{auditEvents.length}</p>
          </div>
          <div>
            <p className="text-[var(--color-text-subtle)]">Tasks Covered</p>
            <p className="text-lg font-semibold">{new Set(auditEvents.map((e) => e.taskId)).size}</p>
          </div>
          <div>
            <p className="text-[var(--color-text-subtle)]">Policy Checks</p>
            <p className="text-lg font-semibold">
              {auditEvents.filter((e) => e.type === "policy_check").length}
            </p>
          </div>
          <div>
            <p className="text-[var(--color-text-subtle)]">Blocked Actions</p>
            <p className="text-lg font-semibold">
              {auditEvents.filter((e) => e.type === "blocked_action").length}
            </p>
          </div>
        </div>
      </div>

      <Disclosure variant="banner" />
    </div>
  );
}
