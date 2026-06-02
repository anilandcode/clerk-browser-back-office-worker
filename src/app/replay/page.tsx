"use client";

import { useState, useMemo } from "react";
import { replayFrames } from "@/data/clerk/replay";
import { auditEvents } from "@/data/clerk/audit";
import { tasks } from "@/data/clerk/tasks";
import { ReplayFrame, PolicyOutcome } from "@/lib/types";
import { Disclosure } from "@/components/shared/Disclosure";

const screenLabels: Record<string, string> = {
  queue: "Work Queue",
  vendor_search: "Vendor Search",
  vendor_profile: "Vendor Profile",
  invoice_detail: "Invoice Detail",
  po_match: "Purchase Order Match",
  payment_details: "Payment Details",
  approval_gate: "Approval Gate",
  confirmation: "Confirmation",
};

const policyStateColors: Record<PolicyOutcome, string> = {
  ALLOW: "bg-[var(--color-approved-bg)] text-[var(--color-approved)]",
  REVIEW_REQUIRED: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  APPROVAL_REQUIRED: "bg-[var(--color-approval-bg)] text-[var(--color-approval)]",
  BLOCKED: "bg-[var(--color-blocked-bg)] text-[var(--color-blocked)]",
};

export default function ReplayPage() {
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const taskId = "TASK-1048";
  const task = tasks.find((t) => t.id === taskId);
  const frames = useMemo(
    () => replayFrames.filter((f) => f.taskId === taskId).sort((a, b) => a.order - b.order),
    []
  );

  const selectedFrame = frames[selectedFrameIndex];
  const frameAuditEvent = selectedFrame
    ? auditEvents.find((e) => e.id === selectedFrame.auditEventId)
    : null;

  const handlePrev = () => {
    setSelectedFrameIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setSelectedFrameIndex((prev) => Math.min(frames.length - 1, prev + 1));
  };

  const handlePlay = () => {
    setIsPlaying(true);
    let index = selectedFrameIndex;
    const interval = setInterval(() => {
      index++;
      if (index >= frames.length) {
        clearInterval(interval);
        setIsPlaying(false);
        return;
      }
      setSelectedFrameIndex(index);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Session Replay</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Deterministic frame-by-frame session recording
        </p>
      </div>

      {/* Task Info */}
      {task && (
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[var(--color-text-subtle)]">
              {task.id}
            </span>
            <h3 className="text-sm font-medium text-[var(--color-text)]">{task.title}</h3>
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            {frames.length} frames
          </span>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4">
        <div className="flex items-center gap-1">
          {frames.map((frame, idx) => (
            <button
              key={frame.id}
              onClick={() => setSelectedFrameIndex(idx)}
              className={`flex-1 h-2 rounded-full transition-colors ${
                idx === selectedFrameIndex
                  ? "bg-[var(--color-action)]"
                  : idx < selectedFrameIndex
                  ? "bg-[var(--color-approved)]"
                  : "bg-[var(--color-border)]"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-[var(--color-text-subtle)]">
            Frame {selectedFrameIndex + 1} of {frames.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={selectedFrameIndex === 0}
              className="px-3 py-1 text-xs bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded disabled:opacity-50"
            >
              ← Prev
            </button>
            <button
              onClick={handlePlay}
              disabled={isPlaying || selectedFrameIndex === frames.length - 1}
              className="px-3 py-1 text-xs bg-[var(--color-action)] text-white rounded disabled:opacity-50"
            >
              {isPlaying ? "Playing..." : "▶ Play"}
            </button>
            <button
              onClick={handleNext}
              disabled={selectedFrameIndex === frames.length - 1}
              className="px-3 py-1 text-xs bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Frame Viewer */}
      {selectedFrame && (
        <div className="grid grid-cols-12 gap-6">
          {/* Browser Frame Mock */}
          <div className="col-span-8">
            <div className="bg-[#E8E6E4] border border-[var(--color-border)] rounded-lg overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-[#D0CECC] px-3 py-2 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="flex-1 bg-white rounded px-2 py-1">
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                    erp.ledgerlite.internal/{selectedFrame.screen.replace(/_/g, "/")}
                  </span>
                </div>
              </div>

              {/* Screen Content */}
              <div className="bg-[#F5F3F0] p-6 min-h-[300px]">
                <div className="bg-white border border-[#D0CECC] rounded p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-[var(--color-text)]">
                      {screenLabels[selectedFrame.screen]}
                    </h2>
                    {selectedFrame.policyState && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          policyStateColors[selectedFrame.policyState]
                        }`}
                      >
                        {selectedFrame.policyState.replace(/_/g, " ")}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[var(--color-text-muted)] mb-4">
                    {selectedFrame.action}
                  </p>

                  {/* Simulated Screen Content */}
                  <div className="bg-[var(--color-bg-sunken)] rounded p-4 text-center">
                    <p className="text-[10px] text-[var(--color-text-subtle)]">
                      Simulated {screenLabels[selectedFrame.screen]} screen
                    </p>
                    <p className="text-[10px] text-[var(--color-text-subtle)] mt-1">
                      No real browser content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frame Details */}
          <div className="col-span-4 space-y-4">
            {/* Frame Info */}
            <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4">
              <h3 className="text-xs font-semibold text-[var(--color-text)] mb-3">Frame Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
                    Frame
                  </span>
                  <p className="text-xs font-mono text-[var(--color-text)]">
                    {selectedFrame.id} (#{selectedFrame.order})
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
                    Timestamp
                  </span>
                  <p className="text-xs font-mono text-[var(--color-text)]">
                    {new Date(selectedFrame.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
                    Screen
                  </span>
                  <p className="text-xs text-[var(--color-text)]">
                    {screenLabels[selectedFrame.screen]}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider">
                    Action
                  </span>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {selectedFrame.action}
                  </p>
                </div>
              </div>
            </div>

            {/* Linked Audit Event */}
            {frameAuditEvent && (
              <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4">
                <h3 className="text-xs font-semibold text-[var(--color-text)] mb-3">
                  Linked Audit Event
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] text-[var(--color-text-subtle)]">ID</span>
                    <p className="text-xs font-mono text-[var(--color-action)]">
                      {frameAuditEvent.id}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--color-text-subtle)]">Title</span>
                    <p className="text-xs text-[var(--color-text)]">{frameAuditEvent.title}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--color-text-subtle)]">Detail</span>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {frameAuditEvent.detail}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* All Frames List */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-sunken)]">
          <h3 className="text-xs font-semibold text-[var(--color-text)]">All Replay Frames</h3>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {frames.map((frame, idx) => (
            <button
              key={frame.id}
              onClick={() => setSelectedFrameIndex(idx)}
              className={`w-full px-4 py-3 text-left hover:bg-[var(--color-bg-sunken)] transition-colors ${
                idx === selectedFrameIndex ? "bg-[var(--color-action-muted)]" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[var(--color-text-subtle)] w-6">
                    {frame.order}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-[var(--color-text)]">{frame.title}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{frame.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {frame.policyState && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        policyStateColors[frame.policyState]
                      }`}
                    >
                      {frame.policyState.replace(/_/g, " ")}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[var(--color-text-subtle)]">
                    {new Date(frame.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Disclosure variant="banner" />
    </div>
  );
}
