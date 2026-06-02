"use client";

import { ReplayFrame } from "@/lib/types";

interface BrowserFrameProps {
  currentFrame?: ReplayFrame;
  children?: React.ReactNode;
}

const screenLabels: Record<string, string> = {
  queue: "Work Queue — LedgerLite ERP",
  vendor_search: "Vendor Search — LedgerLite ERP",
  vendor_profile: "Vendor Profile — LedgerLite ERP",
  invoice_detail: "Invoice Detail — LedgerLite ERP",
  po_match: "Purchase Order Match — LedgerLite ERP",
  payment_details: "Payment Details — LedgerLite ERP",
  approval_gate: "Approval Required — LedgerLite ERP",
  confirmation: "Confirmation — LedgerLite ERP",
};

export function BrowserFrame({ currentFrame, children }: BrowserFrameProps) {
  const title = currentFrame
    ? screenLabels[currentFrame.screen] || "LedgerLite ERP"
    : "LedgerLite ERP — Synthetic Legacy Portal";

  return (
    <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg overflow-hidden shadow-sm">
      {/* Browser Chrome */}
      <div className="bg-[#E8E6E4] px-3 py-2 flex items-center gap-3 border-b border-[var(--color-border)]">
        {/* Window Controls */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
        </div>
        
        {/* URL Bar */}
        <div className="flex-1 bg-[var(--color-bg-elevated)] rounded px-2 py-1 flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-text-subtle)]">🔒</span>
          <span className="text-[10px] font-mono text-[var(--color-text-muted)] truncate">
            {currentFrame
              ? `erp.ledgerlite.internal/${currentFrame.screen.replace(/_/g, "/")}`
              : "erp.ledgerlite.internal/admin"}
          </span>
        </div>
        
        {/* Action indicator */}
        {currentFrame && (
          <span className="text-[10px] text-[var(--color-action)] font-medium flex-shrink-0">
            {currentFrame.action.substring(0, 30)}...
          </span>
        )}
      </div>

      {/* Browser Content */}
      <div className="bg-[#F5F3F0] min-h-[400px]">
        {/* Legacy Header */}
        <div className="bg-[#3C3C3C] text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold">LedgerLite ERP</span>
            <span className="text-[10px] opacity-70">v4.2.1</span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="opacity-70">Admin: clerk@apexoffice.com</span>
            <span className="opacity-50">|</span>
            <span className="opacity-70">Apex Office Supply</span>
          </div>
        </div>

        {/* Legacy Navigation */}
        <div className="bg-[#4A4A4A] text-white px-4 py-1 flex items-center gap-1 text-[10px]">
          <span className="px-2 py-1 bg-[#5A5A5A] rounded cursor-pointer hover:bg-[#6A6A6A]">Home</span>
          <span className="px-2 py-1 bg-[#6A6A6A] rounded cursor-pointer">Vendors</span>
          <span className="px-2 py-1 hover:bg-[#5A5A5A] rounded cursor-pointer">Invoices</span>
          <span className="px-2 py-1 hover:bg-[#5A5A5A] rounded cursor-pointer">Purchase Orders</span>
          <span className="px-2 py-1 hover:bg-[#5A5A5A] rounded cursor-pointer">Payments</span>
          <span className="px-2 py-1 hover:bg-[#5A5A5A] rounded cursor-pointer">Reports</span>
        </div>

        {/* Tab Bar */}
        <div className="bg-[#E8E6E4] border-b border-[#D0CECC] px-4 flex items-center gap-0 text-[10px]">
          <div className="px-3 py-1.5 bg-[#F5F3F0] border border-b-0 border-[#D0CECC] rounded-t text-[var(--color-text)] font-medium">
            {title.split(" — ")[0]}
          </div>
          <div className="px-3 py-1.5 text-[var(--color-text-subtle)] cursor-pointer hover:bg-[#E0DED8]">
            +
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {children || (
            <div className="bg-white border border-[#D0CECC] rounded p-6">
              <div className="text-center text-[var(--color-text-subtle)]">
                <p className="text-sm">Legacy ERP Content</p>
                <p className="text-[10px] mt-1">Simulated browser frame — no real system connected</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
