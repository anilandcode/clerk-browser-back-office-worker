"use client";

import { useState, useMemo } from "react";
import { tasks } from "@/data/clerk/tasks";
import { getStepsForTask } from "@/data/clerk/steps";
import { getPoliciesForTaskType, policies as allPolicies } from "@/data/clerk/policies";
import { getAuditEventsForTask } from "@/data/clerk/audit";
import { getApprovalForTask } from "@/data/clerk/approvals";
import { getReplayFramesForTask } from "@/data/clerk/replay";
import { getInvoiceById } from "@/data/clerk/invoices";
import { TaskPanel } from "@/components/workbench/TaskPanel";
import { BrowserFrame } from "@/components/workbench/BrowserFrame";
import { StepPlan } from "@/components/workbench/StepPlan";
import { PolicyChecks } from "@/components/workbench/PolicyChecks";
import { ApprovalGate } from "@/components/workbench/ApprovalGate";
import { AuditTimeline } from "@/components/workbench/AuditTimeline";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Disclosure } from "@/components/shared/Disclosure";
import { ApprovalRequest } from "@/lib/types";

export default function WorkbenchPage() {
  const [selectedTaskId, setSelectedTaskId] = useState("TASK-1048");
  const [approval, setApproval] = useState<ApprovalRequest | null>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);
  const steps = useMemo(() => getStepsForTask(selectedTaskId), [selectedTaskId]);
  const taskPolicies = useMemo(
    () => (selectedTask ? getPoliciesForTaskType(selectedTask.type) : []),
    [selectedTask]
  );
  const auditEvents = useMemo(() => getAuditEventsForTask(selectedTaskId), [selectedTaskId]);
  const replayFrames = useMemo(() => getReplayFramesForTask(selectedTaskId), [selectedTaskId]);
  const initialApproval = useMemo(() => getApprovalForTask(selectedTaskId), [selectedTaskId]);

  // Initialize approval state from data
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Browser Workbench</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Supervised browser automation with policy checks and approvals
          </p>
        </div>
        <Disclosure variant="inline" />
      </div>

      {/* Task Selector */}
      <div className="flex items-center gap-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg px-4 py-2">
        <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
          Active Task:
        </span>
        <div className="flex items-center gap-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => {
                setSelectedTaskId(task.id);
                setApproval(null);
                setCurrentFrameIndex(0);
              }}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                selectedTaskId === task.id
                  ? "bg-[var(--color-text)] text-white"
                  : "bg-[var(--color-bg-sunken)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]"
              }`}
            >
              {task.id}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Panel Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Panel: Task Details + Queue */}
        <div className="col-span-3 space-y-4">
          {selectedTask && <TaskPanel task={selectedTask} />}
          
          {/* Queue Mini */}
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-sunken)]">
              <h3 className="text-xs font-semibold text-[var(--color-text)]">Queue</h3>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => {
                    setSelectedTaskId(task.id);
                    setApproval(null);
                    setCurrentFrameIndex(0);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-[var(--color-bg-sunken)] transition-colors ${
                    selectedTaskId === task.id ? "bg-[var(--color-action-muted)]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[var(--color-text-subtle)]">
                      {task.id}
                    </span>
                    <StatusBadge status={task.status} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel: Browser Frame */}
        <div className="col-span-6">
          <BrowserFrame currentFrame={currentFrame}>
            {/* Browser Content based on current frame */}
            <div className="bg-white border border-[#D0CECC] rounded">
              {currentFrame ? (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-semibold text-[var(--color-text)]">
                        {currentFrame.title}
                      </h2>
                      <p className="text-[10px] text-[var(--color-text-muted)]">
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
                            : "bg-[var(--color-bg-sunken)] text-[var(--color-text-muted)]"
                        }`}
                      >
                        {currentFrame.policyState.replace(/_/g, " ")}
                      </span>
                    )}
                  </div>

                  {/* Simulated ERP Content */}
                  {currentFrame.screen === "invoice_detail" && selectedTask?.invoiceId && (
                    <LegacyInvoiceContent invoiceId={selectedTask.invoiceId} />
                  )}
                  {currentFrame.screen === "payment_details" && (
                    <LegacyPaymentContent />
                  )}
                  {currentFrame.screen === "approval_gate" && (
                    <div className="bg-[var(--color-warning-bg)] border border-amber-200 rounded p-4 text-center">
                      <p className="text-sm text-amber-800 font-medium">Submit Blocked</p>
                      <p className="text-xs text-amber-700 mt-1">Finance Manager approval required before payment submission</p>
                    </div>
                  )}
                  {currentFrame.screen === "confirmation" && (
                    <div className="bg-[var(--color-bg-sunken)] border border-[var(--color-border)] rounded p-4 text-center">
                      <p className="text-sm text-[var(--color-text-muted)]">Task paused — awaiting approval decision</p>
                      <p className="text-[10px] text-[var(--color-text-subtle)] mt-1">No real submission performed</p>
                    </div>
                  )}
                  {!["invoice_detail", "payment_details", "approval_gate", "confirmation"].includes(currentFrame.screen) && (
                    <div className="bg-[var(--color-bg-sunken)] rounded p-6 text-center">
                      <p className="text-xs text-[var(--color-text-subtle)]">
                        Simulated screen: {currentFrame.screen.replace(/_/g, " ")}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-sm text-[var(--color-text-subtle)]">No replay frames available</p>
                </div>
              )}
            </div>

            {/* Frame Navigation */}
            {replayFrames.length > 0 && (
              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() => setCurrentFrameIndex(Math.max(0, currentFrameIndex - 1))}
                  disabled={currentFrameIndex === 0}
                  className="px-3 py-1 text-xs bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded disabled:opacity-50"
                >
                  ← Previous
                </button>
                <span className="text-[10px] text-[var(--color-text-subtle)]">
                  Frame {currentFrameIndex + 1} of {replayFrames.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentFrameIndex(
                      Math.min(replayFrames.length - 1, currentFrameIndex + 1)
                    )
                  }
                  disabled={currentFrameIndex === replayFrames.length - 1}
                  className="px-3 py-1 text-xs bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            )}
          </BrowserFrame>
        </div>

        {/* Right Panel: Steps, Policy, Approval, Audit */}
        <div className="col-span-3 space-y-4">
          {steps.length > 0 && <StepPlan steps={steps} />}
          {taskPolicies.length > 0 && <PolicyChecks policies={taskPolicies} />}
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

// Legacy ERP content components
function LegacyInvoiceContent({ invoiceId }: { invoiceId: string }) {
  const invoice = getInvoiceById(invoiceId);
  
  if (!invoice) return <p className="text-xs text-[var(--color-text-subtle)]">Invoice not found</p>;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-[#666] block mb-0.5">Invoice Number</label>
          <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs font-mono">
            {invoice.id}
          </div>
        </div>
        <div>
          <label className="text-[10px] text-[#666] block mb-0.5">Amount</label>
          <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs font-mono">
            ${invoice.amount.toLocaleString()} {invoice.currency}
          </div>
        </div>
        <div>
          <label className="text-[10px] text-[#666] block mb-0.5">Status</label>
          <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
            {invoice.status}
          </div>
        </div>
        <div>
          <label className="text-[10px] text-[#666] block mb-0.5">Due Date</label>
          <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
            {invoice.dueDate}
          </div>
        </div>
      </div>
    </div>
  );
}

function LegacyPaymentContent() {
  return (
    <div className="space-y-3">
      <div className="bg-[var(--color-warning-bg)] border border-amber-200 rounded px-3 py-2 text-[10px] text-amber-800">
        ⚠ Bank account changed recently — approval required before submission
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-[#666] block mb-0.5">Bank Name</label>
          <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
            First National Bank
          </div>
        </div>
        <div>
          <label className="text-[10px] text-[#666] block mb-0.5">Account (masked)</label>
          <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs font-mono">
            ****4582
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <button className="px-3 py-1.5 text-xs bg-[#CCC] text-[#666] rounded cursor-not-allowed" disabled>
          Save Payment Details
        </button>
        <span className="text-[10px] text-[var(--color-approval)]">Disabled — awaiting approval</span>
      </div>
    </div>
  );
}
