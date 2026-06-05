"use client";

import { useState, useMemo } from "react";
import { tasks } from "@/data/clerk/tasks";
import { vendors } from "@/data/clerk/vendors";
import { getStepsForTask } from "@/data/clerk/steps";
import {
  getPoliciesForTaskType,
} from "@/data/clerk/policies";
import { getAuditEventsForTask } from "@/data/clerk/audit";
import { getApprovalForTask } from "@/data/clerk/approvals";
import { getReplayFramesForTask } from "@/data/clerk/replay";
import { getInvoiceById } from "@/data/clerk/invoices";
import { getPurchaseOrderById } from "@/data/clerk/purchaseOrders";
import { TaskPanel } from "@/components/workbench/TaskPanel";
import { BrowserFrame } from "@/components/workbench/BrowserFrame";
import { StepPlan } from "@/components/workbench/StepPlan";
import { PolicyChecks } from "@/components/workbench/PolicyChecks";
import { ApprovalGate } from "@/components/workbench/ApprovalGate";
import { AuditTimeline } from "@/components/workbench/AuditTimeline";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Disclosure } from "@/components/shared/Disclosure";
import { ApprovalRequest } from "@/lib/types";
import {
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";

export default function WorkbenchPage() {
  const [selectedTaskId, setSelectedTaskId] = useState("TASK-1048");
  const [approval, setApproval] = useState<ApprovalRequest | null>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);
  const steps = useMemo(
    () => getStepsForTask(selectedTaskId),
    [selectedTaskId]
  );
  const taskPolicies = useMemo(
    () => (selectedTask ? getPoliciesForTaskType(selectedTask.type) : []),
    [selectedTask]
  );
  const auditEvents = useMemo(
    () => getAuditEventsForTask(selectedTaskId),
    [selectedTaskId]
  );
  const replayFrames = useMemo(
    () => getReplayFramesForTask(selectedTaskId),
    [selectedTaskId]
  );
  const initialApproval = useMemo(
    () => getApprovalForTask(selectedTaskId),
    [selectedTaskId]
  );

  const currentApproval = approval || initialApproval;
  const currentFrame = replayFrames[currentFrameIndex];

  const handleApprove = () => {
    if (currentApproval) {
      setApproval({ ...currentApproval, status: "approved" });
    }
  };

  const handleReject = () => {
    if (currentApproval) {
      setApproval({ ...currentApproval, status: "rejected" });
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--color-ink)] tracking-tight">
            Browser Workbench
          </h1>
          <p className="text-[13px] text-[var(--color-ink-secondary)] mt-0.5">
            Supervised browser automation with policy checks and approvals
          </p>
        </div>
        <Disclosure variant="inline" />
      </div>

      {/* Task Selector */}
      <div className="flex items-center gap-2 bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-lg)] px-4 py-2.5">
        <span className="text-[10px] text-[var(--color-ink-ghost)] uppercase tracking-wider font-medium mr-1">
          Task
        </span>
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => {
              setSelectedTaskId(task.id);
              setApproval(null);
              setCurrentFrameIndex(0);
            }}
            className={`px-2.5 py-1 text-[11px] rounded-[var(--radius-md)] transition-all duration-200 font-medium ${
              selectedTaskId === task.id
                ? "bg-[var(--color-ink)] text-white"
                : "bg-[var(--color-surface-sunken)] text-[var(--color-ink-secondary)] hover:bg-[var(--color-rule)]"
            }`}
          >
            {task.id.replace("TASK-", "")}
          </button>
        ))}
      </div>

      {/* 3-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Panel */}
        <div className="lg:col-span-3 space-y-4">
          {selectedTask && <TaskPanel task={selectedTask} />}

          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-lg)] overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--color-rule)] bg-[var(--color-surface-sunken)]">
              <h3 className="text-[11px] font-semibold text-[var(--color-ink)] tracking-tight uppercase">
                Queue
              </h3>
            </div>
            <div className="divide-y divide-[var(--color-rule)]">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => {
                    setSelectedTaskId(task.id);
                    setApproval(null);
                    setCurrentFrameIndex(0);
                  }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-[var(--color-surface-sunken)] transition-colors ${
                    selectedTaskId === task.id
                      ? "bg-[var(--color-accent-muted)]"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-[var(--color-ink-ghost)]">
                      {task.id}
                    </span>
                    <StatusBadge status={task.status} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel */}
        <div className="lg:col-span-6">
          <BrowserFrame currentFrame={currentFrame}>
            <div className="bg-white border border-[#D0CECC] rounded">
              {currentFrame ? (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-semibold text-[var(--color-ink)]">
                        {currentFrame.title}
                      </h2>
                      <p className="text-[10px] text-[var(--color-ink-secondary)] mt-0.5">
                        {currentFrame.action}
                      </p>
                    </div>
                    {currentFrame.policyState && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          currentFrame.policyState === "APPROVAL_REQUIRED"
                            ? "bg-[var(--color-approval-bg)] text-[var(--color-approval)]"
                            : currentFrame.policyState === "ALLOW"
                              ? "bg-[var(--color-approved-bg)] text-[var(--color-approved)]"
                              : "bg-[var(--color-surface-sunken)] text-[var(--color-ink-secondary)]"
                        }`}
                      >
                        {currentFrame.policyState.replace(/_/g, " ")}
                      </span>
                    )}
                  </div>

                  <LegacyScreenContent
                    screen={currentFrame.screen}
                    invoiceId={selectedTask?.invoiceId}
                    vendorId={selectedTask?.vendorId}
                  />
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm text-[var(--color-ink-tertiary)]">
                    No replay frames available
                  </p>
                </div>
              )}
            </div>

            {/* Frame Navigation */}
            {replayFrames.length > 0 && (
              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() =>
                    setCurrentFrameIndex(Math.max(0, currentFrameIndex - 1))
                  }
                  disabled={currentFrameIndex === 0}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-md)] disabled:opacity-30 hover:bg-[var(--color-surface-sunken)] transition-colors"
                >
                  <CaretLeft size={12} />
                  Prev
                </button>
                <span className="text-[10px] font-mono text-[var(--color-ink-ghost)]">
                  {currentFrameIndex + 1} / {replayFrames.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentFrameIndex(
                      Math.min(replayFrames.length - 1, currentFrameIndex + 1)
                    )
                  }
                  disabled={currentFrameIndex === replayFrames.length - 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-md)] disabled:opacity-30 hover:bg-[var(--color-surface-sunken)] transition-colors"
                >
                  Next
                  <CaretRight size={12} />
                </button>
              </div>
            )}
          </BrowserFrame>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-3 space-y-4">
          {steps.length > 0 && <StepPlan steps={steps} />}
          {taskPolicies.length > 0 && (
            <PolicyChecks policies={taskPolicies} />
          )}
          {currentApproval && (
            <ApprovalGate
              approval={currentApproval}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
          {auditEvents.length > 0 && <AuditTimeline events={auditEvents} />}
        </div>
      </div>

      <Disclosure variant="banner" />
    </div>
  );
}

/* ─── Legacy ERP Screen Content ────────────── */

function LegacyScreenContent({
  screen,
  invoiceId,
  vendorId,
}: {
  screen: string;
  invoiceId?: string;
  vendorId?: string;
}) {
  switch (screen) {
    case "queue":
      return <LegacyQueueContent />;
    case "vendor_search":
      return <LegacyVendorSearchContent />;
    case "vendor_profile":
      return <LegacyVendorProfileContent vendorId={vendorId} />;
    case "invoice_detail":
      return invoiceId ? (
        <LegacyInvoiceContent invoiceId={invoiceId} />
      ) : null;
    case "po_match":
      return <LegacyPOMatchContent invoiceId={invoiceId} />;
    case "payment_details":
      return <LegacyPaymentContent />;
    case "approval_gate":
      return (
        <div className="bg-[var(--color-warning-bg)] border border-amber-200 rounded-[var(--radius-md)] p-5 text-center">
          <p className="text-sm text-amber-800 font-medium">Submit Blocked</p>
          <p className="text-xs text-amber-700 mt-1">
            Finance Manager approval required before payment submission
          </p>
        </div>
      );
    case "confirmation":
      return (
        <div className="bg-[var(--color-surface-sunken)] border border-[var(--color-rule)] rounded-[var(--radius-md)] p-5 text-center">
          <p className="text-sm text-[var(--color-ink-secondary)] font-medium">
            Task paused - awaiting approval decision
          </p>
          <p className="text-[10px] text-[var(--color-ink-ghost)] mt-1">
            No real submission performed
          </p>
        </div>
      );
    default:
      return (
        <div className="bg-[var(--color-surface-sunken)] rounded-[var(--radius-md)] p-6 text-center">
          <p className="text-xs text-[var(--color-ink-ghost)]">
            Simulated screen: {screen.replace(/_/g, " ")}
          </p>
        </div>
      );
  }
}

function LegacyQueueContent() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#333]">
          Pending Work Items
        </span>
        <span className="text-[10px] text-[#666]">5 items</span>
      </div>
      {[
        { id: "TASK-1048", title: "Vendor invoice update", status: "In Progress" },
        { id: "TASK-1051", title: "Shipping address correction", status: "Ready" },
        { id: "TASK-1054", title: "Duplicate invoice check", status: "Blocked" },
        { id: "TASK-1059", title: "Tax exemption update", status: "Ready" },
        { id: "TASK-1062", title: "Vendor bank account change", status: "Blocked" },
      ].map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-[#F8F8F8] border border-[#D0CECC] rounded px-3 py-2"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-[#666]">
              {item.id}
            </span>
            <span className="text-xs text-[#333]">{item.title}</span>
          </div>
          <span className="text-[10px] text-[#666]">{item.status}</span>
        </div>
      ))}
    </div>
  );
}

function LegacyVendorSearchContent() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          defaultValue="Northwind"
          readOnly
          className="flex-1 bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1.5 text-xs"
        />
        <button className="px-3 py-1.5 text-xs bg-[#4A4A4A] text-white rounded">
          Search
        </button>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-[#E8E6E4] text-[#666]">
            <th className="text-left px-2 py-1.5 font-medium">ID</th>
            <th className="text-left px-2 py-1.5 font-medium">Name</th>
            <th className="text-left px-2 py-1.5 font-medium">Status</th>
            <th className="text-left px-2 py-1.5 font-medium">Tax ID</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#E8E6E4] bg-[#FFFFDD]">
            <td className="px-2 py-1.5 font-mono text-[#333]">VENDOR-001</td>
            <td className="px-2 py-1.5 text-[#333]">Northwind Packaging</td>
            <td className="px-2 py-1.5">
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                Active
              </span>
            </td>
            <td className="px-2 py-1.5 font-mono text-[#666]">36-4127853</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function LegacyVendorProfileContent({ vendorId }: { vendorId?: string }) {
  const vendor = vendors.find((v) => v.id === vendorId) || vendors[0];
  return (
    <div className="space-y-3">
      <div className="bg-[#F8F8F8] border border-[#D0CECC] rounded p-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-[#666] block">Vendor Name</span>
            <span className="text-[#333] font-medium">{vendor.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#666] block">Tax ID</span>
            <span className="text-[#333] font-mono">{vendor.taxId}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#666] block">Status</span>
            <span className="text-[#333]">{vendor.status}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#666] block">W-9</span>
            <span className="text-[#333]">{vendor.documents.w9}</span>
          </div>
        </div>
      </div>
      {vendor.bankAccountLastChangedAt && (
        <div className="bg-[#FEF9E7] border border-amber-200 rounded px-3 py-2 text-[10px] text-amber-800">
          Bank account last changed: {vendor.bankAccountLastChangedAt}
        </div>
      )}
    </div>
  );
}

function LegacyInvoiceContent({ invoiceId }: { invoiceId: string }) {
  const invoice = getInvoiceById(invoiceId);
  if (!invoice)
    return (
      <p className="text-xs text-[var(--color-ink-ghost)]">Invoice not found</p>
    );

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <LegacyField label="Invoice Number" value={invoice.id} mono />
        <LegacyField
          label="Amount"
          value={`$${invoice.amount.toLocaleString()} ${invoice.currency}`}
          mono
        />
        <LegacyField label="Status" value={invoice.status} />
        <LegacyField label="Due Date" value={invoice.dueDate} />
      </div>
      <div className="border-t border-[#E8E6E4] pt-3">
        <span className="text-[10px] text-[#666] block mb-2">
          Extracted Fields
        </span>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(invoice.extractedFields).map(([key, value]) => (
            <div key={key} className="text-[10px]">
              <span className="text-[#999]">{key}: </span>
              <span className="text-[#333] font-mono">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LegacyPOMatchContent({ invoiceId }: { invoiceId?: string }) {
  const invoice = invoiceId ? getInvoiceById(invoiceId) : null;
  const po = invoice?.purchaseOrderId
    ? getPurchaseOrderById(invoice.purchaseOrderId)
    : null;

  if (!po) {
    return (
      <div className="text-xs text-[#666] text-center py-4">
        No matching purchase order found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-[#E6F4EC] border border-green-200 rounded px-3 py-2 text-[10px] text-green-800">
        PO match found - amounts within tolerance
      </div>
      <div className="grid grid-cols-2 gap-3">
        <LegacyField label="PO Number" value={po.id} mono />
        <LegacyField
          label="Approved Amount"
          value={`$${po.approvedAmount.toLocaleString()}`}
          mono
        />
        <LegacyField label="Status" value={po.status} />
        <LegacyField
          label="Line Items"
          value={`${po.lineItems.length} items`}
        />
      </div>
    </div>
  );
}

function LegacyPaymentContent() {
  return (
    <div className="space-y-3">
      <div className="bg-[var(--color-warning-bg)] border border-amber-200 rounded-[var(--radius-md)] px-3 py-2 text-[10px] text-amber-800">
        Bank account changed recently - approval required before submission
      </div>
      <div className="grid grid-cols-2 gap-3">
        <LegacyField label="Bank Name" value="First National Bank" />
        <LegacyField label="Account (masked)" value="****4582" mono />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <button
          className="px-3 py-1.5 text-xs bg-[#CCC] text-[#666] rounded cursor-not-allowed"
          disabled
        >
          Save Payment Details
        </button>
        <span className="text-[10px] text-[var(--color-approval)]">
          Disabled - awaiting approval
        </span>
      </div>
    </div>
  );
}

function LegacyField({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] text-[#666] block mb-0.5">{label}</label>
      <div
        className={`bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs ${mono ? "font-mono" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
