"use client";

import { useState } from "react";
import Link from "next/link";
import { BackOfficeTask, TaskStatus } from "@/lib/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { getVendorById } from "@/data/clerk/vendors";

interface QueueTableProps {
  tasks: BackOfficeTask[];
}

const taskTypeLabels: Record<BackOfficeTask["type"], string> = {
  vendor_invoice_update: "Vendor Invoice Update",
  shipping_address_correction: "Shipping Address",
  duplicate_invoice_check: "Duplicate Check",
  tax_exemption_update: "Tax Exemption",
  vendor_bank_change: "Bank Account Change",
};

const statusFilters: { label: string; value: TaskStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Ready", value: "READY" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Waiting Approval", value: "WAITING_APPROVAL" },
  { label: "Blocked", value: "BLOCKED" },
  { label: "Completed", value: "COMPLETED" },
];

export function QueueTable({ tasks }: QueueTableProps) {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");

  const filteredTasks =
    statusFilter === "ALL"
      ? tasks
      : tasks.filter((t) => t.status === statusFilter);

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatusFilter(filter.value)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              statusFilter === filter.value
                ? "bg-[var(--color-text)] text-white"
                : "bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:bg-[var(--color-bg-sunken)]"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-sunken)]">
                <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                  Task ID
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                  Vendor
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                  System
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                  Risk
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                  SLA
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-medium text-[var(--color-text-subtle)] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredTasks.map((task) => {
                const vendor = getVendorById(task.vendorId);
                const slaDate = new Date(task.sla);
                const isOverdue = slaDate < new Date();

                return (
                  <tr
                    key={task.id}
                    className="hover:bg-[var(--color-bg-sunken)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/workbench?task=${task.id}`}
                        className="text-xs font-mono text-[var(--color-action)] hover:underline"
                      >
                        {task.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-[var(--color-text)]">
                        {taskTypeLabels[task.type]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {vendor?.name || task.vendorId}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-[var(--color-text-subtle)]">
                        {task.system}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <RiskBadge risk={task.risk} />
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs ${
                          isOverdue
                            ? "text-[var(--color-blocked)] font-medium"
                            : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        {slaDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={task.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-[var(--color-text-subtle)]">
              No tasks matching filter
            </p>
          </div>
        )}
      </div>

      {/* Task count */}
      <div className="mt-3 text-xs text-[var(--color-text-subtle)]">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </div>
    </div>
  );
}
